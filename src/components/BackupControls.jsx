import { useRef } from 'react';
import { Download, Upload } from 'lucide-react';

export default function BackupControls({ onExport, onImportFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onImportFile(file);
  };

  return (
    <>
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
        title="Download your lexicon as a JSON backup"
      >
        <Download className="h-4 w-4" />
        Export
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
        title="Import a previously exported JSON backup"
      >
        <Upload className="h-4 w-4" />
        Import
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
