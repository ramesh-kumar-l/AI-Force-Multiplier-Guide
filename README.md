# AI Lexicon

AI Lexicon is an offline-first React app for building a private library of AI-assisted engineering workflows. It starts with a practical guide for prompting, coding, testing, architecture, tooling, and delivery, then lets you edit it into your own trusted lexicon.

## Features

- Search across section titles, descriptions, card content, tags, notes, and examples.
- Expand and collapse sections and cards for focused reading.
- Create, edit, duplicate, archive, and delete sections.
- Create, edit, duplicate, archive, and delete prompt/workflow cards.
- Add tags and private notes to cards.
- Copy reusable prompt examples to the clipboard.
- Persist changes offline in browser `localStorage`.
- Reset back to the starter guide when needed.
- Build as a static frontend with Vite.

## Repository Structure

```text
.
|-- AI-Lexicon.jsx                  # Main React app orchestrator
|-- src/
|   |-- components/                 # Focused UI components under 300 lines
|   |-- constants/                  # App option lists
|   |-- data/starterGuideData.js    # Starter guide content
|   |-- data/starterSections/       # Starter guide sections split by topic
|   |-- lib/lexiconActions.js       # Pure data mutation helpers
|   |-- lib/lexiconStorage.js       # Local persistence adapter
|   |-- main.jsx                    # React app entrypoint
|   `-- index.css                   # Tailwind CSS import and base styles
|-- index.html                      # Vite HTML entrypoint
|-- vite.config.js                  # Vite React + Tailwind configuration
|-- package.json                    # JavaScript scripts and dependencies
|-- requirements.txt                # Python dependency note
|-- pyproject.toml                  # Optional Python project metadata
|-- DEPENDENCIES.md                 # Dependency explanations
|-- QuickStarterGuide.md            # Fast setup path
`-- project-memory-bank/            # Project context for AI-assisted development
```

## Prerequisites

- Node.js `>=20.19.0`
- npm, included with Node.js
- Optional: Python `>=3.12` if you want to run or extend `main.py`

Verify your tools:

```bash
node --version
npm --version
python --version
```

## Installation

From the project root:

```bash
npm install
```

This installs React, Vite, Tailwind CSS, Lucide icons, and the build plugins listed in `package.json`.

## Run Locally

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`. Open that URL in a browser.

## Build For Production

```bash
npm run build
```

The production-ready static files are generated in `dist/`.

## Preview The Production Build

```bash
npm run preview
```

This serves the already-built `dist/` output locally so you can verify what will be deployed.

## How The App Works

`AI-Lexicon.jsx` owns app state, filtering, editor flow, confirmations, and persistence calls. Rendering is split into small components under `src/components/`.

- Starter content is aggregated by `src/data/starterGuideData.js` and split by topic in `src/data/starterSections/`.
- Runtime changes are persisted through `src/lib/lexiconStorage.js`.
- Data changes are handled by pure helpers in `src/lib/lexiconActions.js`.
- The storage model uses `schemaVersion`, `appVersion`, timestamps, and `sections`.
- Each section has title, description, icon, accent color, order, archive state, timestamps, and cards.
- Each card has title, content, example code, notes, tags, archive state, copy metadata, and timestamps.

## Editing Content

Use the app UI for normal editing:

- Click `Section` to create a new section.
- Click `Card` inside a section to add a new card.
- Use pencil buttons to edit existing sections or cards.
- Use copy buttons to duplicate useful structures.
- Use archive when you want to hide something without destroying the record.
- Use delete only when the item can be permanently removed from local storage.

Starter content can still be updated by editing the relevant file in `src/data/starterSections/`, but existing browser data will continue using the user’s locally saved version until reset.

## Dependency Notes

Read `DEPENDENCIES.md` for a plain-English explanation of each dependency and why it exists.

There are no Python packages to install. `requirements.txt` intentionally documents that the runnable app is frontend-only today.

## Deployment

This is a static frontend after build. You can deploy the `dist/` folder to static hosts such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or an internal static web server.

Typical deployment command:

```bash
npm run build
```

Upload or serve the generated `dist/` directory.

## Troubleshooting

### `npm install` fails

Check Node.js first. Vite requires a modern Node.js version, and this project declares `>=20.19.0`.

### The page renders without styling

Confirm `src/index.css` contains `@import "tailwindcss";` and `vite.config.js` includes `@tailwindcss/vite`.

### Icons do not appear

Run `npm install` again and confirm `lucide-react` is listed in `package.json`.

### My edits disappeared

The current persistence layer uses browser `localStorage`. Edits are tied to the browser/profile/domain where you made them. Export/import backup is planned for a later phase.

### Copy buttons do not work

Clipboard access is a browser feature and may require a secure context in some environments. It works on localhost in modern browsers.

### `python main.py` only prints a greeting

That is expected. The Python file is a placeholder and not part of the frontend runtime.

## FAQ

### Is this a Python app or a React app?

It is a React app. Python metadata exists, but the user-facing application runs through Vite.

### Where do I start as a new engineer?

Read `QuickStarterGuide.md`, run `npm install`, then run `npm run dev`.

### What file should I edit to change the app behavior?

Start with `AI-Lexicon.jsx` for app flow, `src/components/` for UI pieces, `src/lib/lexiconActions.js` for data mutations, and `src/lib/lexiconStorage.js` for persistence.

### Do I need a backend?

No. The current app is fully static and runs in the browser.

### Do I need environment variables?

No environment variables are required.

### How do I know my changes did not break the app?

Run `npm run build`, then run `npm run preview`. Open the preview URL and check search, expand/collapse, editing, archive/delete confirmations, reset, and copy buttons.
