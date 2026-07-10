import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const toneStyles = {
  error: {
    wrapper: 'border-red-500/40 bg-red-950/40 text-red-200',
    icon: AlertCircle
  },
  info: {
    wrapper: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-100',
    icon: Info
  },
  success: {
    wrapper: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-100',
    icon: CheckCircle2
  }
};

export default function InlineBanner({ tone = 'info', message, actionLabel, onAction, onDismiss }) {
  if (!message) return null;

  const { wrapper, icon: Icon } = toneStyles[tone] || toneStyles.info;

  return (
    <div className={`mb-4 flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${wrapper}`}>
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <p className="flex-1">{message}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="whitespace-nowrap font-semibold underline underline-offset-2">
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="rounded p-0.5 hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
