const nowIso = () => new Date().toISOString();

const createId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const touchRoot = (data, sections) => ({
  ...data,
  updatedAt: nowIso(),
  sections
});

const nextOrder = (items) =>
  items.reduce((highest, item) => Math.max(highest, Number(item.order) || 0), -1) + 1;

export const createBlankSectionDraft = () => ({
  title: '',
  description: '',
  iconKey: 'brain',
  color: 'from-blue-600 to-cyan-500'
});

export const createSectionDraft = (section) => ({
  title: section?.title || '',
  description: section?.description || '',
  iconKey: section?.iconKey || 'brain',
  color: section?.color || 'from-blue-600 to-cyan-500'
});

export const createBlankCardDraft = () => ({
  title: '',
  content: '',
  exampleCode: '',
  notes: '',
  tagsText: ''
});

export const createCardDraft = (card) => ({
  title: card?.title || '',
  content: card?.content || '',
  exampleCode: card?.exampleCode || '',
  notes: card?.notes || '',
  tagsText: Array.isArray(card?.tags) ? card.tags.join(', ') : ''
});

const parseTags = (tagsText) =>
  tagsText
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const addSection = (data, draft) => {
  const timestamp = nowIso();
  const section = {
    id: createId('section'),
    title: draft.title.trim(),
    description: draft.description.trim(),
    iconKey: draft.iconKey,
    color: draft.color,
    order: nextOrder(data.sections),
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    cards: []
  };

  return touchRoot(data, [...data.sections, section]);
};

export const updateSection = (data, sectionId, draft) =>
  touchRoot(
    data,
    data.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            title: draft.title.trim(),
            description: draft.description.trim(),
            iconKey: draft.iconKey,
            color: draft.color,
            updatedAt: nowIso()
          }
        : section
    )
  );

export const duplicateSection = (data, sectionId) => {
  const timestamp = nowIso();
  const source = data.sections.find((section) => section.id === sectionId);
  if (!source) return data;

  const newSectionId = createId('section');
  const section = {
    ...source,
    id: newSectionId,
    title: `${source.title} Copy`,
    order: nextOrder(data.sections),
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    cards: source.cards.map((card, index) => ({
      ...card,
      id: createId('card'),
      sectionId: newSectionId,
      order: index,
      copyCount: 0,
      lastCopiedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    }))
  };

  return touchRoot(data, [...data.sections, section]);
};

export const setSectionArchived = (data, sectionId, archived) =>
  touchRoot(
    data,
    data.sections.map((section) =>
      section.id === sectionId ? { ...section, archived, updatedAt: nowIso() } : section
    )
  );

export const deleteSection = (data, sectionId) =>
  touchRoot(data, data.sections.filter((section) => section.id !== sectionId));

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
