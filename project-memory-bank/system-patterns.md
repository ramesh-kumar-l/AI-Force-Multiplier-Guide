# System Patterns

## Application Shape

The app is intentionally modular: a root React orchestrator mounted by a Vite entrypoint, with starter data, persistence, data mutations, and rendering separated.

- `AI-Lexicon.jsx`: app state, filtering, editor flow, confirmation flow, persistence calls.
- `src/components/`: small UI modules for header, sections, cards, modals, confirmations, and content rendering.
- `src/lib/lexiconActions.js`: pure data mutation helpers.
- `src/lib/lexiconStorage.js`: storage boundary.
- `src/data/starterGuideData.js`: starter content aggregator.
- `src/data/starterSections/`: topic-specific starter content modules.

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

Phase 2 continues to autosave after state changes. Mutations happen through pure helper functions so later tests can verify behavior without rendering React.

## UI Behavior

- `expandedSections` controls open top-level categories.
- `expandedItems` controls open prompt cards.
- `searchQuery` filters across section title/description and card title/content/example code/notes/tags.
- `copyToClipboard` copies prompt examples, briefly shows copied feedback, and updates local copy metadata.
- `editor` controls the section/card create/edit modal.
- `confirmState` controls archive/delete/reset confirmation dialogs.
- Archived sections/cards are hidden from the main lexicon.
- Delete permanently removes local data.

## Styling Pattern

Tailwind utility classes live directly in JSX. Global CSS is intentionally minimal and limited to Tailwind import plus base page styles.

## Modularity Rule

Keep source files under 300 lines whenever practical. Split new features by responsibility before adding broad logic to `AI-Lexicon.jsx`.

Starter content is also split by topic so AI sessions can read one section file instead of the entire seed library.
