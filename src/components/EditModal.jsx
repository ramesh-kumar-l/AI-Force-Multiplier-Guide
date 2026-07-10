import { Save, X } from 'lucide-react';
import { colorOptions, iconOptions } from '../constants/lexiconOptions';

const fieldClass =
  'w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400';

function TextArea({ label, value, onChange, rows = 5, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`${fieldClass} resize-y`}
      />
    </label>
  );
}

export default function EditModal({ editor, onDraftChange, onClose, onSave }) {
  if (!editor) return null;

  const isSection = editor.type === 'section';
  const title = `${editor.mode === 'create' ? 'Create' : 'Edit'} ${isSection ? 'Section' : 'Card'}`;
  const isValid = editor.draft.title.trim().length > 0;

  const update = (key, value) => onDraftChange({ ...editor.draft, [key]: value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) onSave();
        }}
        className="max-h-full w-full max-w-3xl overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[72vh] space-y-4 overflow-y-auto p-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Title
            </span>
            <input
              value={editor.draft.title}
              onChange={(event) => update('title', event.target.value)}
              placeholder={isSection ? 'Prompt Engineering' : 'Reusable debugging prompt'}
              className={fieldClass}
              autoFocus
            />
          </label>

          {isSection ? (
            <>
              <TextArea
                label="Description"
                value={editor.draft.description}
                onChange={(value) => update('description', value)}
                rows={3}
                placeholder="What belongs in this section?"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Icon
                  </span>
                  <select
                    value={editor.draft.iconKey}
                    onChange={(event) => update('iconKey', event.target.value)}
                    className={fieldClass}
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Accent
                  </span>
                  <select
                    value={editor.draft.color}
                    onChange={(event) => update('color', event.target.value)}
                    className={fieldClass}
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          ) : (
            <>
              <TextArea
                label="Content"
                value={editor.draft.content}
                onChange={(value) => update('content', value)}
                placeholder="Explain the pattern, checklist, or workflow."
              />
              <TextArea
                label="Example"
                value={editor.draft.exampleCode}
                onChange={(value) => update('exampleCode', value)}
                placeholder="Paste the prompt, code, or command users can copy."
              />
              <TextArea
                label="Private Notes"
                value={editor.draft.notes}
                onChange={(value) => update('notes', value)}
                rows={3}
                placeholder="Optional local notes. These stay in browser storage."
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tags
                </span>
                <input
                  value={editor.draft.tagsText}
                  onChange={(event) => update('tagsText', event.target.value)}
                  placeholder="debugging, tests, architecture"
                  className={fieldClass}
                />
              </label>
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 p-4">
          <p className="text-xs text-slate-500">
            Autosaves locally after you press save. Works offline.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
