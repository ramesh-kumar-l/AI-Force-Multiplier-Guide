import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useLexiconData from './useLexiconData';
import { LEXICON_STORAGE_KEY } from '../lib/lexiconStorage';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useLexiconData', () => {
  it('loads starter data on first mount and autosaves it to localStorage', async () => {
    const { result } = renderHook(() => useLexiconData());

    expect(result.current.lexiconData.sections.length).toBeGreaterThan(0);
    expect(result.current.recoveredNotice).toBe(false);

    await waitFor(() => {
      expect(window.localStorage.getItem(LEXICON_STORAGE_KEY)).not.toBeNull();
    });
  });

  it('flags recoveredNotice and repairs storage when persisted data is corrupted', () => {
    window.localStorage.setItem(LEXICON_STORAGE_KEY, '{not valid json');

    const { result } = renderHook(() => useLexiconData());

    expect(result.current.recoveredNotice).toBe(true);

    act(() => result.current.dismissRecoveredNotice());
    expect(result.current.recoveredNotice).toBe(false);
  });

  it('surfaces a dismissible saveError when persistence fails, without losing in-memory data', async () => {
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const { result } = renderHook(() => useLexiconData());

    await waitFor(() => {
      expect(result.current.saveError).toMatch(/could not be saved/i);
    });
    expect(result.current.lexiconData.sections.length).toBeGreaterThan(0);

    setItemSpy.mockRestore();
    act(() => result.current.dismissSaveError());
    expect(result.current.saveError).toBeNull();
  });

  it('importBackup replaces data on valid JSON and reports an error on invalid JSON without wiping data', async () => {
    const { result } = renderHook(() => useLexiconData());
    const originalSectionCount = result.current.lexiconData.sections.length;

    const validFile = { text: async () => JSON.stringify({ sections: [] }) };
    await act(async () => {
      const success = await result.current.importBackup(validFile);
      expect(success).toBe(true);
    });
    expect(result.current.lexiconData.sections.length).toBe(0);
    expect(result.current.importError).toBeNull();

    const invalidFile = { text: async () => '{not valid json' };
    await act(async () => {
      const success = await result.current.importBackup(invalidFile);
      expect(success).toBe(false);
    });
    expect(result.current.importError).toMatch(/not valid JSON/i);
    expect(result.current.lexiconData.sections.length).toBe(0);

    act(() => result.current.dismissImportError());
    expect(result.current.importError).toBeNull();
    expect(result.current.lexiconData.sections.length).toBe(originalSectionCount === 0 ? 0 : result.current.lexiconData.sections.length);
  });

  it('resetToStarter restores starter content and clears the recovered notice', () => {
    window.localStorage.setItem(LEXICON_STORAGE_KEY, '{not valid json');
    const { result } = renderHook(() => useLexiconData());
    expect(result.current.recoveredNotice).toBe(true);

    act(() => result.current.setLexiconData((data) => ({ ...data, sections: [] })));
    expect(result.current.lexiconData.sections.length).toBe(0);

    act(() => result.current.resetToStarter());
    expect(result.current.lexiconData.sections.length).toBeGreaterThan(0);
    expect(result.current.recoveredNotice).toBe(false);
  });
});
