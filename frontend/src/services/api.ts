import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const validationErrors = error.response?.data?.errors as Record<string, string[]> | undefined;
    if (validationErrors) {
      const firstError = Object.values(validationErrors).flat()[0];
      if (firstError) return firstError;
    }

    const message = error.response?.data?.message;
    if (typeof message === 'string') return message;

    if (error.code === 'ERR_NETWORK') {
      return 'Não foi possível conectar à API. Confira se o Laravel está em execução.';
    }
    if (error.code === 'ECONNABORTED') {
      return 'A API demorou para responder. Tente novamente.';
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export default api;
