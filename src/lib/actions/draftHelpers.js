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

export const parseTags = (tagsText) => {
  const seen = new Set();
  const tags = [];

  tagsText
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .forEach((tag) => {
      const key = tag.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      tags.push(tag);
    });

  return tags;
};
