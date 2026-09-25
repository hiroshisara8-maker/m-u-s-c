import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Layers, Info, AlertTriangle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#11141B]/95 border border-purple-500/40 p-4 shadow-2xl backdrop-blur-md">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400" />

        <div className="flex items-start gap-3">
          {/* Swatch or Icon */}
          {toast.hex ? (
            <div
              className="w-10 h-10 rounded-lg shrink-0 border border-white/20 shadow-inner flex items-center justify-center"
              style={{ backgroundColor: toast.hex }}
            >
              <Check className="w-5 h-5 text-white drop-shadow" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg shrink-0 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              {toast.type === 'pattern-toggle' && <Layers className="w-5 h-5 text-cyan-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-purple-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'color-detected' && <Check className="w-5 h-5 text-emerald-400" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-widest text-[#00F0FF] uppercase">
                {toast.title}
              </span>
              <button
                onClick={dismissToast}
                className="text-gray-400 hover:text-white p-0.5 rounded transition-colors"
                aria-label="Đóng thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-bold text-white mt-0.5 truncate">
              {toast.message}
            </p>

            {toast.subtext && (
              <p className="text-xs text-gray-300 font-mono mt-1 break-words">
                {toast.subtext}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
