# System Patterns

## Application Shape

The app is intentionally simple: one reusable React component mounted by a Vite entrypoint, with starter data and persistence separated from the UI.

## Content Model

Starter guide content is stored in `src/data/starterGuideData.js`. Runtime data is loaded through `src/lib/lexiconStorage.js`.

Each section includes:

- `id`
- `title`
- `description`
- `iconKey`
- `color`
- `order`
- `archived`
- `createdAt`
- `updatedAt`
- `cards`

Each card includes:

- `id`
- `sectionId`
- `title`
- `content`
- optional `exampleCode`
- `notes`
- `tags`
- `favorite`
- `archived`
- `order`
- `copyCount`
- `lastCopiedAt`
- `createdAt`
- `updatedAt`

The top-level app data includes `schemaVersion`, `appVersion`, timestamps, and `sections`.

## Storage Pattern

Phase 1 uses `localStorage` behind a small adapter. The UI calls `loadLexiconData` and `saveLexiconData` rather than touching browser storage directly. The adapter also exposes reset/export/import helpers for later UI phases.

## UI Behavior

- `expandedSections` controls open top-level categories.
- `expandedItems` controls open prompt cards.
- `searchQuery` filters cards across title, content, and example code.
- `copyToClipboard` copies prompt examples, briefly shows copied feedback, and updates local copy metadata.

## Styling Pattern

Tailwind utility classes live directly in JSX. Global CSS is intentionally minimal and limited to Tailwind import plus base page styles.
