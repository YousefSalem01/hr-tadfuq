import { useForm } from 'react-hook-form';
import { User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import HrInput from '../../../../uikit/HrInput/HrInput';
import type { SignupFormData, SignupFormProps } from '../types';

const SignupForm = ({ onSubmit, isLoading, error }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <HrInput
          label="Username"
          variant="text"
          placeholder="Enter your username"
          icon={User}
          iconPosition="left"
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
        />

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
          {isLoading ? 'Creating Account...' : 'Sign Up'}
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
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

