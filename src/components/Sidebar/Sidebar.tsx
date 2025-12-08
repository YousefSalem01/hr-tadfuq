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
import HrChip from '../../uikit/HrChip/HrChip';

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Leaves', path: '/leaves' },
    { icon: DollarSign, label: 'Payroll', path: '/payroll' },
    { icon: Receipt, label: 'Advance', path: '/advance' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: Shield, label: 'Users', path: '/users' },
    { icon: History, label: 'Activity Log', path: '/activity-log' },
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
            <Link key={index} to={item.path}>
              <HrChip
                icon={item.icon}
                variant={isActive ? 'active' : 'default'}
                collapsed={collapsed}
              >
                {item.label}
              </HrChip>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t space-y-1">
        <a href="#">
          <HrChip icon={Settings} collapsed={collapsed}>
            Settings
          </HrChip>
        </a>
        <Link to="/login">
          <HrChip icon={LogOut} collapsed={collapsed} className="text-primary hover:bg-red-50">
            Log out
          </HrChip>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

