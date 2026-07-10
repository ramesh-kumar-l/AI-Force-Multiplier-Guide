import { Archive, Star, X } from 'lucide-react';

export default function FilterBar({
  availableTags,
  selectedTags,
  onToggleTag,
  tagMode,
  onTagModeChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  hasActiveFilters,
  onClearFilters,
  archivedCount,
  onOpenArchive
}) {
  return (
    <div className="mx-auto mb-4 max-w-7xl px-6">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 p-3">
        <button
          type="button"
          onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
            favoritesOnly
              ? 'border-amber-400 bg-amber-400/10 text-amber-300'
              : 'border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${favoritesOnly ? 'fill-amber-400' : ''}`} />
          Favorites
        </button>

        {availableTags.length > 0 && (
          <>
            <div className="mx-1 h-5 w-px bg-slate-700" />
            <div className="flex flex-wrap items-center gap-1.5">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`rounded border px-2 py-1 text-[11px] transition ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {selectedTags.length > 1 && (
              <button
                type="button"
                onClick={() => onTagModeChange(tagMode === 'any' ? 'all' : 'any')}
                className="rounded border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-400 transition hover:bg-slate-800"
                title="Toggle between matching any or all selected tags"
              >
                Match: {tagMode === 'any' ? 'Any' : 'All'}
              </button>
            )}
          </>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}

        <button
          type="button"
          onClick={onOpenArchive}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-800"
        >
          <Archive className="h-3.5 w-3.5" />
          Archived ({archivedCount})
        </button>
      </div>
    </div>
  );
}
