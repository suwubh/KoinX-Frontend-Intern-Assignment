# KoinX Tax Loss Harvesting

React implementation of the KoinX frontend intern assignment. The app loads mock capital gains and holdings data, lets the user choose assets to harvest, and updates the after-harvesting card immediately.

## Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

Useful scripts:

```bash
npm run build
npm run preview
```

## Features

- Pre-harvesting and after-harvesting capital gains cards
- Mock API calls with loading and error states
- Holdings table with row selection and select all
- Amount to sell shown only for selected holdings
- Short-term and long-term gain sorting
- View all / view less for the holdings list
- Light/dark theme toggle
- Responsive layout with horizontal table scroll on small screens

## Project structure

```text
src/
  api/          mock API responses
  components/   UI components
  context/      shared app state
  utils/        calculations and formatting helpers
```

## Harvesting logic

The base capital gains come from `src/api/capitalGains.js`. When a holding is selected, its short-term and long-term gains are applied to the after-harvesting totals:

- positive gain increases profits
- negative gain increases losses

Net capital gains are calculated as `profits - losses`. The savings message is shown only when the after-harvesting realised gain is lower than the pre-harvesting realised gain.

## Assumptions

- Currency is shown as INR because the assignment data uses INR-style prices and the savings requirement uses `INR X`.
- The savings value is the reduction in realised gains, not tax-adjusted savings, because the assignment does not provide tax rates.
- The mock holdings response contains duplicate symbols such as `USDC`, so the app adds a generated `id` for selection state.
- The spec's holdings contain only negligible negative gains (< ₹0.01 total), which means selecting any combination never produces a visible savings figure. Three additional holdings with realistic losses are included so the "You are going to save" banner can be demonstrated.

## Screenshots

Desktop view:

![Desktop screenshot](screenshots/desktop_screenshot.jpeg)

Mobile view:

![Mobile screenshot](screenshots/mobile_screenshot.jpeg)
