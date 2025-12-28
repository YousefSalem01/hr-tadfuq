export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading: boolean;
  error?: string;
}

