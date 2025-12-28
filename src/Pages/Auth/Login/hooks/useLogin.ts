import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../types';

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleLogin = async (data: LoginFormData) => {
    console.log(data);
    setError(undefined);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // await loginAPI(data.email, data.password, data.rememberMe);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
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

