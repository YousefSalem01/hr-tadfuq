import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../services/api';
import { endpoints } from '../../../../config/endpoints';
import { useAuthStore } from '../../../../store/authStore';
import type { SignupFormData } from '../types';

interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      email_verified: boolean;
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

export const useSignup = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSignup = async (data: SignupFormData) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await api.post<SignupResponse>(endpoints.auth.signup, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      login(
        { ...response.data.user, role: 'employee' },
        response.data.tokens.access,
        response.data.tokens.refresh
      );

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
    error,
  };
};

