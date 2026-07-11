import {
  addCard,
  addSection,
  deleteCard,
  deleteSection,
  duplicateCard,
  duplicateSection,
  setCardArchived,
  setCardFavorite,
  setSectionArchived,
  updateCard,
  updateCardCopyStats,
  updateCardTemplateCopyStats,
  updateSection
} from '../lib/lexiconActions';

export default function useLexiconActions(setLexiconData) {
  return {
    addSection: (draft) => setLexiconData((prev) => addSection(prev, draft)),
    updateSection: (sectionId, draft) => setLexiconData((prev) => updateSection(prev, sectionId, draft)),
    duplicateSection: (sectionId) => setLexiconData((prev) => duplicateSection(prev, sectionId)),
    archiveSection: (sectionId) => setLexiconData((prev) => setSectionArchived(prev, sectionId, true)),
    restoreSection: (sectionId) => setLexiconData((prev) => setSectionArchived(prev, sectionId, false)),
    deleteSectionForever: (sectionId) => setLexiconData((prev) => deleteSection(prev, sectionId)),

    addCard: (sectionId, draft) => setLexiconData((prev) => addCard(prev, sectionId, draft)),
    updateCard: (cardId, draft) => setLexiconData((prev) => updateCard(prev, cardId, draft)),
    duplicateCard: (cardId) => setLexiconData((prev) => duplicateCard(prev, cardId)),
    archiveCard: (cardId) => setLexiconData((prev) => setCardArchived(prev, cardId, true)),
    restoreCard: (cardId) => setLexiconData((prev) => setCardArchived(prev, cardId, false)),
    deleteCardForever: (cardId) => setLexiconData((prev) => deleteCard(prev, cardId)),
    toggleCardFavorite: (cardId, current) =>
      setLexiconData((prev) => setCardFavorite(prev, cardId, !current)),
    recordCardCopy: (cardId) => setLexiconData((prev) => updateCardCopyStats(prev, cardId)),
    recordTemplateCopy: (cardId) => setLexiconData((prev) => updateCardTemplateCopyStats(prev, cardId))
  };
}
