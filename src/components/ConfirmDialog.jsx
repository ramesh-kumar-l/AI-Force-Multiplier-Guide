import { AlertTriangle, X } from 'lucide-react';
import useDialogA11y from '../hooks/useDialogA11y';

export default function ConfirmDialog({ confirmState, onCancel, onConfirm }) {
  const containerRef = useDialogA11y(Boolean(confirmState), onCancel);

  if (!confirmState) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4">
      <div
        ref={containerRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        tabIndex={-1}
        className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-300" />
            <h2 id="confirm-dialog-title" className="text-lg font-semibold text-slate-100">{confirmState.title}</h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close confirmation dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p id="confirm-dialog-message" className="p-4 text-sm leading-6 text-slate-300">{confirmState.message}</p>
        <div className="flex justify-end gap-2 border-t border-slate-800 p-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            {confirmState.actionLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
