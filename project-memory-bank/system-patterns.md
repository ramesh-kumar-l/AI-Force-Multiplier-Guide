# System Patterns

## Application Shape

The app is intentionally simple: one reusable React component mounted by a Vite entrypoint.

## Content Model

Guide content is stored in the `guideSections` array in `AI-Lexicon.jsx`.

Each section includes:

- `id`
- `title`
- `icon`
- `color`
- `subsections`

Each subsection includes:

- `id`
- `title`
- `content`
- optional `code`

## UI Behavior

- `expandedSections` controls open top-level categories.
- `expandedItems` controls open prompt cards.
- `searchQuery` filters subsections across title, content, and code.
- `copyToClipboard` copies prompt examples and briefly shows copied feedback.

## Styling Pattern

Tailwind utility classes live directly in JSX. Global CSS is intentionally minimal and limited to Tailwind import plus base page styles.
