import { X } from 'lucide-react';
import ArchiveEntryRow from './ArchiveEntryRow';
import EmptyState from './EmptyState';

export default function ArchiveDrawer({
  open,
  onClose,
  archivedSections,
  archivedCards,
  onRestoreSection,
  onDeleteSectionForever,
  onRestoreCard,
  onDeleteCardForever
}) {
  if (!open) return null;

  const isEmpty = archivedSections.length === 0 && archivedCards.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80">
      <div className="flex h-full w-full max-w-lg flex-col overflow-hidden border-l border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <h2 className="text-lg font-semibold text-slate-100">Archived Items</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close archive drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          {isEmpty && (
            <EmptyState title="Nothing archived" message="Archived sections and cards will show up here." />
          )}

          {archivedSections.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Archived Sections
              </h3>
              <div className="space-y-2">
                {archivedSections.map((section) => (
                  <ArchiveEntryRow
                    key={section.id}
                    title={section.title}
                    subtitle={`${section.cards.length} cards`}
                    onRestore={() => onRestoreSection(section.id)}
                    onDeleteForever={() => onDeleteSectionForever(section.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {archivedCards.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Archived Cards
              </h3>
              <div className="space-y-2">
                {archivedCards.map(({ section, card }) => (
                  <ArchiveEntryRow
                    key={card.id}
                    title={card.title}
                    subtitle={`From: ${section.title}`}
                    onRestore={() => onRestoreCard(card.id)}
                    onDeleteForever={() => onDeleteCardForever(card.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
