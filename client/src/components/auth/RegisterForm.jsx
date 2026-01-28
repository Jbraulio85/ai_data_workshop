import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { cn } from '../../lib/utils';

export const RegisterForm = ({ onToggleForm, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phone: '',
  });

  const { register, loading, error, clearError } = useRegister();

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
    const result = await register(formData);
    if (result.success && onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 pt-20 pb-20">
      <div
        className={cn(
          'w-full max-w-2xl space-y-8 rounded-3xl border border-white/10',
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Regístrate para experimentar todas las funcionalidades.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="Juan A"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Apellidos
              </label>
              <input
                type="text"
                name="surname"
                required
                value={formData.surname}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="Vargas López"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="juan_vargas"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="email@ejemplo.com"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={cn(
                  'block w-full rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-3 text-white placeholder-slate-500 transition-all',
                  'outline-none focus:border-indigo-500 focus:ring-indigo-500/20',
                )}
                placeholder="1234 5678"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Contraseña
              </label>
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
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
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
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-slate-400">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onToggleForm}
              className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
              disabled={loading}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
