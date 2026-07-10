# Active Context

## Current State

The repository is now a Vite React app with:

- A React app orchestrator in `AI-Lexicon.jsx`.
- Focused UI modules under `src/components/`.
- Starter guide content aggregated by `src/data/starterGuideData.js` and split into topic modules in `src/data/starterSections/`.
- Schema-versioned local persistence in `src/lib/lexiconStorage.js`.
- Pure data mutation helpers in `src/lib/lexiconActions.js`.
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

## Current User Instruction

- Phase 2 is implemented.
- Do not continue to Phase 3 until the user approves.
- Before major feature completion, update `implementation-status.md` and `active-context.md`.
