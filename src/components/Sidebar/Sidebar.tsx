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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HrChip from '../../uikit/HrChip/HrChip';
import logo from '../../assets/logos/logo.svg';
import { useAuthStore } from '../../store/authStore';

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Leaves', path: '/leaves' },
    { icon: DollarSign, label: 'Payroll', path: '/payroll' },
    { icon: Receipt, label: 'Advance', path: '/advance' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: Shield, label: 'Roles & Permissions', path: '/users' },
    { icon: History, label: 'Activity Log', path: '/activity-log' },
  ];

  return (
    <div className={`bg-white h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`} style={{ borderRight: '0.6px solid #D5D7DA' }}>
      {/* Logo Section */}
      <div className="px-6 h-[73px] flex items-center" style={{ borderBottom: '0.6px solid #D5D7DA' }}>
        <div className="flex items-center justify-between w-full gap-4">
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
            <img 
              src={logo} 
              alt="Santalam Tax Consultancy" 
              className={`${collapsed ? 'h-8' : 'h-10'}`} 
            />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
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
      <div className="p-4 space-y-1" style={{ borderTop: '0.6px solid #D5D7DA' }}>
        <Link to="/settings">
          <HrChip icon={Settings} collapsed={collapsed}>
            Settings
          </HrChip>
        </Link>
        <button onClick={handleLogout} className="w-full">
          <HrChip icon={LogOut} collapsed={collapsed} className="text-primary hover:bg-red-50">
            Log out
          </HrChip>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

