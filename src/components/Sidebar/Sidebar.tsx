import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Receipt, 
  FolderOpen, 
  Building2, 
  Settings, 
  LogOut,
  ChevronLeft,
  Shield,
  History
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Users size={20} />, label: 'Employees', path: '/employees' },
    { icon: <Calendar size={20} />, label: 'Attendance', path: '/attendance' },
    { icon: <FileText size={20} />, label: 'Leaves', path: '/leaves' },
    { icon: <DollarSign size={20} />, label: 'Payroll', path: '/payroll' },
    { icon: <Receipt size={20} />, label: 'Advance', path: '/advance' },
    { icon: <FolderOpen size={20} />, label: 'Documents', path: '/documents' },
    { icon: <Building2 size={20} />, label: 'Departments', path: '/departments' },
    { icon: <Shield size={20} />, label: 'Users', path: '/users' },
    { icon: <History size={20} />, label: 'Activity Log', path: '/activity-log' },
  ];

  return (
    <div className={`bg-white h-screen shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Logo Section */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-semibold text-gray-800">Santalam Tax</div>
                <div className="text-xs text-gray-500">Consultancy</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} className={collapsed ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t space-y-1">
        <a
          href="#"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </a>
        <Link
          to="/login"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-red-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

