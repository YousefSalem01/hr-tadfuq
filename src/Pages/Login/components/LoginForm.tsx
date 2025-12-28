import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import HrInput from '../../../uikit/HrInput/HrInput';
import type { LoginFormData, LoginFormProps } from '../types';

const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <HrInput
          label="Email Address"
          variant="email"
          placeholder="Enter your email"
          icon={Mail}
          iconPosition="left"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        {/* Password Field */}
        <HrInput
          label="Password"
          variant="password"
          placeholder="Enter your password"
          icon={Lock}
          iconPosition="left"
          showPasswordToggle
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 mb-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Additional Options */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-primary font-medium hover:underline">
            Contact Administrator
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

