# System Patterns

## Application Shape

The app is intentionally modular: a root React orchestrator mounted by a Vite entrypoint, with starter data, persistence, data mutations, filtering, and rendering separated.

- `AI-Lexicon.jsx`: composition root only. Consumes the hooks layer and renders the component tree; holds no data/filter state directly (only trivial local UI state: expanded-section/item maps and the copy-feedback id).
- `src/hooks/`: stateful logic, one concern per hook (see "Hooks Layer" below).
- `src/components/`: small UI modules for header, filter bar, sections, cards, modals, confirmations, the archive drawer, banners, empty states, and content rendering.
- `src/lib/actions/`: pure data mutation helpers, split by responsibility (`sectionActions.js`, `cardActions.js`, `draftHelpers.js`, `shared.js` for id/timestamp/order utilities). `src/lib/lexiconActions.js` re-exports all of them as a stable barrel import path.
- `src/lib/lexiconFilters.js`: pure search/tag/favorite/archive-view/stats helpers, framework-independent and unit-tested.
- `src/lib/templateVariables.js`: pure `{variable}` extraction/substitution helpers for the prompt-template filler, framework-independent and unit-tested.
- `src/lib/lexiconStorage.js`: storage boundary (load/save/reset/export/import + normalization).
- `src/data/starterGuideData.js`: starter content aggregator.
- `src/data/starterSections/`: topic-specific starter content modules.

## Hooks Layer

Stateful concerns live in `src/hooks/`, each independently testable/replaceable and each under the 300-line ceiling:

- `useLexiconData`: owns the persisted `lexiconData` state, the autosave effect, and export/import/reset actions. Surfaces `saveError`, `recoveredNotice`, and `importError` so the UI can show non-blocking inline banners instead of the app crashing or silently losing data.
- `useLexiconActions`: thin dispatchers that wrap the pure `src/lib/actions/*` functions with the hook's `setLexiconData` setter.
- `useConfirmDialog`: generic confirm/cancel dialog state, reused for every destructive action (archive, delete-forever, reset) across the main list and the archive drawer.
- `useEditorState`: create/edit modal state for both sections and cards.
- `useLexiconFilters`: search text, selected tags, tag match-mode (any/all), and favorites-only state; derives `visibleSections`/`availableTags`/`stats` via `src/lib/lexiconFilters.js`.
- `useArchiveView`: archive-drawer open/close state and the derived archived-sections/archived-cards lists.
- `useTemplateFill`: owns the active template-fill "session" (which card, detected `{variable}` names, current input values), derives the generated (substituted) content/example via `src/lib/templateVariables.js`, and wraps the copy action so generated-prompt copies are tracked via `recordTemplateCopy` without ever mutating the source card.

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
- `favorite` (toggled from the card row's star button; drives the favorites-only filter — no longer a dead field as of Phase 3)
- `archived`
- `order`
- `copyCount`
- `lastCopiedAt`
- `templateCopyCount` (Phase 5 — incremented only when a *generated*, variable-filled prompt is copied via `TemplateFillModal`, kept independent of `copyCount`)
- `lastTemplateCopiedAt` (Phase 5)
- `createdAt`
- `updatedAt`

The top-level app data includes `schemaVersion`, `appVersion`, timestamps, and `sections`.

## Storage Pattern

`localStorage` behind a small adapter (`src/lib/lexiconStorage.js`). The UI never touches browser storage directly.

- `loadLexiconData()` returns `{ data, recovered }`. On corrupted/unparseable storage, it generates starter data, **persists it immediately** (Phase 3 fix — previously the corrupted string was left in place and silently ignored), and sets `recovered: true` so the UI can show a one-time notice.
- `saveLexiconData(data)` returns `{ success, error? }` instead of throwing, so a quota-exceeded write surfaces as a dismissible UI banner rather than crashing.
- `importLexiconData(jsonText)` validates the parsed shape (`isValidLexiconShape`) before accepting it, throwing a readable `Error` for bad JSON or a wrong-shaped payload (Phase 3 fix — previously wrong-shaped JSON silently substituted starter content, destroying the user's data with no warning).
- `exportLexiconData`/`resetLexiconData` are unchanged from Phase 2.

Mutations happen through pure helper functions in `src/lib/actions/` so tests can verify behavior without rendering React (see the Vitest suites alongside each module).

## UI Behavior

- `expandedSections` controls open top-level categories.
- `expandedItems` controls open prompt cards.
- Search/tag/favorite filtering (`useLexiconFilters` + `src/lib/lexiconFilters.js`): free-text search matches section title/description and card title/content/example code/notes/tags; tag filtering is a multi-select chip list with an any/all match-mode toggle; a favorites-only toggle narrows to starred cards. All three compose together, and archived items are always excluded from this view.
- `copyToClipboard` copies prompt examples, briefly shows copied feedback, and updates local copy metadata.
- `editor` controls the section/card create/edit modal.
- `confirmState` controls archive/delete/reset confirmation dialogs, reused by both the main list and the archive drawer. Renders at `z-[60]` — one z-index level above the archive drawer's `z-50` — so a confirmation triggered from inside the drawer is never visually blocked by it (a real bug hit and fixed during Phase 3 manual testing).
- Archived sections/cards are hidden from the main lexicon but remain reachable via the **Archived drawer** (`ArchiveDrawer`, opened from `FilterBar`'s "Archived (N)" button): each archived section/card can be Restored (unarchived) or permanently Deleted. Restoring a section does not cascade-restore its individually archived cards — card-level archive state stays independent.
- Delete (from the main list or the archive drawer) permanently removes local data.
- Backup: `BackupControls` (in `LexiconHeader`) triggers a JSON file download on Export, and a file-picker + `importLexiconData` on Import; import failures surface via `InlineBanner` without touching existing data.
- **Prompt templates (Phase 5)**: any `{identifierName}` token in a card's `content` or `exampleCode` is a template variable (matched via `src/lib/templateVariables.js`'s `\{[A-Za-z][A-Za-z0-9_]*\}` pattern — deliberately narrow so pasted code containing `{ foo: 1 }`-style object literals is never misdetected). `CardPanel` shows a wand-icon button only when at least one variable is detected, opening `TemplateFillModal` (via `useTemplateFill`) with one text input per variable, a live substituted-output preview, and a "Copy generated prompt" button. Filling and copying never mutates the saved card — only the modal's local state and the `templateCopyCount`/`lastTemplateCopiedAt` tracking fields change.

## Styling Pattern

Tailwind utility classes live directly in JSX. Global CSS is intentionally minimal and limited to Tailwind import plus base page styles.

## Modularity Rule

Keep source files under 300 lines whenever practical. Split new features by responsibility before adding broad logic to `AI-Lexicon.jsx`.

Starter content is also split by topic so AI sessions can read one section file instead of the entire seed library.
