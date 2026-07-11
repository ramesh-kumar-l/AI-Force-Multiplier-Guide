# Progress

## Completed

- Identified the real app as a React guide component.
- Identified Python files as placeholder metadata rather than runtime app code.
- Chose Vite React as the runnable frontend stack.
- Chose `project-memory-bank/` as the memory-bank location.
- Added documentation plan covering onboarding, dependencies, quick start, and memory bank.
- Converted the standalone component into a runnable Vite React app.
- Installed JavaScript dependencies and generated `package-lock.json`.
- Verified `npm run build`, production preview, and the local dev server.
- Phase 1: extracted starter content into `src/data/starterGuideData.js`.
- Phase 1: added schema-versioned local persistence in `src/lib/lexiconStorage.js`.
- Phase 1: adapted the app to load/save `sections/cards` runtime data while preserving search, expand/collapse, and copy behavior.
- Phase 2: split the UI into modular components under `src/components/`.
- Phase 2: split starter content into topic modules under `src/data/starterSections/`.
- Phase 2: added pure mutation helpers in `src/lib/lexiconActions.js`.
- Phase 2: added section/card create, edit, duplicate, archive, delete, and reset flows.
- Phase 2: added card tags and private notes editing.
- Phase 2: updated README to document the editable offline app.
- Phase 2: verified production build with `npm.cmd run build`.
- Phase 3: added Vitest + jsdom test runner (`npm run test`).
- Phase 3: split `lexiconActions.js` into `src/lib/actions/` (section/card/draft/shared modules) behind a barrel re-export.
- Phase 3: hardened `lexiconStorage.js` — quota-exceeded saves no longer throw, corrupted-storage recovery is now persisted immediately, and wrong-shaped/malformed JSON imports now throw a readable error instead of silently substituting starter content (a real data-loss bug found and fixed this phase).
- Phase 3: added `src/lib/lexiconFilters.js` (search/tag/favorite/archive-view/stats helpers), verified to preserve prior search behavior via tests.
- Phase 3: extracted `src/hooks/` (data, actions, confirm dialog, editor state, filters, archive view) and rewired `AI-Lexicon.jsx` as a thin composition root.
- Phase 3: added favorites (star toggle + favorites-only filter), tag filters (multi-select, any/all match mode), archive management (drawer with restore/delete-forever), and backup export/import (JSON file download + file-picker import) with inline error/notice banners.
- Phase 3: fixed a z-index stacking bug found during manual browser testing where `ConfirmDialog` was visually blocked by `ArchiveDrawer`.
- Phase 3: verified with `npm run test` (41 tests passing), `npm run build`, and Playwright-driven manual browser testing of every new interactive path.
- Phase 5: added `src/lib/templateVariables.js` (`extractTemplateVariables`/`applyTemplateVariables`) supporting `{variableName}` placeholders in card content/example text.
- Phase 5: added `templateCopyCount`/`lastTemplateCopiedAt` card fields and `updateCardTemplateCopyStats` action, tracked separately from the existing example-copy stats.
- Phase 5: added `useTemplateFill` hook and `TemplateFillModal` component; `CardPanel` shows a wand icon only when a card has detected template variables, opening a filler with per-variable inputs, a live generated-output preview, and a copy button. The saved card template is never mutated by filling it.
- Phase 5: updated README and memory bank to document the template-filling workflow.
- Phase 5: verified with `npm run test` and `npm run build`.

## Known Follow-Ups

- Upgrade from `localStorage` to IndexedDB when storage needs exceed the MVP adapter.
- Test coverage is currently limited to the pure `src/lib/` layer; consider component/hook tests (e.g. React Testing Library) if UI logic grows more complex.
- Consider TypeScript if the guide model becomes more complex.
- Template detection uses a simple identifier regex (`{name}`) and can't distinguish an intentional placeholder from a coincidental single-word brace pair in pasted code; acceptable for now, revisit if it causes false positives.
- No phase beyond Phase 5 is currently scoped.
