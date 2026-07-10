export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/50 py-12 text-center">
      {title && <p className="font-semibold text-slate-200">{title}</p>}
      {message && <p className="mt-1 text-sm text-slate-400">{message}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
