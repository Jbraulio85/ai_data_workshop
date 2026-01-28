import { useState } from 'react';
import { HiLightningBolt, HiSearch } from 'react-icons/hi';
import { cn } from '../../lib/utils';

export const QueryInput = ({ askQuestion, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const result = await askQuestion(query);
      if (result.success) {
        setQuery(''); // Limpiar el input después de una consulta exitosa
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <HiSearch className="h-5 w-5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: ¿Cuántos usuarios se registraron este mes?"
          disabled={loading}
          className={cn(
            'block h-14 w-full rounded-2xl border border-white/10',
            'bg-slate-900/50 pr-32 pl-12 text-white placeholder-slate-500',
            'backdrop-blur-sm transition-all focus:border-indigo-500/50',
            'focus:ring-2 focus:ring-indigo-500/50 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={cn(
              'flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2',
              'text-sm font-semibold text-white shadow-lg shadow-indigo-600/20',
              'transition-all hover:bg-indigo-500 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600',
            )}
          >
            <HiLightningBolt className="h-4 w-4" />
            <span>{loading ? 'Procesando...' : 'Preguntar'}</span>
          </button>
        </div>
      </form>
      <p className="mt-2 ml-2 text-xs text-slate-500">
        Prueba preguntando por roles, fechas o cantidades de usuarios.
      </p>
    </div>
  );
};
