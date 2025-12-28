import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import { useLogin } from './hooks/useLogin';

const Login = () => {
  const { handleLogin, isLoading, error } = useLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <LoginHeader />
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
