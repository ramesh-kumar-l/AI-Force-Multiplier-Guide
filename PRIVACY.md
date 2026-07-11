# Privacy & Data Storage

AI Lexicon is a fully local, offline-first application. This document explains exactly what data exists, where it lives, and who can see it.

## Short version

- There is no backend, no account, and no telemetry.
- Everything you create or edit stays in your browser's `localStorage`, on your device.
- Nothing is ever sent over the network by this app, except to load its own static files (and, once installed, not even that).

## What is stored

AI Lexicon keeps one JSON object in `localStorage` under the key `ai-lexicon:data:v1`. It contains:

- Your sections and cards (titles, descriptions, content, example code).
- Tags and favorite flags you've set.
- Private notes you've typed onto cards.
- Archive state (archived vs. active) for sections and cards.
- Usage metadata: copy counts and last-copied timestamps for examples and generated templates.
- Timestamps (`createdAt`/`updatedAt`) and a schema/app version number used for internal data migrations.

That is the entire dataset. There are no hidden fields, analytics identifiers, or usage logs beyond the copy-count metadata listed above, which exists purely so you can see how often you use a given card.

## Where it lives, and who can access it

- Storage is `window.localStorage`, scoped by the browser to the origin (protocol + domain + port) serving the app.
- Only code running on that exact origin, in that browser profile, on that device, can read or write this data. A different browser, a different device, a private/incognito window, or a different profile will not see it.
- No server is involved. There is nothing to "reach" the app's data except the browser you're using right now.

## Network activity

- The app itself makes no network requests once loaded — no analytics beacons, no crash reporting, no third-party scripts, no fonts or assets loaded from external CDNs.
- The only network activity is the browser fetching the app's own static files (HTML/JS/CSS/icons) on first load or when a new version is deployed. After installing the PWA (see [README's Install & Offline section](README.md#install--offline)), even that stops being required for normal use — the app shell is served from the local Workbox cache.

## Clipboard access

Copy buttons use the standard browser Clipboard API (`navigator.clipboard.writeText`) to copy prompt/example text you explicitly click "Copy" for. Nothing is read from your clipboard — only written to it, and only in response to your click.

## Backup, export, and import

Because everything lives in one browser's local storage, it is not synced anywhere and can be lost if you clear site data, switch browsers, or switch devices. Use the built-in **Export**/**Import** controls (in the header) to:

- **Export**: download your full lexicon as a plain JSON file to your device. This file contains everything listed under "What is stored" above — treat it like any other local document containing your notes.
- **Import**: load a previously exported JSON file back into the app (in this browser or another one). Malformed or wrong-shaped files are rejected with a clear error message and never overwrite your existing data.

Back up regularly if your lexicon matters to you — there is no automatic cloud backup by design.

## Clearing your data

To permanently delete everything AI Lexicon has stored:

- Use the in-app **Reset** button to restore the starter guide (this replaces your current data — export a backup first if you want to keep it), or
- Clear your browser's site data/storage for the app's origin (browser settings vary; look for "Site settings" or "Clear browsing data" scoped to the specific site), or
- Uninstalling the PWA (if installed) removes the app shortcut but may not clear `localStorage` by itself — clear site data separately if you want the underlying data gone too.

## Third-party services

None. AI Lexicon does not integrate with any third-party analytics, error-tracking, advertising, or backend service. `lucide-react` (icons) and the build tooling (`vite`, `vite-plugin-pwa`, Tailwind CSS) are compile-time dependencies only — none of them phone home at runtime.

## Questions

This document reflects the app as implemented in `src/lib/lexiconStorage.js` (the only code path that touches browser storage) and `src/hooks/useLexiconData.js` (the only code path that touches the network, via the Clipboard/File APIs and the PWA service worker). If you're auditing this app, those two files are the entire trust boundary.
