# Dependencies

AI Lexicon is primarily a Vite React frontend. Python is present only as lightweight project metadata and an optional placeholder script.

## System Dependencies

- Node.js `>=20.19.0`: required by modern Vite releases.
- npm: installed with Node.js and used for dependency installation and scripts.
- Python `>=3.12`: optional for the placeholder `main.py`; not required to run the web app.

Check versions:

```bash
node --version
npm --version
python --version
```

## Frontend Runtime Dependencies

- `react`: renders the UI component model.
- `react-dom`: mounts the React app into `index.html`.
- `lucide-react`: provides the icon components used throughout the guide.

## Development And Build Dependencies

- `vite`: local dev server and production build tool.
- `@vitejs/plugin-react`: React support for Vite.
- `tailwindcss`: utility-first CSS framework used by the JSX class names.
- `@tailwindcss/vite`: Tailwind CSS integration for Vite.

## Python Dependencies

`requirements.txt` intentionally contains no installable packages because there is no Python application code that needs third-party libraries.

## Install Or Refresh Dependencies

```bash
npm install
```

To update JavaScript dependencies later:

```bash
npm update
```

After dependency changes, run:

```bash
npm run build
```

This confirms that the production bundle still compiles.
