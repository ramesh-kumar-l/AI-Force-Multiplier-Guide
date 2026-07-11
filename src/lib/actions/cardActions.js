import { createId, nextOrder, nowIso, touchRoot } from './shared';
import { parseTags } from './draftHelpers';

export const addCard = (data, sectionId, draft) => {
  const timestamp = nowIso();
  return touchRoot(
    data,
    data.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            updatedAt: timestamp,
            cards: [
              ...section.cards,
              {
                id: createId('card'),
                sectionId,
                title: draft.title.trim(),
                content: draft.content.trim(),
                exampleCode: draft.exampleCode.trim(),
                notes: draft.notes.trim(),
                tags: parseTags(draft.tagsText),
                favorite: false,
                archived: false,
                order: nextOrder(section.cards),
                copyCount: 0,
                lastCopiedAt: null,
                templateCopyCount: 0,
                lastTemplateCopiedAt: null,
                createdAt: timestamp,
                updatedAt: timestamp
              }
            ]
          }
        : section
    )
  );
};

export const updateCard = (data, cardId, draft) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              title: draft.title.trim(),
              content: draft.content.trim(),
              exampleCode: draft.exampleCode.trim(),
              notes: draft.notes.trim(),
              tags: parseTags(draft.tagsText),
              updatedAt: nowIso()
            }
          : card
      )
    }))
  );

export const duplicateCard = (data, cardId) =>
  touchRoot(
    data,
    data.sections.map((section) => {
      const source = section.cards.find((card) => card.id === cardId);
      if (!source) return section;
      const timestamp = nowIso();

      return {
        ...section,
        updatedAt: timestamp,
        cards: [
          ...section.cards,
          {
            ...source,
            id: createId('card'),
            title: `${source.title} Copy`,
            order: nextOrder(section.cards),
            copyCount: 0,
            lastCopiedAt: null,
            templateCopyCount: 0,
            lastTemplateCopiedAt: null,
            createdAt: timestamp,
            updatedAt: timestamp
          }
        ]
      };
    })
  );

export const setCardArchived = (data, cardId, archived) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.map((card) =>
        card.id === cardId ? { ...card, archived, updatedAt: nowIso() } : card
      )
    }))
  );

export const setCardFavorite = (data, cardId, favorite) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.map((card) =>
        card.id === cardId ? { ...card, favorite: Boolean(favorite), updatedAt: nowIso() } : card
      )
    }))
  );

export const deleteCard = (data, cardId) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.filter((card) => card.id !== cardId)
    }))
  );

export const updateCardCopyStats = (data, cardId) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.map((card) =>
        card.id === cardId
          ? { ...card, copyCount: card.copyCount + 1, lastCopiedAt: nowIso() }
          : card
      )
    }))
  );

export const updateCardTemplateCopyStats = (data, cardId) =>
  touchRoot(
    data,
    data.sections.map((section) => ({
      ...section,
      cards: section.cards.map((card) =>
        card.id === cardId
          ? { ...card, templateCopyCount: card.templateCopyCount + 1, lastTemplateCopiedAt: nowIso() }
          : card
      )
    }))
  );
