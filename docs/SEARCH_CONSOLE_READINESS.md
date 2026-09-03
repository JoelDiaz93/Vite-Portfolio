# Search Console readiness — v3.12

The portfolio is prepared for Google Search Console verification and indexing, but the verification token must come from the owner’s Search Console account and is intentionally not committed here.

## Publish first

Deploy the site and verify these public resources:

- `https://carlosdiazec.com/robots.txt`
- `https://carlosdiazec.com/sitemap.xml`
- `https://carlosdiazec.com/og/portfolio.png`
- `https://carlosdiazec.com/en/resume`
- `https://carlosdiazec.com/es/resume`

## Search Console

1. Add `carlosdiazec.com` as a Domain property when DNS access is available; otherwise use URL-prefix verification.
2. Complete the verification method provided by Search Console. Do not invent or reuse a verification token.
3. Submit `https://carlosdiazec.com/sitemap.xml`.
4. Inspect and request indexing for the highest-value URLs:
   - `/en`
   - `/es`
   - `/en/projects/routefast`
   - `/es/projects/routefast`
   - `/en/projects/eventra`
   - `/es/projects/eventra`
   - `/en/resume`
   - `/es/resume`
5. After indexing, review Pages, Core Web Vitals and search queries before changing titles or descriptions again.

## Implemented technical signals

- canonical URLs managed by the SPA route
- `hreflang` for English, Spanish and x-default
- sitemap + robots reference
- Person, WebSite and ProfilePage JSON-LD
- OpenGraph and Twitter large-image metadata
- route-specific static HTML entry points so crawlers do not depend on client-side JavaScript
- project-specific social images for RouteFast, Eventra, QRFlow and Cerynt
- recruiter-oriented resume pages and downloadable PDF assets
