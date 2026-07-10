# Quick Starter Guide

Use this when you only want the shortest path from download to running app.

## 1. Install Prerequisites

Install Node.js `20.19.0` or newer. npm is included with Node.js.

Check your versions:

```bash
node --version
npm --version
```

## 2. Install Project Dependencies

From the project root:

```bash
npm install
```

## 3. Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## 4. Build For Production

```bash
npm run build
```

The optimized static site is written to `dist/`.

## 5. Preview The Production Build

```bash
npm run preview
```

Open the preview URL printed by Vite.

## Common First-Time Fixes

- If `npm install` fails, update Node.js to a current LTS version that satisfies `>=20.19.0`.
- If the page has no styling, confirm `src/index.css` imports Tailwind with `@import "tailwindcss";`.
- If icons fail to render, confirm `lucide-react` installed successfully.
