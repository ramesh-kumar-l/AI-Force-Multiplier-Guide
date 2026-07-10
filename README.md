# AI Lexicon

A searchable React lexicon for practical AI-assisted development. It collects prompting, coding, testing, architecture, tooling, and workflow patterns into an interactive guide with expandable sections and copyable prompt examples.

## Features

- Search across guide titles, explanations, and example prompts.
- Expandable sections for prompting, development workflows, optimization, testing, architecture, tooling, and AI-first delivery.
- Copy-to-clipboard buttons for example prompts.
- Vite-powered local development and static production builds.
- Tailwind CSS utility styling with Lucide React icons.
- Lightweight Python metadata with no Python runtime dependencies.

## Repository Structure

```text
.
├── AI-Lexicon.jsx                  # Main reusable React guide component
├── src/
│   ├── main.jsx                    # React app entrypoint
│   └── index.css                   # Tailwind CSS import and base styles
├── index.html                      # Vite HTML entrypoint
├── vite.config.js                  # Vite React + Tailwind configuration
├── package.json                    # JavaScript scripts and dependency metadata
├── requirements.txt                # Python dependency note
├── pyproject.toml                  # Optional Python project metadata
├── DEPENDENCIES.md                 # Dependency explanations
├── QuickStarterGuide.md            # Fast setup path
└── project-memory-bank/            # Project context for future maintainers
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

The main component lives in `AI-Lexicon.jsx`, starter content lives in `src/data/starterGuideData.js`, and local persistence is wrapped by `src/lib/lexiconStorage.js`.

- The storage model uses `schemaVersion`, `appVersion`, timestamps, and `sections`.
- Each section has an `id`, `title`, `description`, `iconKey`, Tailwind gradient `color`, order, archive state, timestamps, and `cards`.
- Each card has an `id`, `sectionId`, `title`, `content`, optional `exampleCode`, notes, tags, favorite/archive state, copy metadata, and timestamps.
- `searchQuery` filters cards by title, content, and example code.
- `expandedSections` and `expandedItems` track which panels are open.
- `copyToClipboard` writes prompt examples to the browser clipboard and updates local copy metadata.

Phase 1 persistence uses browser `localStorage` through the storage adapter. Later phases can move the adapter to IndexedDB without forcing the UI to know about the storage backend.

## Add Or Edit Guide Content

For now, edit starter content in `src/data/starterGuideData.js`. Later phases will add in-app editing.

To add a new card:

```jsx
{
  id: 'new-topic-1',
  title: 'Your New Prompt Pattern',
  content: `
Short explanation here.
- Practical point one
- Practical point two
`,
  exampleCode: `"Copy-ready prompt example"`
}
```

Use unique `id` values so expand/collapse and copy feedback remain predictable.

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

Confirm `src/index.css` contains:

```css
@import "tailwindcss";
```

Also confirm `vite.config.js` includes `@tailwindcss/vite`.

### Icons do not appear

Run `npm install` again and confirm `lucide-react` is listed in `package.json`.

### Copy buttons do not work

Clipboard access is a browser feature and may require a secure context in some environments. It works on localhost in modern browsers.

### `python main.py` only prints a greeting

That is expected. The Python file is a placeholder and not part of the frontend runtime.

## FAQ

### Is this a Python app or a React app?

It is a React app. Python metadata exists, but the user-facing application runs through Vite.

### Where do I start as a new engineer?

Read `QuickStarterGuide.md`, run `npm install`, then run `npm run dev`.

### What file should I edit to change the guide?

Edit `AI-Lexicon.jsx`.

### Do I need a backend?

No. The current app is fully static and runs in the browser.

### Do I need environment variables?

No environment variables are required.

### How do I know my changes did not break the app?

Run:

```bash
npm run build
```

Then run:

```bash
npm run preview
```

Open the preview URL and check search, expand/collapse, and copy buttons.
