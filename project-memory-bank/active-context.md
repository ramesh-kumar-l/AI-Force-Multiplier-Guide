# Active Context

## Current State

The repository is now a Vite React app with:

- A React app orchestrator in `AI-Lexicon.jsx`, now a thin composition root (278 lines) that wires together hooks and components rather than holding data/filter logic directly.
- Focused UI modules under `src/components/`, including Phase 3 additions: `FilterBar`, `BackupControls`, `InlineBanner`, `ArchiveDrawer`, `ArchiveEntryRow`, `EmptyState`.
- Stateful logic extracted into `src/hooks/`: `useLexiconData`, `useLexiconActions`, `useConfirmDialog`, `useEditorState`, `useLexiconFilters`, `useArchiveView`, `useTemplateFill`, `useOnlineStatus`, `usePwaUpdate` (Phase 6).
- Starter guide content aggregated by `src/data/starterGuideData.js` and split into topic modules in `src/data/starterSections/`.
- Schema-versioned local persistence in `src/lib/lexiconStorage.js`, hardened in Phase 3 for quota-exceeded saves and corrupted-storage recovery.
- Pure data mutation actions split by responsibility under `src/lib/actions/` (`sectionActions.js`, `cardActions.js`, `draftHelpers.js`, `shared.js`); `src/lib/lexiconActions.js` is now a re-export barrel.
- Pure filter/search/tag/favorite/archive-view logic in `src/lib/lexiconFilters.js`.
- Pure `{variable}` template extraction/substitution logic in `src/lib/templateVariables.js` (Phase 5).
- Automated Vitest suite (48 tests) covering the `src/lib/` layer.
- Installable PWA (Phase 6): `vite-plugin-pwa` configured in `vite.config.js` generates a web app manifest and a Workbox service worker at build time; app icons live in `public/icons/`; `InlineBanner` (reused, no new component) surfaces offline status and "update available/refresh" prompts.
- Placeholder Python files: `main.py`, `pyproject.toml`, `.python-version`.
- Memory-bank files under `project-memory-bank/`.

## Chosen Direction

The project is now being shaped as a Vite React application while preserving the existing guide component as the main source of content.

## Recent Decisions

- Use Vite React as the runnable app stack.
- Use `project-memory-bank/` for project knowledge.
- Keep JavaScript instead of converting to TypeScript.
- Do not add Python dependencies because no Python runtime feature exists.
- Document Node/npm as required and Python as optional.
- Phase 1 uses `localStorage` through a storage adapter so the UI is ready for a future IndexedDB upgrade.
- Phase 2 keeps all new files under 300 lines and splits UI responsibilities into small components.
- Phase 2 also split the large starter content file so normal source/data files stay under 300 lines.
- Phase 2 supports create, edit, duplicate, archive, delete, reset, tags, notes, and copy metadata while remaining offline-first.
- Phase 3 changed `loadLexiconData`/`saveLexiconData` signatures (`loadLexiconData` now returns `{ data, recovered }`, `saveLexiconData` now returns `{ success, error? }`) instead of throwing/returning bare data, so callers can surface persistence failures in the UI. The only consumer (`AI-Lexicon.jsx`) was rewritten in the same phase, so this was a safe non-breaking change in practice.
- Phase 3 fixed a real bug where importing wrong-shaped JSON (valid JSON, but missing a `sections` array) silently replaced the user's lexicon with starter content; `importLexiconData` now throws a readable error instead.
- Phase 3 split `lexiconActions.js` and extracted hooks out of `AI-Lexicon.jsx` specifically to stay under the 300-line modularity ceiling as favorites/tags/archive-view/backup features were added.
- Vitest (with `jsdom`) was added as the test runner, scoped intentionally to the pure `src/lib/` layer only (no React Testing Library, no e2e framework) to match the project's small-scale, low-overhead testing philosophy.
- Phase 5 skipped a "Phase 4" the user never scoped, going straight from Phase 3 (favorites/tags/archive/backup) to Phase 5 (prompt templates) per explicit user instruction.
- Phase 5 tracks generated-template copies in new `templateCopyCount`/`lastTemplateCopiedAt` card fields, kept independent of the existing `copyCount`/`lastCopiedAt` (which track raw example copies), so both stats stay meaningful.
- Phase 5 template variables are detected with a narrow identifier-only regex (`{name}`, letters/digits/underscore, no spaces/punctuation) specifically so pasted code containing object-literal braces (e.g. `{ foo: 1 }`) is not misdetected as a template placeholder.
- Phase 6 chose `vite-plugin-pwa` (Workbox-based) over a hand-rolled service worker: correct precache versioning/cache-busting/update-lifecycle handling is exactly the kind of thing that's a production liability to get right by hand, and the plugin generates the manifest + service worker from the same Vite build output, so there's no separate asset list to keep in sync.
- Phase 6 uses `registerType: 'prompt'` (not `'autoUpdate'`) so a new deployed version never silently reloads the page out from under a user mid-edit; instead `usePwaUpdate` surfaces a dismissible "Refresh" banner via the existing `InlineBanner` component.
- Phase 6 PWA icons (`public/icons/*.png`) were generated by a small hand-rolled Node PNG encoder script (using only built-in `zlib`, no new dependency) rather than adding an image-processing library like `sharp` just for one-time static asset generation — the script itself isn't part of the app and wasn't added as a dependency.
- Phase 6 service worker/install-prompt/offline-app-shell behavior only activates in the production build (`npm run build` + `npm run preview` or a real deploy); `devOptions.enabled: false` was chosen deliberately so `npm run dev` isn't affected by SW caching during active development.

## Current User Instruction

- Phase 6 (PWA and offline installability) is implemented.
- Before major feature completion, update `implementation-status.md` and `active-context.md`.
