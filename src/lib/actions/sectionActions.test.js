import { describe, expect, it } from 'vitest';
import { addSection, deleteSection, duplicateSection, setSectionArchived, updateSection } from './sectionActions';

const baseData = () => ({
  schemaVersion: 1,
  sections: [
    {
      id: 'section-1',
      title: 'First',
      description: 'desc',
      iconKey: 'brain',
      color: 'from-blue-600 to-cyan-500',
      order: 0,
      archived: false,
      cards: [
        { id: 'card-1', sectionId: 'section-1', title: 'Card 1', order: 0, tags: [], archived: false }
      ]
    }
  ]
});

describe('addSection', () => {
  it('assigns an incrementing order and appends the section', () => {
    const data = addSection(baseData(), {
      title: ' New ',
      description: ' desc ',
      iconKey: 'code',
      color: 'from-red-600 to-orange-500'
    });

    expect(data.sections).toHaveLength(2);
    const created = data.sections[1];
    expect(created.title).toBe('New');
    expect(created.description).toBe('desc');
    expect(created.order).toBe(1);
    expect(created.archived).toBe(false);
    expect(created.cards).toEqual([]);
  });
});

describe('updateSection', () => {
  it('updates only the targeted section', () => {
    const data = updateSection(baseData(), 'section-1', {
      title: 'Renamed',
      description: 'new desc',
      iconKey: 'zap',
      color: 'from-green-600 to-lime-500'
    });

    expect(data.sections[0].title).toBe('Renamed');
    expect(data.sections[0].iconKey).toBe('zap');
  });
});

describe('duplicateSection', () => {
  it('deep-clones the section with new section and card ids', () => {
    const original = baseData();
    const data = duplicateSection(original, 'section-1');

    expect(data.sections).toHaveLength(2);
    const copy = data.sections[1];
    expect(copy.id).not.toBe('section-1');
    expect(copy.title).toBe('First Copy');
    expect(copy.cards[0].id).not.toBe('card-1');
    expect(copy.cards[0].sectionId).toBe(copy.id);
  });

  it('returns data unchanged when the section does not exist', () => {
    const original = baseData();
    expect(duplicateSection(original, 'missing')).toBe(original);
  });
});

describe('setSectionArchived / restore', () => {
  it('archives and restores a section via the archived flag', () => {
    const archived = setSectionArchived(baseData(), 'section-1', true);
    expect(archived.sections[0].archived).toBe(true);

    const restored = setSectionArchived(archived, 'section-1', false);
    expect(restored.sections[0].archived).toBe(false);
  });
});

describe('deleteSection', () => {
  it('removes the section and its cards entirely', () => {
    const data = deleteSection(baseData(), 'section-1');
    expect(data.sections).toHaveLength(0);
  });
});
