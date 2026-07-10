import { Archive, ChevronDown, Copy, Pencil, Plus, Trash2 } from 'lucide-react';

export default function SectionPanel({
  section,
  Icon,
  expanded,
  visibleCardCount,
  onToggle,
  onAddCard,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  children
}) {
  return (
    <div className="space-y-3">
      <div className={`rounded-lg bg-gradient-to-r ${section.color} p-0.5`}>
        <div className="rounded-md bg-slate-800 p-4 transition-colors hover:bg-slate-700/50">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <button type="button" onClick={onToggle} className="flex min-w-0 flex-1 items-center gap-3 text-left">
              <Icon className="h-6 w-6 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{section.title}</h2>
                  <span className="rounded border border-slate-600 px-2 py-0.5 text-xs text-slate-300">
                    {visibleCardCount} cards
                  </span>
                </div>
                {section.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-400">{section.description}</p>
                )}
              </div>
              <ChevronDown className={`ml-auto h-5 w-5 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              <button type="button" onClick={onAddCard} className="inline-flex items-center gap-2 rounded-md bg-slate-950/70 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-950" title="Add card">
                <Plus className="h-4 w-4" />
                Card
              </button>
              <button type="button" onClick={onEdit} className="rounded-md bg-slate-950/70 p-2 text-slate-300 transition hover:bg-slate-950 hover:text-slate-100" title="Edit section">
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={onDuplicate} className="rounded-md bg-slate-950/70 p-2 text-slate-300 transition hover:bg-slate-950 hover:text-slate-100" title="Duplicate section">
                <Copy className="h-4 w-4" />
              </button>
              <button type="button" onClick={onArchive} className="rounded-md bg-slate-950/70 p-2 text-slate-300 transition hover:bg-slate-950 hover:text-amber-200" title="Archive section">
                <Archive className="h-4 w-4" />
              </button>
              <button type="button" onClick={onDelete} className="rounded-md bg-slate-950/70 p-2 text-slate-300 transition hover:bg-slate-950 hover:text-red-300" title="Delete section">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && <div className="ml-0 space-y-2 md:ml-4">{children}</div>}
    </div>
  );
}
