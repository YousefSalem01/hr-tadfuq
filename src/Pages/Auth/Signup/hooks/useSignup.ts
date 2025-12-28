import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SignupFormData } from '../types';

export const useSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSignup = async (data: SignupFormData) => {
    console.log(data);
    setError(undefined);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // await signupAPI(data.username, data.email, data.password);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to login on success
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
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

