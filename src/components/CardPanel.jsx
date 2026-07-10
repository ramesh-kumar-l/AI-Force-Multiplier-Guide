import { Archive, ChevronDown, Copy, Pencil, Star, Trash2 } from 'lucide-react';
import ContentRenderer from './ContentRenderer';

export default function CardPanel({
  card,
  expanded,
  copied,
  onToggle,
  onCopy,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  onToggleFavorite
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 transition-colors hover:border-slate-600">
      <div className="flex items-center gap-2 p-3 transition-colors hover:bg-slate-700/30">
        <button type="button" onClick={onToggle} className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-100">{card.title}</h3>
            {card.tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {card.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded border border-slate-700 px-1.5 py-0.5 text-[11px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded p-2 transition hover:bg-slate-700 ${card.favorite ? 'text-amber-400' : 'text-slate-400 hover:text-amber-200'}`}
          title={card.favorite ? 'Unfavorite card' : 'Favorite card'}
        >
          <Star className={`h-4 w-4 ${card.favorite ? 'fill-amber-400' : ''}`} />
        </button>
        <button type="button" onClick={onEdit} className="rounded p-2 text-slate-400 transition hover:bg-slate-700 hover:text-slate-100" title="Edit card">
          <Pencil className="h-4 w-4" />
        </button>
        <button type="button" onClick={onDuplicate} className="rounded p-2 text-slate-400 transition hover:bg-slate-700 hover:text-slate-100" title="Duplicate card">
          <Copy className="h-4 w-4" />
        </button>
        <button type="button" onClick={onArchive} className="rounded p-2 text-slate-400 transition hover:bg-slate-700 hover:text-amber-200" title="Archive card">
          <Archive className="h-4 w-4" />
        </button>
        <button type="button" onClick={onDelete} className="rounded p-2 text-slate-400 transition hover:bg-slate-700 hover:text-red-300" title="Delete card">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 border-t border-slate-700 bg-slate-900/30 p-4">
          <ContentRenderer content={card.content} />
          {card.notes && (
            <div className="rounded-md border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-300">
              <span className="font-semibold text-slate-100">Notes: </span>
              {card.notes}
            </div>
          )}
          {card.exampleCode && (
            <div className="rounded-lg border border-slate-700 bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
                <span className="font-mono text-xs text-slate-400">Example</span>
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-2 rounded bg-slate-800 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-700"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
                {card.exampleCode}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
