import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AILexicon from './AI-Lexicon';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe('AI Lexicon critical UI behavior', () => {
  it('renders the starter lexicon with sections and stats', () => {
    render(<AILexicon />);

    expect(screen.getByText('AI Lexicon')).toBeInTheDocument();
    expect(screen.getByText(/\d+ sections \/ \d+ cards/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^Edit / }).length).toBeGreaterThan(0);
  });

  it('filters visible sections as the user searches, and clears on empty query', () => {
    render(<AILexicon />);

    const search = screen.getByLabelText('Search the lexicon');
    fireEvent.change(search, { target: { value: 'zzz-no-such-term-zzz' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();

    fireEvent.change(search, { target: { value: '' } });
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
  });

  it('toggling a card favorite persists across a fresh mount', () => {
    const { unmount } = render(<AILexicon />);

    const sectionToggle = screen.getAllByRole('button', { expanded: false })[0];
    fireEvent.click(sectionToggle);

    const favoriteButtons = screen.getAllByRole('button', { name: /^Favorite / });
    const firstFavoriteButton = favoriteButtons[0];
    const cardName = firstFavoriteButton.getAttribute('aria-label').replace(/^Favorite /, '');
    fireEvent.click(firstFavoriteButton);

    expect(screen.getByRole('button', { name: `Unfavorite ${cardName}` })).toBeInTheDocument();

    unmount();
    render(<AILexicon />);

    const reopenedSectionToggle = screen.getAllByRole('button', { expanded: false })[0];
    fireEvent.click(reopenedSectionToggle);

    expect(screen.getByRole('button', { name: `Unfavorite ${cardName}` })).toBeInTheDocument();
  });

  it('shows an inline error banner on invalid backup import without wiping existing data', async () => {
    render(<AILexicon />);

    const statsBefore = screen.getByText(/\d+ sections \/ \d+ cards/).textContent;

    const importButton = screen.getByRole('button', { name: 'Import' });
    const hiddenInput = importButton.parentElement.querySelector('input[type="file"]');
    const invalidFile = new File(['{not valid json'], 'backup.json', { type: 'application/json' });
    invalidFile.text = async () => '{not valid json';

    await act(async () => {
      fireEvent.change(hiddenInput, { target: { files: [invalidFile] } });
    });

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/not valid JSON/i)).toBeInTheDocument();
    expect(screen.getByText(/\d+ sections \/ \d+ cards/).textContent).toBe(statsBefore);
  });
});
