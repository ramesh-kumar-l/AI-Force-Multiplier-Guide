import { RotateCcw, Trash2 } from 'lucide-react';

export default function ArchiveEntryRow({ title, subtitle, onRestore, onDeleteForever }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-100">{title}</p>
        {subtitle && <p className="truncate text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="flex flex-shrink-0 gap-1">
        <button
          type="button"
          onClick={onRestore}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
          title="Restore"
          aria-label={`Restore ${title}`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restore
        </button>
        <button
          type="button"
          onClick={onDeleteForever}
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-red-300"
          title="Delete forever"
          aria-label={`Delete ${title} forever`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
