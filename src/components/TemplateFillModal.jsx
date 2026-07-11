import { Copy, Wand2, X } from 'lucide-react';

const fieldClass =
  'w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400';

export default function TemplateFillModal({ session, generated, copied, onChangeValue, onClose, onCopy }) {
  if (!session) return null;

  const { card, variables, values } = session;
  const outputLabel = generated.exampleCode ? 'Example' : 'Content';
  const output = generated.exampleCode || generated.content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6">
      <div className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Wand2 className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-slate-100">Fill Template &mdash; {card.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close template filler"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[72vh] space-y-4 overflow-y-auto p-4">
          <div className="grid gap-3 md:grid-cols-2">
            {variables.map((name) => (
              <label key={name} className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {name}
                </span>
                <input
                  value={values[name]}
                  onChange={(event) => onChangeValue(name, event.target.value)}
                  placeholder={`Value for {${name}}`}
                  className={fieldClass}
                  autoFocus={variables[0] === name}
                />
              </label>
            ))}
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
              <span className="font-mono text-xs text-slate-400">{outputLabel} preview</span>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-2 rounded bg-slate-800 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-700"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy generated prompt'}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-slate-300">
              {output}
            </pre>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 p-4">
          <p className="text-xs text-slate-500">
            The saved card template is never changed &mdash; this only fills a copy for you to use.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
