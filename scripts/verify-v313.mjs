import fs from 'node:fs';
import path from 'node:path';
import { siteContent } from '../src/data/portfolio.js';

const required = [
  'public/og/portfolio.png',
  'public/og/routefast.png',
  'public/og/eventra.png',
  'public/og/qrflow.png',
  'public/og/cerynt.png',
  'public/resume/Carlos-Diaz-Software-Engineer-EN.pdf',
  'public/resume/Carlos-Diaz-Software-Engineer-ES.pdf',
  'public/sitemap.xml',
  'docs/SEARCH_CONSOLE_READINESS.md',
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.resolve(file))) failures.push(`missing ${file}`);
}

for (const language of ['en', 'es']) {
  const content = siteContent[language];
  if (content.results?.items?.length !== 4) failures.push(`${language}: expected 4 professional-value pillars`);
  if (content.results?.signals?.length !== 2) failures.push(`${language}: expected 2 professional trajectory signals`);
  if (!content.results.items.every((item) => item.tags?.length >= 4)) failures.push(`${language}: professional-value pillar tags missing`);
  if (!content.resume?.currentDownload) failures.push(`${language}: resume download missing`);
  for (const slug of ['routefast', 'eventra', 'qrflow']) {
    if (!content.projects.items.some((project) => project.slug === slug)) failures.push(`${language}: project ${slug} missing`);
  }
}

const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const seoPages = fs.existsSync('seo-pages') ? fs.readdirSync('seo-pages').filter((file) => file.endsWith('.html')) : [];
if (seoPages.length !== 12) failures.push(`expected 12 generated SEO pages, found ${seoPages.length}`);
for (const url of ['/en/resume', '/es/resume', '/en/projects/routefast', '/es/projects/routefast']) {
  if (!sitemap.includes(url)) failures.push(`sitemap missing ${url}`);
}

if (failures.length) {
  console.error('Portfolio v3.13 verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Portfolio v3.13 verification: OK');
