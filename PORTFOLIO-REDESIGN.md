# Portfolio redesign

## Project classification

1. **Flagship case studies** — projects with enough engineering depth to explain the problem, constraints, architecture, decisions, workflow, challenges and measurable outcome. Eventra is the first case study.
2. **Product builds** — end-to-end applications that demonstrate delivery across product flow, frontend, backend/data and deployment.
3. **Focused builds** — narrower projects that demonstrate a specific technical or UX capability without overstating their scope.

## Experience model

Professional experience uses a custom career rail rather than a conventional résumé list. Education uses a separate learning path to communicate formal study plus continued specialization.

## Skills model

Skills are grouped by engineering problem space and shown in an interactive capability console. Tools are intentionally contextualized instead of shown as a flat logo cloud.

## Commercial positioning

The portfolio now addresses two audiences without splitting the brand:
- recruiters / engineering teams;
- founders / businesses looking for selected freelance software work.

## Visual direction

Palette: obsidian / graphite / ivory / oxidized copper / mineral sage. The goal is professional, editorial and technical without relying on the common blue-purple SaaS portfolio aesthetic.

## SEO / usability

- descriptive title, meta description, Open Graph and Twitter metadata;
- Person structured data;
- semantic headings and accessible forms;
- keyboard focus and reduced-motion support;
- responsive layouts;
- SPA fallback for `/projects/eventra` on hosts that support `_redirects`;
- `.env` is ignored and `.env.example` is provided.

## Before deploying

Set EmailJS variables from `.env.example`. If the portfolio has a custom production domain, add the canonical URL and set the `url` field in the JSON-LD Person schema. Add a dedicated Open Graph image when final screenshots are available.
