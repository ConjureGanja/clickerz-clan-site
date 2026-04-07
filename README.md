# clickerz-cc site

## Run locally

```bash
npm install
npm run dev
```

If you want to test the production build locally:

```bash
npm run build
npm run preview
```

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

The Vite config uses a relative `base` path so built assets resolve correctly in static hosting environments.
