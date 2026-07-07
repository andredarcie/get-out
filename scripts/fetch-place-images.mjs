// Fetches free-licensed real-environment photos from Wikimedia Commons for each
// map location in Get Out (Chernobyl/Pripyat setting), records attribution, and
// leaves raw downloads for the b&w conversion step (convert-place-images.mjs).
//
// Usage: node scripts/fetch-place-images.mjs <outDir>
// Requires: curl on PATH. Wikimedia asks for a descriptive User-Agent.

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = process.argv[2] || 'scratchpad/raw';
const UA = 'GetOutGame/1.0 (https://github.com/andrendarcie/get-out; educational game asset fetch)';

// slug -> descriptive location + ordered list of Commons search queries (best first).
// Each entry maps to one named place on the game map.
const LOCATIONS = [
    { slug: 'hospital',        queries: ['Pripyat hospital interior', 'Pripyat hospital', 'abandoned hospital Chernobyl'] },
    { slug: 'apartment-block', queries: ['Pripyat abandoned apartment building', 'Pripyat building exterior', 'Pripyat apartment block'] },
    { slug: 'maternity',       queries: ['Pripyat abandoned hospital ward beds', 'Pripyat maternity', 'abandoned hospital ward beds'] },
    { slug: 'post-office',     queries: ['Pripyat post office', 'Pripyat abandoned interior room', 'abandoned soviet office'] },
    { slug: 'school',          queries: ['Pripyat school classroom', 'Pripyat abandoned school', 'abandoned classroom Chernobyl'] },
    { slug: 'pool',            queries: ['Pripyat swimming pool Azure', 'Pripyat swimming pool', 'abandoned swimming pool Chernobyl'] },
    { slug: 'apartment-interior', queries: ['Pripyat abandoned apartment interior', 'Pripyat apartment room', 'abandoned soviet apartment room'] },
    { slug: 'pharmacy',        queries: ['Pripyat pharmacy', 'abandoned pharmacy Chernobyl', 'abandoned pharmacy shelves'] },
    { slug: 'kindergarten',    queries: ['Pripyat kindergarten', 'Pripyat kindergarten dolls', 'abandoned kindergarten Chernobyl'] },
    { slug: 'mural',           queries: ['Pripyat mosaic mural', 'Pripyat mural', 'Pripyat wall painting'] },
    { slug: 'river-park',      queries: ['Pripyat river port cafe', 'Pripyat playground', 'Pripyat amusement park'] },
    { slug: 'central-square',  queries: ['Pripyat central square', 'Pripyat main square', 'Pripyat city center'] },
    { slug: 'railway-bridge',  queries: ['Pripyat railway bridge', 'abandoned railway bridge', 'Chernobyl railway'] },
    { slug: 'ferris-wheel',    queries: ['Pripyat Ferris wheel', 'Pripyat amusement park wheel'] },
    { slug: 'trench',          queries: ['Pripyat abandoned road', 'Chernobyl exclusion zone road', 'abandoned soviet street'] },
    { slug: 'abandoned-car',   queries: ['abandoned car Chernobyl', 'Pripyat abandoned vehicle', 'rusty abandoned car snow'] },
    { slug: 'palace-culture',  queries: ['Pripyat Palace of Culture Energetik', 'Palace of Culture Energetik Pripyat', 'Pripyat Energetik'] },
    { slug: 'frozen-river',    queries: ['frozen river winter forest', 'frozen river snow forest', 'winter frozen river'] },
];

function apiSearch(query) {
    const args = [
        '-s', '-G', 'https://commons.wikimedia.org/w/api.php',
        '--data-urlencode', 'action=query',
        '--data-urlencode', 'format=json',
        '--data-urlencode', 'generator=search',
        '--data-urlencode', `gsrsearch=${query}`,
        '--data-urlencode', 'gsrnamespace=6',
        '--data-urlencode', 'gsrlimit=12',
        '--data-urlencode', 'prop=imageinfo',
        '--data-urlencode', 'iiprop=url|extmetadata|mime|size',
        '--data-urlencode', 'iiurlwidth=1280',
        '-A', UA,
    ];
    const raw = execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
    const json = JSON.parse(raw);
    const pages = json.query?.pages || {};
    return Object.values(pages)
        .filter((p) => p.imageinfo?.[0])
        .map((p) => {
            const ii = p.imageinfo[0];
            const em = ii.extmetadata || {};
            const strip = (s) => (s ? String(s).replace(/<[^>]*>/g, '').trim() : '');
            return {
                title: p.title,
                index: p.index ?? 999,
                thumburl: ii.thumburl,
                descurl: ii.descriptionurl,
                mime: ii.mime,
                width: ii.width,
                height: ii.height,
                license: strip(em.LicenseShortName?.value),
                author: strip(em.Artist?.value) || 'Unknown',
                credit: strip(em.Credit?.value),
            };
        })
        .sort((a, b) => a.index - b.index);
}

function pickBest(candidates) {
    const usable = candidates.filter(
        (c) => c.mime === 'image/jpeg' && c.thumburl && c.width && c.height
    );
    if (!usable.length) return null;
    // Prefer landscape (crops cleanly to 4:3), then earliest search rank.
    const landscape = usable.filter((c) => c.width >= c.height);
    return (landscape[0] || usable[0]);
}

function download(url, dest) {
    execFileSync('curl', ['-sL', '-A', UA, '-o', dest, url], { stdio: 'inherit' });
}

mkdirSync(OUT_DIR, { recursive: true });
const manifest = [];

for (const loc of LOCATIONS) {
    let chosen = null;
    let usedQuery = null;
    for (const q of loc.queries) {
        try {
            const cands = apiSearch(q);
            const best = pickBest(cands);
            if (best) { chosen = best; usedQuery = q; break; }
        } catch (e) {
            console.error(`  ! query failed "${q}": ${e.message}`);
        }
    }
    if (!chosen) {
        console.error(`SKIP ${loc.slug}: no usable image found`);
        continue;
    }
    const dest = join(OUT_DIR, `${loc.slug}.jpg`);
    download(chosen.thumburl, dest);
    manifest.push({
        slug: loc.slug,
        query: usedQuery,
        file: `${loc.slug}.jpg`,
        title: chosen.title,
        source: chosen.descurl,
        license: chosen.license,
        author: chosen.author,
        dims: `${chosen.width}x${chosen.height}`,
    });
    console.log(`OK  ${loc.slug.padEnd(18)} <- ${chosen.title}  [${chosen.license}]`);
}

writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length}/${LOCATIONS.length} images fetched. Manifest: ${join(OUT_DIR, 'manifest.json')}`);
