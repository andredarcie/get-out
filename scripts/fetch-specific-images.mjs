// Fetch specific Commons files by exact title (for the locations the generic
// search missed) and append them to the raw manifest.
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = process.argv[2];
const UA = 'GetOutGame/1.0 (https://github.com/andrendarcie/get-out; educational game asset fetch)';

// slug -> exact Commons file title
const TARGETS = [
    { slug: 'pharmacy',     title: 'File:Pripyat supermarket hnapel 01.jpg' },
    { slug: 'maternity',    title: 'File:Abandoned wooden wards at Heidelberg Repatriation Hospital (52626555595).jpg' },
    { slug: 'abandoned-car',title: 'File:Abandoned and wrecked car Lada. Shchelokovskiy khutor. Nizhniy Novgorod.jpg' },
];

function fetchInfo(title) {
    const args = [
        '-s', '-G', 'https://commons.wikimedia.org/w/api.php',
        '--data-urlencode', 'action=query',
        '--data-urlencode', 'format=json',
        '--data-urlencode', `titles=${title}`,
        '--data-urlencode', 'prop=imageinfo',
        '--data-urlencode', 'iiprop=url|extmetadata|mime|size',
        '--data-urlencode', 'iiurlwidth=1280',
        '-A', UA,
    ];
    const json = JSON.parse(execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
    const page = Object.values(json.query.pages)[0];
    const ii = page.imageinfo[0];
    const em = ii.extmetadata || {};
    const strip = (s) => (s ? String(s).replace(/<[^>]*>/g, '').trim() : '');
    return {
        title: page.title,
        thumburl: ii.thumburl,
        descurl: ii.descriptionurl,
        license: strip(em.LicenseShortName?.value),
        author: strip(em.Artist?.value) || 'Unknown',
        dims: `${ii.width}x${ii.height}`,
    };
}

const manifestPath = join(OUT_DIR, 'manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

for (const t of TARGETS) {
    const info = fetchInfo(t.title);
    const dest = join(OUT_DIR, `${t.slug}.jpg`);
    execFileSync('curl', ['-sL', '-A', UA, '-o', dest, info.thumburl], { stdio: 'inherit' });
    const entry = {
        slug: t.slug, query: 'manual pick', file: `${t.slug}.jpg`,
        title: info.title, source: info.descurl, license: info.license,
        author: info.author, dims: info.dims,
    };
    const idx = manifest.findIndex((m) => m.slug === t.slug);
    if (idx >= 0) manifest[idx] = entry; else manifest.push(entry);
    console.log(`OK  ${t.slug.padEnd(18)} <- ${info.title}  [${info.license}]`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest now has ${manifest.length} entries.`);
