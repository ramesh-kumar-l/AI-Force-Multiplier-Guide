export const searchableText = (section, card) =>
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

export const collectTags = (sections) => {
  const tags = new Set();
  sections
    .filter((section) => !section.archived)
    .forEach((section) =>
      section.cards
        .filter((card) => !card.archived)
        .forEach((card) => card.tags.forEach((tag) => tags.add(tag)))
    );
  return [...tags].sort((a, b) => a.localeCompare(b));
};

export const matchesTagFilter = (cardTags, selectedTags, tagMode = 'any') => {
  if (selectedTags.length === 0) return true;
  return tagMode === 'all'
    ? selectedTags.every((tag) => cardTags.includes(tag))
    : selectedTags.some((tag) => cardTags.includes(tag));
};

export const filterVisibleSections = (sections, options = {}) => {
  const { query = '', selectedTags = [], tagMode = 'any', favoritesOnly = false } = options;
  const normalizedQuery = query.trim().toLowerCase();
  const hasTagOrFavoriteFilter = selectedTags.length > 0 || favoritesOnly;

  return sections
    .filter((section) => !section.archived)
    .map((section) => {
      const activeCards = section.cards.filter((card) => !card.archived);
      const sectionTextMatches = normalizedQuery !== '' && searchableText(section).includes(normalizedQuery);

      const cards = activeCards.filter((card) => {
        if (favoritesOnly && !card.favorite) return false;
        if (!matchesTagFilter(card.tags, selectedTags, tagMode)) return false;
        if (normalizedQuery === '') return true;
        if (sectionTextMatches) return true;
        return searchableText(section, card).includes(normalizedQuery);
      });

      return { ...section, cards };
    })
    .filter((section) => {
      if (section.cards.length > 0) return true;
      if (normalizedQuery === '' && !hasTagOrFavoriteFilter) return true;
      if (hasTagOrFavoriteFilter) return false;
      return searchableText(section).includes(normalizedQuery);
    });
};

export const getArchivedView = (sections) => {
  const archivedSections = sections.filter((section) => section.archived);
  const archivedCards = sections
    .filter((section) => !section.archived)
    .flatMap((section) =>
      section.cards.filter((card) => card.archived).map((card) => ({ section, card }))
    );

  return { archivedSections, archivedCards };
};

export const computeStats = (sections) => {
  const active = sections.filter((section) => !section.archived);
  const activeCards = active.flatMap((section) => section.cards.filter((card) => !card.archived));

  return {
    sections: active.length,
    cards: activeCards.length,
    favorites: activeCards.filter((card) => card.favorite).length
  };
};
