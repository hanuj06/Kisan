import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
  warning: AlertTriangle,
};

const STYLES = {
  success: 'bg-kd-green-700 text-white',
  error:   'bg-red-500 text-white',
  info:    'bg-kd-blue-600 text-white',
  warning: 'bg-kd-amber-500 text-kd-earth',
};

export default function Toast() {
  const { toast, dispatch } = useApp();
  if (!toast) return null;

  const Icon = ICONS[toast.type] || Info;

  return (
    <div
      className={clsx(
        'fixed top-4 right-4 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-kd-xl text-sm font-medium animate-slide-down',
        STYLES[toast.type] || STYLES.info
      )}
      style={{ minWidth: 280, maxWidth: 380 }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => dispatch({ type: 'HIDE_TOAST' })}
        className="p-0.5 rounded-lg hover:bg-black/10 transition-colors ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
