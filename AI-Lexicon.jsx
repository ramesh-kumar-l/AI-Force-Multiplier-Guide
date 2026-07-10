import { useEffect, useMemo, useState } from 'react';
import { Brain, Code, Lightbulb, Rocket, Settings, Zap } from 'lucide-react';
import CardPanel from './src/components/CardPanel';
import ConfirmDialog from './src/components/ConfirmDialog';
import EditModal from './src/components/EditModal';
import LexiconHeader from './src/components/LexiconHeader';
import SectionPanel from './src/components/SectionPanel';
import {
  addCard,
  addSection,
  createBlankCardDraft,
  createBlankSectionDraft,
  createCardDraft,
  createSectionDraft,
  deleteCard,
  deleteSection,
  duplicateCard,
  duplicateSection,
  setCardArchived,
  setSectionArchived,
  updateCard,
  updateCardCopyStats,
  updateSection
} from './src/lib/lexiconActions';
import { loadLexiconData, resetLexiconData, saveLexiconData } from './src/lib/lexiconStorage';

const iconRegistry = {
  brain: Brain,
  code: Code,
  zap: Zap,
  rocket: Rocket,
  lightbulb: Lightbulb,
  settings: Settings
};

const searchableText = (section, card) =>
  [
    section.title,
    section.description,
    card?.title,
    card?.content,
    card?.exampleCode,
    card?.notes,
    ...(card?.tags || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export default function AILexicon() {
  const [lexiconData, setLexiconData] = useState(() => loadLexiconData());
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [editor, setEditor] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  useEffect(() => {
    saveLexiconData(lexiconData);
  }, [lexiconData]);

  const visibleSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return lexiconData.sections
      .filter((section) => !section.archived)
      .map((section) => {
        const activeCards = section.cards.filter((card) => !card.archived);
        if (!query) return { ...section, cards: activeCards };

        const sectionMatches = searchableText(section).includes(query);
        const cards = sectionMatches
          ? activeCards
          : activeCards.filter((card) => searchableText(section, card).includes(query));

        return { ...section, cards };
      })
      .filter((section) => !query || section.cards.length > 0 || searchableText(section).includes(query));
  }, [lexiconData.sections, searchQuery]);

  const stats = useMemo(() => {
    const activeSections = lexiconData.sections.filter((section) => !section.archived);
    return {
      sections: activeSections.length,
      cards: activeSections.reduce(
        (total, section) => total + section.cards.filter((card) => !card.archived).length,
        0
      )
    };
  }, [lexiconData.sections]);

  const toggleSection = (id) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleItem = (id) =>
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (text, id) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }

    setCopiedId(id);
    setLexiconData((prev) => updateCardCopyStats(prev, id));
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const openCreateSection = () =>
    setEditor({ type: 'section', mode: 'create', draft: createBlankSectionDraft() });

  const openEditSection = (section) =>
    setEditor({
      type: 'section',
      mode: 'edit',
      sectionId: section.id,
      draft: createSectionDraft(section)
    });

  const openCreateCard = (sectionId) =>
    setEditor({ type: 'card', mode: 'create', sectionId, draft: createBlankCardDraft() });

  const openEditCard = (card) =>
    setEditor({ type: 'card', mode: 'edit', cardId: card.id, draft: createCardDraft(card) });

  const saveEditor = () => {
    setLexiconData((prev) => {
      if (editor.type === 'section' && editor.mode === 'create') return addSection(prev, editor.draft);
      if (editor.type === 'section') return updateSection(prev, editor.sectionId, editor.draft);
      if (editor.type === 'card' && editor.mode === 'create') {
        return addCard(prev, editor.sectionId, editor.draft);
      }
      return updateCard(prev, editor.cardId, editor.draft);
    });
    setEditor(null);
  };

  const askToConfirm = (title, message, actionLabel, onConfirm) =>
    setConfirmState({ title, message, actionLabel, onConfirm });

  const confirmAction = () => {
    confirmState.onConfirm();
    setConfirmState(null);
  };

  const archiveSection = (section) =>
    askToConfirm(
      'Archive section?',
      `"${section.title}" and its cards will be hidden from the main lexicon. This keeps storage stable without permanently destroying data.`,
      'Archive',
      () => setLexiconData((prev) => setSectionArchived(prev, section.id, true))
    );

  const removeSection = (section) =>
    askToConfirm(
      'Delete section forever?',
      `"${section.title}" and all cards inside it will be removed from local storage. This cannot be undone except by resetting starter content.`,
      'Delete',
      () => setLexiconData((prev) => deleteSection(prev, section.id))
    );

  const archiveCard = (card) =>
    askToConfirm(
      'Archive card?',
      `"${card.title}" will be hidden from the main lexicon but kept in local storage.`,
      'Archive',
      () => setLexiconData((prev) => setCardArchived(prev, card.id, true))
    );

  const removeCard = (card) =>
    askToConfirm(
      'Delete card forever?',
      `"${card.title}" will be removed from local storage. This cannot be undone.`,
      'Delete',
      () => setLexiconData((prev) => deleteCard(prev, card.id))
    );

  const resetStarterContent = () =>
    askToConfirm(
      'Reset starter content?',
      'This replaces your current local lexicon with the original starter guide. Export backup arrives in a later phase, so reset carefully.',
      'Reset',
      () => {
        setLexiconData(resetLexiconData());
        setExpandedSections({});
        setExpandedItems({});
      }
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Geist_Mono'] text-slate-100">
      <LexiconHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddSection={openCreateSection}
        onReset={resetStarterContent}
        stats={stats}
      />

      <main className="mx-auto max-w-7xl p-6">
        <div className="space-y-4">
          {visibleSections.length === 0 ? (
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 py-12 text-center text-slate-400">
              No results found for "{searchQuery}"
            </div>
          ) : (
            visibleSections.map((section) => {
              const Icon = iconRegistry[section.iconKey] || Brain;

              return (
                <SectionPanel
                  key={section.id}
                  section={section}
                  Icon={Icon}
                  expanded={expandedSections[section.id]}
                  visibleCardCount={section.cards.length}
                  onToggle={() => toggleSection(section.id)}
                  onAddCard={() => openCreateCard(section.id)}
                  onEdit={() => openEditSection(section)}
                  onDuplicate={() => setLexiconData((prev) => duplicateSection(prev, section.id))}
                  onArchive={() => archiveSection(section)}
                  onDelete={() => removeSection(section)}
                >
                  {section.cards.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-700 p-5 text-sm text-slate-400">
                      No cards yet. Add one to capture a reusable prompt or workflow.
                    </div>
                  ) : (
                    section.cards.map((card) => (
                      <CardPanel
                        key={card.id}
                        card={card}
                        expanded={expandedItems[card.id]}
                        copied={copiedId === card.id}
                        onToggle={() => toggleItem(card.id)}
                        onCopy={() => copyToClipboard(card.exampleCode, card.id)}
                        onEdit={() => openEditCard(card)}
                        onDuplicate={() => setLexiconData((prev) => duplicateCard(prev, card.id))}
                        onArchive={() => archiveCard(card)}
                        onDelete={() => removeCard(card)}
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
            Phase 2: editable sections and cards. Import/export, backups, and richer filters are planned next.
          </p>
        </footer>
      </main>

      <EditModal
        editor={editor}
        onDraftChange={(draft) => setEditor((prev) => ({ ...prev, draft }))}
        onClose={() => setEditor(null)}
        onSave={saveEditor}
      />
      <ConfirmDialog
        confirmState={confirmState}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmAction}
      />
    </div>
  );
}
