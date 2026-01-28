import { useState } from 'react';
import toast from 'react-hot-toast';
import { queryAI } from '../services/apiService.js';

export const useAIQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');

  const askQuestion = async (question) => {
    if (!question.trim()) {
      toast.error('Por favor escribe una pregunta');
      return { success: false };
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSqlQuery('');

    try {
      const response = await queryAI(question);

      if (response.error) {
        setError(response.message);
        toast.error(response.message || 'Error al procesar la consulta');
        setLoading(false);
        return { success: false, error: response.message };
      }

      // Asumiendo que la respuesta tiene la estructura correcta del backend
      setResult(response);
      setSqlQuery(response.sql || '');
      toast.success('Consulta procesada exitosamente');

      setLoading(false);
      return { success: true, data: response };
    } catch (e) {
      const backendMsg = e?.response?.data?.message;
      const errorMessage =
        backendMsg || 'Error inesperado al procesar la consulta';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearResult = () => {
    setResult(null);
    setSqlQuery('');
    setError(null);
  };

  const clearError = () => setError(null);

  return {
    askQuestion,
    loading,
    error,
    result,
    sqlQuery,
    clearResult,
    clearError,
  };
};
