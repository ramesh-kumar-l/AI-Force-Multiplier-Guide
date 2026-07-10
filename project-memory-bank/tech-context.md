# Tech Context

## Runtime Stack

- React for UI rendering.
- Vite for local development and production builds.
- Tailwind CSS for utility-based styling.
- Lucide React for icons.
- Browser `localStorage` for Phase 1 offline persistence through a storage adapter.

## Project Tooling

- `npm install` installs JavaScript dependencies.
- `npm run dev` starts the Vite dev server.
- `npm run build` creates a production bundle in `dist/`.
- `npm run preview` serves the production bundle locally.

## Python Context

Python 3.12 is present through `.python-version`, `pyproject.toml`, and `main.py`, but there are no Python runtime dependencies. The Python file is a placeholder and is not required to run the frontend.

## Important Constraints

- Keep the frontend JavaScript-based unless a future decision explicitly converts it to TypeScript.
- Keep the app static; do not introduce a backend unless a feature requires persistence or server-side integration.
- Treat `AI-Lexicon.jsx` as the main UI file, `src/data/starterGuideData.js` as starter content, and `src/lib/lexiconStorage.js` as the persistence boundary.
