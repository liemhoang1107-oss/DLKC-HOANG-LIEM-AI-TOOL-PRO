import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${
          isSuccess
            ? 'bg-gray-900/90 border-purple-500/40 text-purple-200 shadow-purple-500/20'
            : isError
            ? 'bg-red-950/90 border-red-500/40 text-red-200 shadow-red-500/20'
            : 'bg-gray-900/90 border-cyan-500/40 text-cyan-200 shadow-cyan-500/20'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
        <span className="text-sm font-medium pr-1">{toast.message}</span>
      </div>
    </div>
  );
};
