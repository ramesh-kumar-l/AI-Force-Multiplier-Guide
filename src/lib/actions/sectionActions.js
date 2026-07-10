import { createId, nextOrder, nowIso, touchRoot } from './shared';

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
