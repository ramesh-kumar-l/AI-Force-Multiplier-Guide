import { Plus, RotateCcw, Search, Zap } from 'lucide-react';
import BackupControls from './BackupControls';

export default function LexiconHeader({
  searchQuery,
  onSearchChange,
  onAddSection,
  onReset,
  onExport,
  onImportFile,
  stats
}) {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-700/30 bg-slate-900/90 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <Zap className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                AI Lexicon
              </h1>
            </div>
            <p className="max-w-3xl text-sm text-slate-400">
              Your offline AI workflow library. Edit sections, capture proven prompts, and keep reusable engineering knowledge close.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-md border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300">
              {stats.sections} sections / {stats.cards} cards
            </div>
            <button
              type="button"
              onClick={onAddSection}
              className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Plus className="h-4 w-4" />
              Section
            </button>
            <BackupControls onExport={onExport} onImportFile={onImportFile} />
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search the lexicon"
            placeholder="Search titles, content, tags, examples..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>
    </div>
  );
}
