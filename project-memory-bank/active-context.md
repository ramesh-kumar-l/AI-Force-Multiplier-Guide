# Active Context

## Current State

The repository is now a Vite React app with:

- A React component in `AI-Lexicon.jsx`.
- Starter guide content extracted to `src/data/starterGuideData.js`.
- Schema-versioned local persistence in `src/lib/lexiconStorage.js`.
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
