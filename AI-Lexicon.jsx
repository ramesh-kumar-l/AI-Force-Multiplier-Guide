import { useState } from 'react';
import { Brain, Code, Lightbulb, Rocket, Settings, Zap } from 'lucide-react';
import ArchiveDrawer from './src/components/ArchiveDrawer';
import CardPanel from './src/components/CardPanel';
import ConfirmDialog from './src/components/ConfirmDialog';
import EditModal from './src/components/EditModal';
import EmptyState from './src/components/EmptyState';
import FilterBar from './src/components/FilterBar';
import InlineBanner from './src/components/InlineBanner';
import LexiconHeader from './src/components/LexiconHeader';
import SectionPanel from './src/components/SectionPanel';
import TemplateFillModal from './src/components/TemplateFillModal';
import useArchiveView from './src/hooks/useArchiveView';
import useConfirmDialog from './src/hooks/useConfirmDialog';
import useEditorState from './src/hooks/useEditorState';
import useLexiconActions from './src/hooks/useLexiconActions';
import useLexiconData from './src/hooks/useLexiconData';
import useLexiconFilters from './src/hooks/useLexiconFilters';
import useOnlineStatus from './src/hooks/useOnlineStatus';
import usePwaUpdate from './src/hooks/usePwaUpdate';
import useTemplateFill from './src/hooks/useTemplateFill';

const iconRegistry = {
  brain: Brain,
  code: Code,
  zap: Zap,
  rocket: Rocket,
  lightbulb: Lightbulb,
  settings: Settings
};

