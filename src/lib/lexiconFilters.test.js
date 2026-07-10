import { describe, expect, it } from 'vitest';
import {
  collectTags,
  computeStats,
  filterVisibleSections,
  getArchivedView,
  matchesTagFilter,
  searchableText
} from './lexiconFilters';

const sections = [
  {
    id: 'section-1',
    title: 'Debugging',
    description: 'Bug hunting workflows',
    archived: false,
    cards: [
      { id: 'card-1', title: 'Stack trace triage', content: 'read the trace', tags: ['debug', 'basics'], favorite: true, archived: false },
      { id: 'card-2', title: 'Bisect regressions', content: 'git bisect', tags: ['debug', 'git'], favorite: false, archived: false },
      { id: 'card-3', title: 'Old approach', content: 'legacy', tags: ['debug'], favorite: false, archived: true }
    ]
  },
  {
    id: 'section-2',
    title: 'Testing',
    description: 'Testing patterns',
    archived: false,
    cards: [
      { id: 'card-4', title: 'Unit tests', content: 'vitest basics', tags: ['testing'], favorite: true, archived: false }
    ]
  },
  {
    id: 'section-3',
    title: 'Archived Topic',
    description: 'old section',
    archived: true,
    cards: [{ id: 'card-5', title: 'gone', content: '', tags: [], favorite: false, archived: false }]
  },
  {
    id: 'section-4',
    title: 'Empty Section',
    description: 'nothing here yet',
    archived: false,
    cards: []
  }
];

describe('searchableText', () => {
  it('joins section and card fields lowercased', () => {
    expect(searchableText(sections[0], sections[0].cards[0])).toContain('stack trace triage');
  });
});

describe('collectTags', () => {
  it('returns sorted, deduped tags excluding archived cards/sections', () => {
    expect(collectTags(sections)).toEqual(['basics', 'debug', 'git', 'testing']);
  });
});

describe('matchesTagFilter', () => {
  it('matches everything when no tags are selected', () => {
    expect(matchesTagFilter([], [], 'any')).toBe(true);
  });

  it('OR mode matches any selected tag', () => {
    expect(matchesTagFilter(['debug'], ['debug', 'git'], 'any')).toBe(true);
    expect(matchesTagFilter(['testing'], ['debug', 'git'], 'any')).toBe(false);
  });

  it('AND mode requires every selected tag', () => {
    expect(matchesTagFilter(['debug', 'git'], ['debug', 'git'], 'all')).toBe(true);
    expect(matchesTagFilter(['debug'], ['debug', 'git'], 'all')).toBe(false);
  });
});

describe('filterVisibleSections - parity with prior search-only behavior', () => {
  it('with no query, keeps every non-archived section (even ones with zero active cards) and drops archived items', () => {
    const result = filterVisibleSections(sections, {});
    expect(result.map((s) => s.id)).toEqual(['section-1', 'section-2', 'section-4']);
    expect(result.find((s) => s.id === 'section-1').cards.map((c) => c.id)).toEqual(['card-1', 'card-2']);
  });

  it('keeps all active cards in a section whose own title/description matches the query', () => {
    const result = filterVisibleSections(sections, { query: 'debugging' });
    const section1 = result.find((s) => s.id === 'section-1');
    expect(section1.cards.map((c) => c.id)).toEqual(['card-1', 'card-2']);
  });

  it('filters to only matching cards when the section itself does not match', () => {
    const result = filterVisibleSections(sections, { query: 'bisect' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('section-1');
    expect(result[0].cards.map((c) => c.id)).toEqual(['card-2']);
  });

  it('drops sections with no matches and no section-level text match', () => {
    const result = filterVisibleSections(sections, { query: 'nonexistent-term' });
    expect(result).toEqual([]);
  });
});

describe('filterVisibleSections - favorites and tags', () => {
  it('favoritesOnly narrows to favorited cards and drops now-empty sections', () => {
    const result = filterVisibleSections(sections, { favoritesOnly: true });
    expect(result.map((s) => s.id)).toEqual(['section-1', 'section-2']);
    expect(result.find((s) => s.id === 'section-1').cards.map((c) => c.id)).toEqual(['card-1']);
  });

  it('tag filter (any) narrows across sections', () => {
    const result = filterVisibleSections(sections, { selectedTags: ['git'] });
    expect(result).toHaveLength(1);
    expect(result[0].cards.map((c) => c.id)).toEqual(['card-2']);
  });

  it('tag filter (all) requires every selected tag on the card', () => {
    const result = filterVisibleSections(sections, { selectedTags: ['debug', 'git'], tagMode: 'all' });
    expect(result[0].cards.map((c) => c.id)).toEqual(['card-2']);
  });

  it('an empty section with no filters active is still shown (empty-state case)', () => {
    const result = filterVisibleSections(sections, {});
    expect(result.some((s) => s.id === 'section-4')).toBe(true);
  });

  it('an empty section is hidden once a tag/favorite filter is active', () => {
    const result = filterVisibleSections(sections, { favoritesOnly: true });
    expect(result.some((s) => s.id === 'section-4')).toBe(false);
  });
});

describe('getArchivedView', () => {
  it('separates archived sections from archived cards within active sections', () => {
    const { archivedSections, archivedCards } = getArchivedView(sections);
    expect(archivedSections.map((s) => s.id)).toEqual(['section-3']);
    expect(archivedCards).toHaveLength(1);
    expect(archivedCards[0].card.id).toBe('card-3');
    expect(archivedCards[0].section.id).toBe('section-1');
  });
});

describe('computeStats', () => {
  it('counts active sections/cards and favorites, excluding archived', () => {
    expect(computeStats(sections)).toEqual({ sections: 3, cards: 3, favorites: 2 });
  });
});
