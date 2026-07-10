import { starterGuideSections } from '../data/starterGuideData';

export const LEXICON_SCHEMA_VERSION = 1;
export const LEXICON_APP_VERSION = '0.1.0';
export const LEXICON_STORAGE_KEY = 'ai-lexicon:data:v1';

const nowIso = () => new Date().toISOString();

const clone = (value) => structuredClone(value);

const normalizeCard = (card, sectionId, index, timestamp) => ({
  id: card.id,
  sectionId,
  title: card.title,
  content: card.content || '',
  exampleCode: card.exampleCode || '',
  notes: card.notes || '',
  tags: Array.isArray(card.tags) ? card.tags : [],
  favorite: Boolean(card.favorite),
  archived: Boolean(card.archived),
  order: Number.isFinite(card.order) ? card.order : index,
  copyCount: Number.isFinite(card.copyCount) ? card.copyCount : 0,
  lastCopiedAt: card.lastCopiedAt || null,
  createdAt: card.createdAt || timestamp,
  updatedAt: card.updatedAt || timestamp
});

const normalizeSection = (section, index, timestamp) => ({
  id: section.id,
  title: section.title,
  description: section.description || '',
  iconKey: section.iconKey || 'brain',
  color: section.color || 'from-slate-600 to-gray-500',
  order: Number.isFinite(section.order) ? section.order : index,
  archived: Boolean(section.archived),
  createdAt: section.createdAt || timestamp,
  updatedAt: section.updatedAt || timestamp,
  cards: (section.cards || []).map((card, cardIndex) =>
    normalizeCard(card, section.id, cardIndex, timestamp)
  )
});

export const createStarterLexiconData = () => {
  const timestamp = nowIso();

  return {
    schemaVersion: LEXICON_SCHEMA_VERSION,
    appVersion: LEXICON_APP_VERSION,
    createdAt: timestamp,
    updatedAt: timestamp,
    sections: starterGuideSections.map((section, index) =>
      normalizeSection(section, index, timestamp)
    )
  };
};

export const normalizeLexiconData = (data) => {
  if (!data || !Array.isArray(data.sections)) {
    return createStarterLexiconData();
  }

  const timestamp = nowIso();

  return {
    schemaVersion: LEXICON_SCHEMA_VERSION,
    appVersion: data.appVersion || LEXICON_APP_VERSION,
    createdAt: data.createdAt || timestamp,
    updatedAt: data.updatedAt || timestamp,
    sections: data.sections.map((section, index) =>
      normalizeSection(section, index, timestamp)
    )
  };
};

export const loadLexiconData = () => {
  if (typeof window === 'undefined') {
    return createStarterLexiconData();
  }

  try {
    const stored = window.localStorage.getItem(LEXICON_STORAGE_KEY);
    if (!stored) return createStarterLexiconData();

    return normalizeLexiconData(JSON.parse(stored));
  } catch {
    return createStarterLexiconData();
  }
};

export const saveLexiconData = (data) => {
  if (typeof window === 'undefined') return;

  const normalized = normalizeLexiconData({
    ...data,
    updatedAt: nowIso()
  });

  window.localStorage.setItem(LEXICON_STORAGE_KEY, JSON.stringify(normalized));
};

export const resetLexiconData = () => {
  const starterData = createStarterLexiconData();
  saveLexiconData(starterData);
  return starterData;
};

export const exportLexiconData = (data) =>
  JSON.stringify(normalizeLexiconData(data), null, 2);

export const importLexiconData = (jsonText) => {
  const parsed = JSON.parse(jsonText);
  const normalized = normalizeLexiconData(parsed);
  saveLexiconData(normalized);
  return clone(normalized);
};
