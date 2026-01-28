// ...existing code...
import { UserProfile } from '../components/dashboard/UserProfile';
import { QueryInput } from '../components/dashboard/QueryInput';
import { AnalysisResult } from '../components/dashboard/AnalysisResult';
import { SqlPreview } from '../components/dashboard/SqlPreview';
import { HiSparkles, HiLogout } from 'react-icons/hi';
import { cn } from '../lib/utils';
import { useAIQuery } from '../hooks/useAIQuery';

export const DashboardPage = ({ user, onLogout }) => {
  const { askQuestion, loading, result, sqlQuery } = useAIQuery();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2',
            '-translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2',
            'translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px]',
          )}
        />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="w-64 bg-slate-800/50 p-4 border-r border-white/10 flex flex-col">
          <UserProfile user={user} />
          <button
            onClick={onLogout}
            className={cn(
              'flex items-center justify-center space-x-2 rounded-xl px-4 py-2 transition-all w-full mt-auto',
              'text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300',
            )}
          >
            <HiLogout size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </aside>

        <main className="flex-1 flex flex-col p-4 md:p-8">
          <header className="animate-in fade-in slide-in-from-top-4 duration-700 mb-8">
            <section className="space-y-4 py-6 text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl text-center">
                Análisis Inteligente de{' '}
                <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Usuarios
                </span>
              </h1>
              <div
                className={cn(
                  'inline-flex items-center space-x-2 rounded-full border',
                  'border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold',
                  'tracking-widest text-indigo-400 capitalize',
                )}
              >
                <HiSparkles />
                <span>AI Data Workshop - Fundación Kinal</span>
              </div>
              <p className="text-base text-slate-400 leading-relaxed">
                Interactúa con tu base de datos en lenguaje natural. La IA procesará tu solicitud y generará la visualización más adecuada.
              </p>
            </section>
          </header>

          <section className="flex flex-col space-y-8 flex-1">
            <QueryInput askQuestion={askQuestion} loading={loading} />
            <AnalysisResult queryResult={result} loading={loading} />
            <SqlPreview sqlQuery={sqlQuery} />
          </section>

          <footer className="border-t border-white/5 py-8 text-center mt-8">
            <p className="text-xs font-medium tracking-wide text-slate-600">
              &copy; 2026 AI Data Workshop |{' '}
              <span className="text-indigo-500/80">Fundación Kinal</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
