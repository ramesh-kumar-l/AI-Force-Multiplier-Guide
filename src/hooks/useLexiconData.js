import { useEffect, useState } from 'react';
import {
  exportLexiconData,
  importLexiconData,
  loadLexiconData,
  resetLexiconData,
  saveLexiconData
} from '../lib/lexiconStorage';

const downloadJson = (json, filename) => {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function useLexiconData() {
  const [state, setState] = useState(() => {
    const { data, recovered } = loadLexiconData();
    return { data, recoveredNotice: recovered };
  });
  const [saveError, setSaveError] = useState(null);
  const [importError, setImportError] = useState(null);

  const lexiconData = state.data;

  const setLexiconData = (updater) =>
    setState((prev) => ({
      ...prev,
      data: typeof updater === 'function' ? updater(prev.data) : updater
    }));

  useEffect(() => {
    const result = saveLexiconData(lexiconData);
    setSaveError(
      result.success
        ? null
        : 'Your changes could not be saved to this browser (local storage may be full). Export a backup to avoid losing them.'
    );
  }, [lexiconData]);

  const resetToStarter = () => {
    setState({ data: resetLexiconData(), recoveredNotice: false });
  };

  const exportBackup = () => {
    const json = exportLexiconData(lexiconData);
    downloadJson(json, `ai-lexicon-backup-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const importBackup = async (file) => {
    try {
      const text = await file.text();
      const imported = importLexiconData(text);
      setState({ data: imported, recoveredNotice: false });
      setImportError(null);
      return true;
    } catch (error) {
      setImportError(error.message || 'Could not import that file.');
      return false;
    }
  };

  return {
    lexiconData,
    setLexiconData,
    saveError,
    dismissSaveError: () => setSaveError(null),
    recoveredNotice: state.recoveredNotice,
    dismissRecoveredNotice: () => setState((prev) => ({ ...prev, recoveredNotice: false })),
    importError,
    dismissImportError: () => setImportError(null),
    resetToStarter,
    exportBackup,
    importBackup
  };
}
