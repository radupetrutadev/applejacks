#!/usr/bin/env node
/**
 * fetch-instagram.mjs — pull the latest public posts from @applejacksdaily,
 * save the images into assets/instagram/ and rewrite data/instagram.json so
 * the contact sheet on the site shows real photos instead of generated plates.
 *
 *   node scripts/fetch-instagram.mjs              # 12 most recent posts
 *   node scripts/fetch-instagram.mjs --count 20
 *   node scripts/fetch-instagram.mjs --user someoneelse
 *
 * Instagram rate-limits anonymous callers hard. If you get a 401/403, log in
 * on instagram.com in a browser, copy the `sessionid` cookie and re-run with:
 *
 *   IG_SESSIONID=xxxxx node scripts/fetch-instagram.mjs
 *
 * Only run this against an account you own or have permission to mirror.
 * Node 18+ (uses the built-in fetch).
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT     = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IMG_DIR  = resolve(ROOT, 'assets/instagram');
const MANIFEST = resolve(ROOT, 'data/instagram.json');
const IG_APP_ID = '936619743392459'; // the public web client id Instagram's own site sends

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const USER  = flag('user', 'applejacksdaily');
const COUNT = Math.max(1, Math.min(50, Number(flag('count', 12)) || 12));

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'X-IG-App-ID': IG_APP_ID,
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  ...(process.env.IG_SESSIONID ? { Cookie: `sessionid=${process.env.IG_SESSIONID}` } : {})
};

function die(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

async function getProfile() {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(USER)}`;
  const res = await fetch(url, { headers });

  if (res.status === 401 || res.status === 403 || res.status === 429) {
    die(`Instagram answered ${res.status}. It is throttling anonymous requests.\n` +
        `    Re-run with a session cookie:  IG_SESSIONID=… node scripts/fetch-instagram.mjs`);
  }
  if (!res.ok) die(`Instagram answered ${res.status} ${res.statusText}.`);

  const json = await res.json().catch(() => die('Instagram did not return JSON — the endpoint has probably changed.'));
  const user = json?.data?.user;
  if (!user) die(`No profile data for @${USER}. Is the account public and the name correct?`);
  return user;
}

const firstLine = (caption = '') =>
  caption.split('\n').map((l) => l.trim()).find(Boolean)?.slice(0, 120) ?? '';

async function download(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': headers['User-Agent'] } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

const main = async () => {
  console.log(`\n  Apple Jacks · pulling the last ${COUNT} posts from @${USER}\n`);

  const user  = await getProfile();
  const edges = (user.edge_owner_to_timeline_media?.edges ?? []).slice(0, COUNT);
  if (!edges.length) die('The profile returned no posts.');

  await mkdir(IMG_DIR, { recursive: true });

  const items = [];
  for (const [i, { node }] of edges.entries()) {
    const idx  = String(i + 1).padStart(2, '0');
    const name = `${USER}-${idx}.jpg`;
    const src  = node.display_url || node.thumbnail_src;
    const cap  = firstLine(node.edge_media_to_caption?.edges?.[0]?.node?.text);

    try {
      await download(src, resolve(IMG_DIR, name));
      console.log(`  ✓ ${idx}  ${name}`);
    } catch (err) {
      console.warn(`  ! ${idx}  skipped (${err.message})`);
      continue;
    }

    items.push({
      id: node.shortcode,
      image: `assets/instagram/${name}`,
      // Instagram's own alt text when it exists, otherwise the caption.
      alt: { ro: node.accessibility_caption || cap || 'Fotografie Apple Jacks',
             en: node.accessibility_caption || cap || 'Apple Jacks photo' },
      caption: { ro: cap, en: cap },
      permalink: `https://www.instagram.com/p/${node.shortcode}/`
    });
  }

  const previous = JSON.parse(await readFile(MANIFEST, 'utf8'));
  await writeFile(MANIFEST, JSON.stringify({
    ...previous,
    profile: USER,
    url: `https://www.instagram.com/${USER}/`,
    fetchedAt: new Date().toISOString(),
    items
  }, null, 2) + '\n');

  console.log(`\n  Wrote ${items.length} items to data/instagram.json`);
  console.log('  Captions are copied straight from Instagram — translate the `en` side by hand if you want both languages to read well.\n');
};

main().catch((err) => die(err.stack || String(err)));
