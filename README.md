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

## POH planner

`/poh-planner` is a client-side Old School RuneScape house planner for the G I Clickerz team house. It does not call a server. Layouts are saved in the browser and can be exported as JSON.

How the room data is sourced, how upstairs and the dungeon are opened, and how furniture tiers work is written up in [docs/poh-planner.md](docs/poh-planner.md).

Rebuild the single-file offline copy with:

```bash
npm run build:poh-html
```

That refreshes `public/poh-planner.html`.

## Clan bingo

`/bingo` is a client-side bingo card for clan events. Click a tile to complete it, finish a row or column for a bingo, and use **Edit card** to swap tasks (filtered by low/mid/high level), rename tiles, or change how many of something a tile needs. Cards can be shuffled, re-rolled from chosen levels, resized (6×4, 5×5, 4×4, 7×5), and saved as named versions that keep updating as you play. Everything is stored in the browser.

**Copy share link** puts the whole card (tiles, names, progress) into the link after `#card=`, so it works without a server — whoever opens it gets asked whether to load it.

- Tasks live in `src/bingo/tasks.js`. To add one, drop a `.webp` named after its id into `public/bingo/` and add a line to the list.
- Item images are from the [Old School RuneScape Wiki](https://oldschool.runescape.wiki/) (CC BY-NC-SA 3.0).

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
