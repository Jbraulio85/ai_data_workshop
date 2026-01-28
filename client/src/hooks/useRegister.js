import { useState } from 'react';
import toast from 'react-hot-toast';
import { registerUser } from '../services/apiService.js';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {

      if (userData.password !== userData.confirmPassword) {
        const errorMessage = 'Las contraseñas no coinciden';
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }

      const result = await registerUser(userData);


      if (result.error) {
        setError(result.message);
        toast.error(result.message || 'Error al registrar usuario');
        setLoading(false);
        return { success: false, error: result.message };
      }

      toast.success('¡Registro exitoso! Ya puedes iniciar sesión.');
      setLoading(false);
      return { success: true, data: result };
    } catch (e) {
      const backendMsg = e?.response?.data?.message;
      const errorMessage = backendMsg || 'Error inesperado al registrar usuario';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    loading,
    error,
    clearError,
  };
};
