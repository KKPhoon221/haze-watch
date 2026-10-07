# Haze Watch SG

Single-page app: Singapore PSI by area (NEA via data.gov.sg) and weather for Singapore and ASEAN cities (Open-Meteo).

## Files
- `index.html` — the whole app (HTML, CSS, JS).
- `api/psi.js` — Vercel function that proxies and caches the NEA PSI feed. The page tries `/api/psi` first, then data.gov.sg directly, then falls back to a built-in snapshot.
- `vercel.json` — static hosting settings.

## Deploy
**Vercel CLI**
```
npm i -g vercel
cd haze-watch-sg
vercel          # preview
vercel --prod   # production
```
**Git**: push this folder to GitHub, then Import Project at vercel.com/new. Framework preset: Other. No build command, no output directory.

## Optional
Add `DATA_GOV_SG_API_KEY` under Project Settings > Environment Variables for higher data.gov.sg rate limits.

## Data notes
- Haze readings (PSI, PM2.5, PM10, main pollutant) come only from NEA and cover Singapore. Other cities show weather only.
- If a feed can't be reached, the page shows a banner. NEA falls back to a snapshot from 6 Oct 2026 19:00 SGT; city weather falls back to labelled placeholder values.

## Run locally
`vercel dev` (serves the API route too), or open `index.html` directly (the API route is skipped and the page calls data.gov.sg directly).
