import { useState } from 'react';
import { HiTerminal, HiChevronDown, HiChevronUp } from 'react-icons/hi';

export const SqlPreview = ({ sqlQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mostrar el SQL generado o un placeholder si no hay
  const displaySql = sqlQuery || 'SELECT * FROM users LIMIT 10;';

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/30 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-white/5"
      >
        <div className="flex items-center space-x-3 text-indigo-400">
          <HiTerminal className="h-5 w-5" />
          <span className="text-sm font-bold tracking-wider uppercase">
            SQL Generado por la IA
          </span>
        </div>
        <div className="text-slate-500">
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </div>
      </button>

      {isOpen && (
        <div className="animate-in slide-in-from-top-2 p-6 pt-0 duration-200">
          <div className="relative">
            <pre className="overflow-x-auto rounded-xl border border-white/5 bg-black/50 p-4 font-mono text-xs text-indigo-300">
              <code>{displaySql}</code>
            </pre>
            <div className="absolute top-2 right-2 p-1 text-[10px] font-bold text-slate-600 uppercase">
              Read-only
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 italic">
            Este panel es solo informativo para fines educativos del workshop.
          </p>
        </div>
      )}
    </div>
  );
};
