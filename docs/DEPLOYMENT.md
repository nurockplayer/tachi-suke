# TachiSuke Deployment

TachiSuke Phase 1 is an Astro static site intended for Cloudflare Pages.

Cloudflare Pages supports Wrangler configuration files with `name`, `pages_build_output_dir`, and `compatibility_date`. This repo keeps a minimal `wrangler.toml` for project metadata and output directory only. Reference: <https://developers.cloudflare.com/pages/functions/wrangler-configuration/>

## Production Target

- Platform: Cloudflare Pages
- Build command: `pnpm build`
- Build output directory: `dist`
- Project name: `tachi-suke`
- Static output: yes
- Cloudflare Functions/Workers runtime code: not used in Phase 1

## Required Environment Variables

Set these in Cloudflare Pages project settings:

- `SITE_URL`: production URL, for example `https://your-domain.example`
- `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`: optional external submit-place form endpoint
- `PUBLIC_CONTACT_FORM_ENDPOINT`: optional external contact/corrections form endpoint

If `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is empty, submit-place stays in preview mode and the submit button remains disabled.
If `PUBLIC_CONTACT_FORM_ENDPOINT` is empty, contact/corrections stays in preview mode and the submit button remains disabled.

Do not commit Cloudflare API tokens, account IDs, form-provider secrets, or production-only values to the repo.

## Dashboard Deployment

1. Connect the GitHub repo to Cloudflare Pages.
2. Set build command to `pnpm build`.
3. Set build output directory to `dist`.
4. Add `SITE_URL` with the final production domain.
5. Optionally add `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
6. Optionally add `PUBLIC_CONTACT_FORM_ENDPOINT`.
7. Deploy from `main`.

## Optional Wrangler Deployment

Use Wrangler only from a trusted local machine or CI environment where Cloudflare authentication is already configured.

```bash
pnpm build
pnpm dlx wrangler pages deploy dist --project-name tachi-suke
```

Do not add Wrangler as a project dependency unless a future deployment workflow explicitly needs it.

## Pre-Deploy Verification

Run these before deploying:

```bash
pnpm install
pnpm test
pnpm build
pnpm check:links
pnpm check:seo
```

`pnpm check:links` and `pnpm check:seo` require a fresh `pnpm build`.

## Post-Deploy Checks

After production deploy:

- Open the production home page.
- Check `/sitemap.xml`.
- Check `/robots.txt`.
- Check `/feed.xml`.
- Check a representative locale feed such as `/en/feed.xml`.
- Check `/en/search` and `/en/search-index.json`.
- Check `/404.html`.
- Check a representative article detail page.
- Check a representative article category page such as `/en/articles/category/mobile`.
- Check a representative mobile, area, place, and tool detail page.
- Confirm canonical URLs and Open Graph URLs use the production `SITE_URL`.
- Confirm account placeholder routes remain `noindex, nofollow`.
- Confirm `/404.html` renders the branded recovery page and remains `noindex, nofollow`.
- Confirm submit-place behavior matches whether `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is set.
- Confirm contact/corrections behavior matches whether `PUBLIC_CONTACT_FORM_ENDPOINT` is set.

## Rollback

Use Cloudflare Pages deployment history to roll back to the previous successful deployment if a production deploy fails.

The repo does not contain deployment credentials, so rollback should be performed through Cloudflare Pages dashboard or a trusted deployment environment.
