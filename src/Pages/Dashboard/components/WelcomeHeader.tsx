import { useAuthStore } from '../../../store/authStore';

const WelcomeHeader = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.username || 'User';

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Hello, {userName} 👋</h1>
      <p className="text-gray-500">Welcome to your HR management dashboard</p>
    </div>
  );
};

export default WelcomeHeader;
