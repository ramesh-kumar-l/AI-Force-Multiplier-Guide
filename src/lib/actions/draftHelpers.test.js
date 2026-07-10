import { describe, expect, it } from 'vitest';
import { createBlankCardDraft, createCardDraft, parseTags } from './draftHelpers';

describe('parseTags', () => {
  it('trims whitespace and drops empty entries', () => {
    expect(parseTags(' foo ,  , bar,')).toEqual(['foo', 'bar']);
  });

  it('dedupes case-insensitively while keeping first-seen casing', () => {
    expect(parseTags('React, react, REACT, vue')).toEqual(['React', 'vue']);
  });

  it('returns an empty array for blank input', () => {
    expect(parseTags('')).toEqual([]);
  });
});

describe('createCardDraft', () => {
  it('joins tags into a comma-separated string', () => {
    const draft = createCardDraft({ title: 'x', tags: ['a', 'b'] });
    expect(draft.tagsText).toBe('a, b');
  });

  it('falls back to blank draft fields when given no card', () => {
    expect(createCardDraft(undefined)).toEqual(createBlankCardDraft());
  });
});
