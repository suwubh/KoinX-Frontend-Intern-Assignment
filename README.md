# KoinX – Tax Loss Harvesting

A tax loss harvesting tool built for the KoinX frontend intern assignment. Shows capital gains before/after harvesting and lets you select holdings to offset gains in real-time.

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to Vercel — it picks up the Vite config automatically.

## Project structure

```
src/
  api/            # mock API functions (promise-based, no actual server)
  components/     # UI components, one file per component
  context/        # AppContext — data fetching, selection state, theme
  utils/
    formatters.js # all number/currency formatting in one place
    calculations.js  # harvesting math (computeAfterGains, getNetGains)
```

## How the harvesting logic works

Base capital gains come from the `/api/capitalGains` mock. When you select a holding in the table:

- If `stcg.gain > 0` → added to `stcg.profits`
- If `stcg.gain < 0` → absolute value added to `stcg.losses`
- Same for `ltcg`

The "After Harvesting" card recomputes on every selection change. The savings line (`You are going to save upto $X`) appears when post-harvesting effective gains are lower than pre-harvesting realised gains. The `$X` is the direct reduction in capital gains (not tax-adjusted — a real app would apply STCG/LTCG tax rates).

## Assumptions

- Mock data uses USD. The Figma uses `$` but the assignment spec uses `₹` — I kept `$` to match the Figma.
- "Savings" is calculated as `preRealised − postEffective`, not multiplied by a tax rate, since the spec doesn't define one.
- "View all" in the holdings table initially shows 4 rows, expanding to show all 8.
- Dark mode preference is persisted to `localStorage`.
- Coin logos are loaded from CoinGecko's CDN. If a logo fails to load (network issue), the `<img>` hides itself.
- The `averageBuyPrice` column is included in the mock data but the spec's table layout doesn't include it as a column — so it's not shown.

## Features

- Pre + After Harvesting cards update in real-time as holdings are selected
- Select all / deselect all checkbox in table header (handles partial selection state)
- View all / View less toggle in holdings table
- Light and dark mode with system preference + toggle
- Loading spinners while mock API resolves
- Error states for both API calls
- Fully responsive — cards stack on mobile, table scrolls horizontally
