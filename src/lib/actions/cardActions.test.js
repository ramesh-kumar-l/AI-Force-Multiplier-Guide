import { describe, expect, it } from 'vitest';
import {
  addCard,
  deleteCard,
  duplicateCard,
  setCardArchived,
  setCardFavorite,
  updateCard,
  updateCardCopyStats
} from './cardActions';

const baseData = () => ({
  schemaVersion: 1,
  sections: [
    {
      id: 'section-1',
      title: 'First',
      cards: [
        {
          id: 'card-1',
          sectionId: 'section-1',
          title: 'Card 1',
          content: 'content',
          exampleCode: 'code',
          notes: 'notes',
          tags: ['a'],
          favorite: false,
          archived: false,
          order: 0,
          copyCount: 2,
          lastCopiedAt: null
        }
      ]
    }
  ]
});

describe('addCard', () => {
  it('defaults favorite/archived to false and parses tags', () => {
    const data = addCard(baseData(), 'section-1', {
      title: 'New',
      content: 'c',
      exampleCode: 'e',
      notes: 'n',
      tagsText: 'x, y, x'
    });

    const card = data.sections[0].cards[1];
    expect(card.favorite).toBe(false);
    expect(card.archived).toBe(false);
    expect(card.order).toBe(1);
    expect(card.tags).toEqual(['x', 'y']);
    expect(card.copyCount).toBe(0);
  });
});

describe('updateCard', () => {
  it('updates fields but preserves favorite/archived/copyCount', () => {
    const data = updateCard(baseData(), 'card-1', {
      title: 'Renamed',
      content: 'new content',
      exampleCode: 'new code',
      notes: 'new notes',
      tagsText: 'b'
    });

    const card = data.sections[0].cards[0];
    expect(card.title).toBe('Renamed');
    expect(card.tags).toEqual(['b']);
    expect(card.favorite).toBe(false);
    expect(card.copyCount).toBe(2);
  });
});

describe('setCardFavorite', () => {
  it('toggles favorite independently of other fields', () => {
    const favorited = setCardFavorite(baseData(), 'card-1', true);
    const card = favorited.sections[0].cards[0];
    expect(card.favorite).toBe(true);
    expect(card.title).toBe('Card 1');
    expect(card.archived).toBe(false);

    const unfavorited = setCardFavorite(favorited, 'card-1', false);
    expect(unfavorited.sections[0].cards[0].favorite).toBe(false);
  });
});

describe('setCardArchived / restore', () => {
  it('archives and restores a card via the archived flag', () => {
    const archived = setCardArchived(baseData(), 'card-1', true);
    expect(archived.sections[0].cards[0].archived).toBe(true);

    const restored = setCardArchived(archived, 'card-1', false);
    expect(restored.sections[0].cards[0].archived).toBe(false);
  });
});

describe('duplicateCard', () => {
  it('resets copy stats and assigns a new id', () => {
    const data = duplicateCard(baseData(), 'card-1');
    const copy = data.sections[0].cards[1];
    expect(copy.id).not.toBe('card-1');
    expect(copy.title).toBe('Card 1 Copy');
    expect(copy.copyCount).toBe(0);
    expect(copy.lastCopiedAt).toBeNull();
  });
});

describe('deleteCard', () => {
  it('removes only the targeted card', () => {
    const data = deleteCard(baseData(), 'card-1');
    expect(data.sections[0].cards).toHaveLength(0);
  });
});

describe('updateCardCopyStats', () => {
  it('increments copyCount and sets lastCopiedAt', () => {
    const data = updateCardCopyStats(baseData(), 'card-1');
    const card = data.sections[0].cards[0];
    expect(card.copyCount).toBe(3);
    expect(card.lastCopiedAt).not.toBeNull();
  });
});
