import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="text-gray-400" size={80} />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 text-sm">
            It might have been moved or deleted, or you may have mistyped the URL.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <button
              onClick={() => navigate('/employees')}
              className="text-primary hover:underline"
            >
              Employees
            </button>
            <button
              onClick={() => navigate('/departments')}
              className="text-primary hover:underline"
            >
              Departments
            </button>
            <button
              onClick={() => navigate('/attendance')}
              className="text-primary hover:underline"
            >
              Attendance
            </button>
            <button
              onClick={() => navigate('/payroll')}
              className="text-primary hover:underline"
            >
              Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

