import { useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/apiService.js';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginUser(credentials);

      if (result.error) {
        setError(result.message);
        toast.error(result.message || 'Error al iniciar sesión');
        setLoading(false);
        return { success: false, error: result.message };
      }

      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      }

      toast.success(
        `¡Bienvenido de vuelta, ${result.user?.name || 'usuario'}!`,
      );
      setLoading(false);
      return { success: true, data: result };
    } catch (e) {
      const backendMsg = e?.response?.data?.message;
      const errorMessage = backendMsg || 'Error inesperado al iniciar sesión';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    loading,
    error,
    clearError,
  };
};
