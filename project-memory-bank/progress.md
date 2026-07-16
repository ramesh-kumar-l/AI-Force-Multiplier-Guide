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
- Phase 6: added `vite-plugin-pwa` to generate a web app manifest and a Workbox service worker at build time, making the production app installable (desktop/Android/iOS) with the full app shell precached for offline loading.
- Phase 6: generated PWA icon assets (`public/icons/icon-192.png`, `icon-512.png`, `maskable-icon-512.png`, `apple-touch-icon.png`, `favicon-32.png`) via a small hand-rolled Node PNG encoder script (no new runtime or dev dependency), styled to match the app's existing cyan-to-purple Zap branding.
- Phase 6: added `useOnlineStatus` (offline-status banner) and `usePwaUpdate` (new-version "Refresh" banner) hooks, wired into `AI-Lexicon.jsx` using the existing `InlineBanner` component — no new UI components were needed.
- Phase 6: added `theme-color`, `apple-touch-icon`, and favicon `<link>`/`<meta>` tags to `index.html`; the manifest `<link>` itself is injected automatically by the plugin at build time.
- Phase 6: updated README (new "Install & Offline" section, features list, repo structure, troubleshooting) and `DEPENDENCIES.md`.
- Phase 6: verified with `npm run test` (48/48, unchanged — no `src/lib/` logic touched), `npm run build` (confirmed `PWA v1.3.0`/`generateSW`/`dist/sw.js` in the build log), and a Playwright script against `npm run preview` covering manifest correctness, service-worker activation, Workbox precache population, and — critically — that the app shell still loads with the browser context fully offline. All 12 checks passed, zero console errors.
- Phase 7: added `@testing-library/react` + `@testing-library/jest-dom` and two new test files — `src/hooks/useLexiconData.test.js` (5 tests: autosave, corrupted-storage recovery, quota-exceeded save error, import success/failure) and `AI-Lexicon.test.jsx` (4 tests: starter render + stats, search filtering, favorite-toggle persistence across a fresh mount, invalid-import error banner without data loss) — bringing the suite to 57 tests.
- Phase 7: fixed a real Vitest/Vite-8 configuration bug found while writing the first component test — JSX in test files (and, transitively, the whole app under test) was compiling to classic `React.createElement()` calls without importing `React`, because Vitest's SSR/vite-node pipeline doesn't go through Vite 8's `oxc` production transformer or `@vitejs/plugin-react`'s babel step the same way the production build does. Fixed via `esbuild: { jsx: 'automatic' }` in `vite.config.js`.
- Phase 7: added a reusable `src/hooks/useDialogA11y.js` (focus trap, Escape-to-close, initial focus via optional ref, focus restoration to the trigger element) and wired it into all four dialogs/drawers (`EditModal`, `ConfirmDialog`, `ArchiveDrawer`, `TemplateFillModal`), each now exposing `role="dialog"`/`role="alertdialog"` + `aria-modal` + `aria-labelledby`.
- Phase 7: fixed a real focus-management bug found during manual Playwright verification — capturing the "trigger element to restore focus to" inside `useDialogA11y`'s own `useEffect` was too late, because native `autoFocus` on the dialog's own input had already moved `document.activeElement` into the dialog by the time that effect ran. Fixed by capturing it synchronously during render (guarded by an open/closed transition ref) and by replacing `autoFocus` on `EditModal`'s title input and `TemplateFillModal`'s first variable input with an explicit `initialFocusRef` passed into the hook.
- Phase 7: added `aria-label`s to every icon-only button (`CardPanel`, `SectionPanel`, `ArchiveEntryRow`), `aria-expanded`/`aria-pressed` on toggle controls, `role="alert"`/`role="status"` + `aria-live` on `InlineBanner`, `aria-live` copy-feedback text, and a "Skip to content" link + `id="main-content"` landmark.
- Phase 7: added `PRIVACY.md` (storage/trust-boundary documentation) and `docs/screenshots/` (desktop overview, expanded card, mobile viewport) embedded in a new README "Demo" section; also added README "Testing," "Accessibility," and "Privacy & Data Storage" sections, and updated `DEPENDENCIES.md` for the new test-library dev dependencies.
- Phase 7: verified with `npx vitest run` (57/57 passing), `npm run build` (passed; PWA output unchanged), and a Playwright accessibility script against `npm run preview` — 12/12 checks passed (skip link, dialog roles/aria-modal, initial focus, Escape-to-close, focus restoration, alertdialog role, status-banner role, aria-pressed toggling), zero console errors.
- Post-Phase 7: generated a leverage artifact set under `documents/` (not code) — engineering thesis, architecture doc, ADR collection (10 ADRs), OSS positioning doc, benchmark/quality report, Staff Engineer case study, 5-post blog series outline, demo/examples pack, talk deck outline, and a candidate (non-committed) future roadmap — plus an index (`documents/00-index.md`) with Pareto scoring, a reusable-asset catalog, and career/startup leverage analysis. Inputs used: career goal = Staff Engineer, objective = Mixed, stage = Beta (user-confirmed via clarifying questions). No new phase was scoped as part of this — it's a documentation/distribution deliverable layered on top of the completed Phase 7 state.

## Known Follow-Ups

- Upgrade from `localStorage` to IndexedDB when storage needs exceed the MVP adapter.
- Test coverage now includes `useLexiconData` and one critical-path UI test, but most individual components (`CardPanel`, `SectionPanel`, `EditModal`, `FilterBar`, `ArchiveDrawer`, `TemplateFillModal`, etc.) still have no dedicated automated tests — a deliberate scope choice, not an oversight; expand if UI logic grows more complex.
- Consider TypeScript if the guide model becomes more complex.
- Template detection uses a simple identifier regex (`{name}`) and can't distinguish an intentional placeholder from a coincidental single-word brace pair in pasted code; acceptable for now, revisit if it causes false positives.
- PWA install prompts and offline app-shell loading only work from a production build/deployment, not `npm run dev` — this is by design (see Known Limitations in `implementation-status.md`), but worth remembering when someone reports "install icon isn't showing" while running the dev server.
- No `LICENSE` file exists yet — recommended before any public/OSS distribution; a user/business decision, not made unilaterally this phase.
- `npm run build` prints a benign "Both esbuild and oxc options were set" warning (see Known Limitations in `implementation-status.md` for why); cosmetic only.
- No phase beyond Phase 7 is currently scoped.
