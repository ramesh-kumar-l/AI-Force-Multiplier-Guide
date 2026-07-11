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
  templateCopyCount: Number.isFinite(card.templateCopyCount) ? card.templateCopyCount : 0,
  lastTemplateCopiedAt: card.lastTemplateCopiedAt || null,
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

export const isValidLexiconShape = (parsed) =>
  Boolean(parsed) && typeof parsed === 'object' && Array.isArray(parsed.sections);

export const normalizeLexiconData = (data) => {
  if (!isValidLexiconShape(data)) {
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

export const saveLexiconData = (data) => {
  if (typeof window === 'undefined') return { success: true };

  try {
    const normalized = normalizeLexiconData({
      ...data,
      updatedAt: nowIso()
    });

    window.localStorage.setItem(LEXICON_STORAGE_KEY, JSON.stringify(normalized));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const loadLexiconData = () => {
  if (typeof window === 'undefined') {
    return { data: createStarterLexiconData(), recovered: false };
  }

  try {
    const stored = window.localStorage.getItem(LEXICON_STORAGE_KEY);
    if (!stored) return { data: createStarterLexiconData(), recovered: false };

    return { data: normalizeLexiconData(JSON.parse(stored)), recovered: false };
  } catch {
    const recoveredData = createStarterLexiconData();
    saveLexiconData(recoveredData);
    return { data: recoveredData, recovered: true };
  }
};

export const resetLexiconData = () => {
  const starterData = createStarterLexiconData();
  saveLexiconData(starterData);
  return starterData;
};

export const exportLexiconData = (data) =>
  JSON.stringify(normalizeLexiconData(data), null, 2);

export const importLexiconData = (jsonText) => {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error('That file is not valid JSON.');
  }

  if (!isValidLexiconShape(parsed)) {
    throw new Error('That file does not look like an AI Lexicon backup (missing a "sections" list).');
  }

  const normalized = normalizeLexiconData(parsed);
  saveLexiconData(normalized);
  return clone(normalized);
};
