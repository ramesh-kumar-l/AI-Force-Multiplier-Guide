# Active Context

## Current State

The repository is now a Vite React app with:

- A React app orchestrator in `AI-Lexicon.jsx`, now a thin composition root (241 lines) that wires together hooks and components rather than holding data/filter logic directly.
- Focused UI modules under `src/components/`, including Phase 3 additions: `FilterBar`, `BackupControls`, `InlineBanner`, `ArchiveDrawer`, `ArchiveEntryRow`, `EmptyState`.
- Stateful logic extracted into `src/hooks/`: `useLexiconData`, `useLexiconActions`, `useConfirmDialog`, `useEditorState`, `useLexiconFilters`, `useArchiveView`.
- Starter guide content aggregated by `src/data/starterGuideData.js` and split into topic modules in `src/data/starterSections/`.
- Schema-versioned local persistence in `src/lib/lexiconStorage.js`, hardened in Phase 3 for quota-exceeded saves and corrupted-storage recovery.
- Pure data mutation actions split by responsibility under `src/lib/actions/` (`sectionActions.js`, `cardActions.js`, `draftHelpers.js`, `shared.js`); `src/lib/lexiconActions.js` is now a re-export barrel.
- Pure filter/search/tag/favorite/archive-view logic in `src/lib/lexiconFilters.js`.
- Automated Vitest suite (41 tests) covering the `src/lib/` layer.
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

## Current User Instruction

- Phase 3 is implemented.
- Before major feature completion, update `implementation-status.md` and `active-context.md`.
