import fs from 'node:fs';
import path from 'node:path';
import { siteContent } from '../src/data/portfolio.js';

const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const outDir = path.join(root, 'seo-pages');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const pages = [];
for (const language of ['en', 'es']) {
  const content = siteContent[language];
  pages.push({
    key: `home-${language}`,
    language,
    route: `/${language}`,
    title: content.meta.title,
    description: content.meta.description,
    image: '/og/portfolio.png',
    type: 'profile',
  });
  pages.push({
    key: `resume-${language}`,
    language,
    route: `/${language}/resume`,
    title: content.resume.pageTitle,
    description: content.resume.metaDescription,
    image: '/og/portfolio.png',
  });

  for (const slug of ['eventra', 'routefast', 'qrflow', 'cerynt']) {
    const data = slug === 'eventra' ? content.eventra : content.projectCases?.[slug];
    if (!data) continue;
    pages.push({
      key: `${slug}-${language}`,
      language,
      route: `/${language}/projects/${slug}`,
      title: data.pageTitle,
      description: data.metaDescription || content.meta.description,
      image: `/og/${slug}.png`,
    });
  }
}

const escapeAttr = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

for (const page of pages) {
  const alternateLanguage = page.language === 'en' ? 'es' : 'en';
  const alternateRoute = page.route === `/${page.language}` ? `/${alternateLanguage}` : page.route.replace(`/${page.language}/`, `/${alternateLanguage}/`);
  const canonical = `https://carlosdiazec.com${page.route}`;
  const alternate = `https://carlosdiazec.com${alternateRoute}`;
  const image = `https://carlosdiazec.com${page.image}`;

  let html = source
    .replace('<html lang="en">', `<html lang="${page.language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${page.type || 'article'}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${page.language === 'es' ? 'es_EC' : 'en_US'}" />`)
    .replace(/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${page.language === 'es' ? 'en_US' : 'es_EC'}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);

  const hreflang = `    <link rel="canonical" href="${canonical}" />\n    <link rel="alternate" hreflang="${page.language}" href="${canonical}" />\n    <link rel="alternate" hreflang="${alternateLanguage}" href="${alternate}" />\n    <link rel="alternate" hreflang="x-default" href="${page.language === 'en' ? canonical : alternate}" />\n`;
  html = html.replace('    <link rel="icon" type="image/svg+xml" href="/logo.svg" />', `${hreflang}    <link rel="icon" type="image/svg+xml" href="/logo.svg" />`);

  fs.writeFileSync(path.join(outDir, `${page.key}.html`), html);
}

console.log(`Generated ${pages.length} SEO entry pages.`);
