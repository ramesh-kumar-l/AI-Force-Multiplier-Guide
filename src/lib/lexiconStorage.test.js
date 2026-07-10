import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LEXICON_STORAGE_KEY,
  exportLexiconData,
  importLexiconData,
  loadLexiconData,
  saveLexiconData
} from './lexiconStorage';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('loadLexiconData', () => {
  it('returns starter data with recovered:false when storage is empty', () => {
    const { data, recovered } = loadLexiconData();
    expect(recovered).toBe(false);
    expect(data.sections.length).toBeGreaterThan(0);
  });

  it('recovers from corrupted storage, flags recovered:true, and repairs storage', () => {
    window.localStorage.setItem(LEXICON_STORAGE_KEY, '{not valid json');

    const { data, recovered } = loadLexiconData();
    expect(recovered).toBe(true);
    expect(data.sections.length).toBeGreaterThan(0);

    const repaired = window.localStorage.getItem(LEXICON_STORAGE_KEY);
    expect(() => JSON.parse(repaired)).not.toThrow();
    expect(JSON.parse(repaired).sections.length).toBeGreaterThan(0);
  });
});

describe('saveLexiconData', () => {
  it('returns { success: true } on a normal save', () => {
    const { data } = loadLexiconData();
    const result = saveLexiconData(data);
    expect(result).toEqual({ success: true });
  });

  it('returns { success: false, error } instead of throwing on quota-exceeded', () => {
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const { data } = loadLexiconData();
    const result = saveLexiconData(data);

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    setItemSpy.mockRestore();
  });
});

describe('export / import round-trip', () => {
  it('imports data previously produced by exportLexiconData', () => {
    const { data } = loadLexiconData();
    const json = exportLexiconData(data);

    const imported = importLexiconData(json);
    expect(imported.sections.length).toBe(data.sections.length);
    expect(imported.sections[0].title).toBe(data.sections[0].title);
  });

  it('throws a readable error for malformed JSON', () => {
    expect(() => importLexiconData('{not json')).toThrow(/not valid JSON/);
  });

  it('throws instead of silently substituting starter data for wrong-shaped JSON', () => {
    expect(() => importLexiconData(JSON.stringify({}))).toThrow(/does not look like an AI Lexicon backup/);
    expect(() => importLexiconData(JSON.stringify({ sections: 'nope' }))).toThrow(
      /does not look like an AI Lexicon backup/
    );
  });
});