export default function AILexicon() {
  const {
    lexiconData,
    setLexiconData,
    saveError,
    dismissSaveError,
    recoveredNotice,
    dismissRecoveredNotice,
    importError,
    dismissImportError,
    resetToStarter,
    exportBackup,
    importBackup
  } = useLexiconData();

  const actions = useLexiconActions(setLexiconData);
  const { confirmState, askToConfirm, confirmAction, cancel } = useConfirmDialog();
  const editorState = useEditorState(actions);
  const filters = useLexiconFilters(lexiconData.sections);
  const archiveView = useArchiveView(lexiconData.sections);
  const templateFill = useTemplateFill(actions);
  const isOnline = useOnlineStatus();
  const { needRefresh, offlineReady, applyUpdate, dismissOfflineReady } = usePwaUpdate();

  const [expandedSections, setExpandedSections] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [updateDismissed, setUpdateDismissed] = useState(false);

  const toggleSection = (id) => setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleItem = (id) => setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (text, id) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    actions.recordCardCopy(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmArchiveSection = (section) =>
    askToConfirm(
      'Archive section?',
      `"${section.title}" and its cards will be hidden from the main lexicon. Restore it anytime from the Archived drawer.`,
      'Archive',
      () => actions.archiveSection(section.id)
    );

  const confirmDeleteSection = (section) =>
    askToConfirm(
      'Delete section forever?',
      `"${section.title}" and all cards inside it will be removed from local storage. This cannot be undone.`,
      'Delete',
      () => actions.deleteSectionForever(section.id)
    );

  const confirmArchiveCard = (card) =>
    askToConfirm(
      'Archive card?',
      `"${card.title}" will be hidden from the main lexicon. Restore it anytime from the Archived drawer.`,
      'Archive',
      () => actions.archiveCard(card.id)
    );

  const confirmDeleteCard = (card) =>
    askToConfirm(
      'Delete card forever?',
      `"${card.title}" will be removed from local storage. This cannot be undone.`,
      'Delete',
      () => actions.deleteCardForever(card.id)
    );

  const confirmDeleteArchivedSection = (sectionId) =>
    askToConfirm(
      'Delete section forever?',
      'This archived section and all cards inside it will be removed from local storage. This cannot be undone.',
      'Delete',
      () => actions.deleteSectionForever(sectionId)
    );

  const confirmDeleteArchivedCard = (cardId) =>
    askToConfirm(
      'Delete card forever?',
      'This archived card will be removed from local storage. This cannot be undone.',
      'Delete',
      () => actions.deleteCardForever(cardId)
    );

  const confirmResetStarterContent = () =>
    askToConfirm(
      'Reset starter content?',
      'This replaces your current local lexicon with the original starter guide. Export a backup first if you want to keep your changes.',
      'Reset',
      () => {
        resetToStarter();
        setExpandedSections({});
        setExpandedItems({});
      }
    );

  const emptyStateMessage = filters.hasActiveFilters
    ? 'Try a different search term, or clear your tag/favorite filters.'
    : 'Add a section to get started.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Geist_Mono'] text-slate-100">
      <LexiconHeader
        searchQuery={filters.searchQuery}
        onSearchChange={filters.setSearchQuery}
        onAddSection={editorState.openCreateSection}
        onReset={confirmResetStarterContent}
        onExport={exportBackup}
        onImportFile={importBackup}
        stats={filters.stats}
      />

      <FilterBar
        availableTags={filters.availableTags}
        selectedTags={filters.selectedTags}
        onToggleTag={filters.toggleTag}
        tagMode={filters.tagMode}
        onTagModeChange={filters.setTagMode}
        favoritesOnly={filters.favoritesOnly}
        onFavoritesOnlyChange={filters.setFavoritesOnly}
        hasActiveFilters={filters.hasActiveFilters}
        onClearFilters={filters.clearFilters}
        archivedCount={archiveView.archivedSections.length + archiveView.archivedCards.length}
        onOpenArchive={archiveView.openDrawer}
      />

      <main className="mx-auto max-w-7xl p-6 pt-0">
        {recoveredNotice && (
          <InlineBanner
            tone="info"
            message="Your saved lexicon couldn't be read, so it was reset to the starter guide. Anything from before this point may be lost."
            onDismiss={dismissRecoveredNotice}
          />
        )}
        {saveError && <InlineBanner tone="error" message={saveError} actionLabel="Export now" onAction={exportBackup} onDismiss={dismissSaveError} />}
        {importError && <InlineBanner tone="error" message={importError} onDismiss={dismissImportError} />}
        {!isOnline && (
          <InlineBanner tone="info" message="You're offline. AI Lexicon keeps working fully offline — edits still save to this browser." />
        )}
        {needRefresh && !updateDismissed && (
          <InlineBanner
            tone="info"
            message="A new version of AI Lexicon is ready."
            actionLabel="Refresh"
            onAction={applyUpdate}
            onDismiss={() => setUpdateDismissed(true)}
          />
        )}
        {offlineReady && (
          <InlineBanner
            tone="success"
            message="AI Lexicon is installed and ready to work offline."
            onDismiss={dismissOfflineReady}
          />
        )}

        <div className="space-y-4">
          {filters.visibleSections.length === 0 ? (
            <EmptyState title="No results found" message={emptyStateMessage} />
          ) : (
            filters.visibleSections.map((section) => {
              const Icon = iconRegistry[section.iconKey] || Brain;

              return (
                <SectionPanel
                  key={section.id}
                  section={section}
                  Icon={Icon}
                  expanded={expandedSections[section.id]}
                  visibleCardCount={section.cards.length}
                  onToggle={() => toggleSection(section.id)}
                  onAddCard={() => editorState.openCreateCard(section.id)}
                  onEdit={() => editorState.openEditSection(section)}
                  onDuplicate={() => actions.duplicateSection(section.id)}
                  onArchive={() => confirmArchiveSection(section)}
                  onDelete={() => confirmDeleteSection(section)}
                >
                  {section.cards.length === 0 ? (
                    <EmptyState message="No cards yet. Add one to capture a reusable prompt or workflow." />
                  ) : (
                    section.cards.map((card) => (
                      <CardPanel
                        key={card.id}
                        card={card}
                        expanded={expandedItems[card.id]}
                        copied={copiedId === card.id}
                        onToggle={() => toggleItem(card.id)}
                        onCopy={() => copyToClipboard(card.exampleCode, card.id)}
                        onEdit={() => editorState.openEditCard(card)}
                        onDuplicate={() => actions.duplicateCard(card.id)}
                        onArchive={() => confirmArchiveCard(card)}
                        onDelete={() => confirmDeleteCard(card)}
                        onToggleFavorite={() => actions.toggleCardFavorite(card.id, card.favorite)}
                        onFillTemplate={() => templateFill.openTemplate(card)}
                      />
                    ))
                  )}
                </SectionPanel>
              );
            })
          )}
        </div>

        <footer className="mt-16 rounded-lg border border-slate-700 bg-slate-800/30 p-6 text-center">
          <p className="mb-3 text-sm text-slate-400">
            <strong>Offline first:</strong> Your edits are saved in this browser with local storage.
          </p>
          <p className="text-xs text-slate-500">
            Phase 6: installable as an app with offline caching, on top of Phase 5's fillable prompt
            templates and Phase 3's favorites, tag filters, archive management, and JSON backup export/import.
          </p>
        </footer>
      </main>

      <EditModal
        editor={editorState.editor}
        onDraftChange={editorState.updateDraft}
        onClose={editorState.closeEditor}
        onSave={editorState.saveEditor}
      />
      <ConfirmDialog confirmState={confirmState} onCancel={cancel} onConfirm={confirmAction} />
      <TemplateFillModal
        session={templateFill.session}
        generated={templateFill.generated}
        copied={templateFill.copied}
        onChangeValue={templateFill.updateValue}
        onClose={templateFill.closeTemplate}
        onCopy={templateFill.copyGenerated}
      />
      <ArchiveDrawer
        open={archiveView.open}
        onClose={archiveView.closeDrawer}
        archivedSections={archiveView.archivedSections}
        archivedCards={archiveView.archivedCards}
        onRestoreSection={actions.restoreSection}
        onDeleteSectionForever={confirmDeleteArchivedSection}
        onRestoreCard={actions.restoreCard}
        onDeleteCardForever={confirmDeleteArchivedCard}
      />
    </div>
  );
}
