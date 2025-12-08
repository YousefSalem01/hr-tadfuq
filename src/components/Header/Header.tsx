import { Bell, User, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="text-primary" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">Mohamed Ali</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;

