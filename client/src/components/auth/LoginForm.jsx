import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { cn } from '../../lib/utils';

export const LoginForm = ({ onToggleForm, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    userLog: '',
    password: '',
  });

  const { login, loading, error, clearError } = useLogin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success && onLoginSuccess) {
      onLoginSuccess(result.data.user);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div
        className={cn(
          'w-full max-w-md space-y-8 rounded-3xl border border-white/10',
          'bg-white/5 p-8 shadow-2xl backdrop-blur-xl',
        )}
      >
        <div className="text-center">
          <div
            className={cn(
              'mx-auto flex h-16 w-16 items-center justify-center rounded-2xl',
              'bg-indigo-600 shadow-lg shadow-indigo-500/20',
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Bienvenido
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Usuario o Email
              </label>
              <input
                type="text"
                name="userLog"
                required
                value={formData.userLog}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="juan_vargas o email@ejemplo.com"
                disabled={loading}
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-300">
                  Contraseña
                </label>
                <a
                  href="#"
                  className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'group relative flex w-full justify-center rounded-xl bg-indigo-600',
              'px-4 py-3 text-sm font-semibold text-white transition-all',
              'hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none',
              'disabled:opacity-50',
            )}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-slate-400">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onToggleForm}
              className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
              disabled={loading}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
