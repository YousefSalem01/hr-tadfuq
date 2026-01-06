import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../services/api';
import { endpoints } from '../../../../config/endpoints';
import { useAuthStore } from '../../../../store/authStore';
import type { LoginFormData } from '../types';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      email_verified: boolean;
    };
  };
}

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleLogin = async (data: LoginFormData) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await api.post<LoginResponse>(endpoints.auth.login, {
        email: data.email,
        password: data.password,
      });

      login(response.data.user, response.data.access, response.data.refresh);

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
  };
};

