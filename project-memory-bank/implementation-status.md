# Implementation Status

## Current Phase

Phase 5 is complete. (No separate "Phase 4" was scoped or requested — the user asked to go straight from Phase 3 to Phase 5.)

## Implemented So Far

- Vite React app named AI Lexicon.
- Tailwind CSS styling and Lucide React icons.
- Starter guide data in `src/data/starterGuideData.js` and `src/data/starterSections/`.
- Offline browser persistence through `src/lib/lexiconStorage.js`, hardened for production use (see below).
- Data mutation actions split across `src/lib/actions/` (`sectionActions.js`, `cardActions.js`, `draftHelpers.js`, `shared.js`), re-exported through the `src/lib/lexiconActions.js` barrel.
- Search/tag/favorite/archive filtering logic in `src/lib/lexiconFilters.js`.
- Stateful logic extracted into `src/hooks/` (`useLexiconData`, `useLexiconActions`, `useConfirmDialog`, `useEditorState`, `useLexiconFilters`, `useArchiveView`); `AI-Lexicon.jsx` is now a composition root only.
- Modular UI components under `src/components/`, including new Phase 3 components (`FilterBar`, `BackupControls`, `InlineBanner`, `ArchiveDrawer`, `ArchiveEntryRow`, `EmptyState`).
- Editable sections: create, edit, duplicate, archive, delete.
- Editable cards: create, edit, duplicate, archive, delete, tags, private notes.
- **Favorites**: one-click star toggle on each card, persisted, with a favorites-only filter.
- **Tag filters**: multi-select tag chips with an any/all (OR/AND) match-mode toggle.
- **Archive management**: an "Archived" drawer listing archived sections and cards, each with Restore and Delete Forever actions. Restoring a section does not cascade-restore its individually archived cards.
- **Backup export/import**: Export downloads a JSON backup file; Import reads a JSON file via a file picker. Malformed JSON and wrong-shaped JSON both show a clear inline error banner and leave existing data untouched (previously, wrong-shaped JSON silently wiped the lexicon back to starter content — this was a real bug found and fixed this phase).
- **Persistence robustness**: `saveLexiconData` no longer throws on quota-exceeded; it returns `{ success, error }` and the UI shows a dismissible error banner (with an "Export now" quick action). `loadLexiconData` now persists its starter-data recovery immediately when corrupted storage is detected, instead of leaving the corrupted string in place.
- Search across section/card content, examples, notes, and tags (parity-tested against the pre-Phase-3 behavior).
- Reset to starter content with confirmation.
- Copy examples and track copy metadata.
- **Prompt templates (Phase 5)**: any `{variableName}` placeholder in a card's Content or Example text is detected automatically; a wand-icon button on the card opens `TemplateFillModal` with one input per variable, a live substituted-output preview, and a "Copy generated prompt" action. The saved card template is never modified by filling it — generated copies are tracked separately via new `templateCopyCount`/`lastTemplateCopiedAt` fields, independent of the existing example-copy stats.
- Automated test suite via Vitest (`npm run test`): covers `src/lib/actions/*`, `src/lib/lexiconStorage.js`, `src/lib/lexiconFilters.js`, and (Phase 5) `src/lib/templateVariables.js`.

## Verification

- Phase 3: `npm run test` — 41/41 tests passing; `npm run build` — passed; manual browser verification (Playwright-driven, ad hoc script, not committed to the repo) covering favorite/tag/archive/backup flows — all passed with zero console errors. Found and fixed a real stacking-order bug (`ConfirmDialog` vs `ArchiveDrawer` both at `z-50`); `ConfirmDialog` now renders at `z-[60]`.
- Phase 5 (2026-07-11): `npx vitest run` — 48/48 tests passing (7 new: 6 in `templateVariables.test.js`, 1 added to `cardActions.test.js` for `updateCardTemplateCopyStats`). `npm run build` — passed. Manual browser verification (Playwright-driven, ad hoc script, not committed to the repo) covering: wand icon only appears when a card has `{variable}` placeholders, the fill modal opens with one input per variable, the live preview substitutes filled values, "Copy generated prompt" copies the substituted text to the clipboard (not the raw template) and shows "Copied!" feedback, and reopening the card editor afterward confirms the saved template still contains the original `{placeholders}` unmodified — all 8 checks passed with zero console errors.
- Line counts (largest first, all under the 300-line ceiling): `AI-Lexicon.jsx` 254, `EditModal.jsx` 173, `lexiconStorage.js` 137, `cardActions.js` 146, `CardPanel.jsx` 105, `TemplateFillModal.jsx` 82, `useTemplateFill.js` 41.

## Known Limitations

- Persistence is still `localStorage`; IndexedDB may be needed for much larger libraries (unchanged from Phase 2 — deferred).
- Test coverage is at the pure-lib layer (actions/storage/filters/templateVariables) only; hooks and components have no automated tests (React Testing Library was intentionally out of scope). `TemplateFillModal`/`useTemplateFill` were verified manually via Playwright rather than an automated component test.
- No TypeScript (unchanged decision).
- Template variable detection is a narrow identifier-only regex (`{name}`); it won't catch multi-word or punctuated placeholders, by design, to avoid false positives on code braces.

## Next Phase Candidate

No further phase has been scoped yet. Possible future directions: IndexedDB migration for larger libraries, saved/named filter views, component-level test coverage, persisting last-used template variable values per card.
