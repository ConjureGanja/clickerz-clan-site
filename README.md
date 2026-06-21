# clickerz-cc site

## The Clickerz Clans Website

This is our official websites repo, with our clickerz anthem and all, it's an osrs community that is all about just that, commmunity and growing together, made by ConjuresBuds aka ConjureGanja co-lead of the Clan, because as I said and I quote "I just really like osrs and want to learn some coding/programming especially with AI, so I thought a website for the clan would be a great way to mix the 2, after I realized the AI agent that plays OSRS is just basically a Bot, which is against the ToS of the game haha. This is safer and better, the song was fun too!"

Go to clickerz.cc to check out the site, it's lit, and join our clan if you play! msg me on disc by joining it through the website.

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

### Shared clicking-game leaderboard

The clicking game now uses a Cloudflare Pages Function at `/api/clicking-leaderboard`.

Add a KV namespace binding in Cloudflare Pages so scores are shared across visitors:

- **Binding name:** `CLICKERZ_LEADERBOARD`
- **Type:** KV namespace
