import SignupHeader from './components/SignupHeader';
import SignupForm from './components/SignupForm';
import SignupFooter from './components/SignupFooter';
import { useSignup } from './hooks/useSignup';

const Signup = () => {
  const { handleSignup, isLoading, error } = useSignup();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <SignupHeader />
        <SignupForm onSubmit={handleSignup} isLoading={isLoading} error={error} />
        <SignupFooter />
      </div>
    </div>
  );
};

export default Signup;

