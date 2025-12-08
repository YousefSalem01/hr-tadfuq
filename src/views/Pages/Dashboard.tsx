import { useState } from 'react';
import MetricCard from '../../components/MetricCard';
import DepartmentChart from '../../components/DepartmentChart';
import RecentActivities from '../../components/RecentActivities';
import EmployeesTable from '../../components/EmployeesTable';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';
import { mockDashboardStats } from '../../data/mock';

const Dashboard = () => {
  const [stats] = useState(mockDashboardStats);
  const [isLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Employees"
          value={isLoading ? '...' : stats.total_employees.toString()}
          change={5.2}
          icon={<Users className="text-gray-700" size={24} />}
        />
        <MetricCard
          title="Present Today"
          value={isLoading ? '...' : stats.present_today.toString()}
          change={2.1}
          icon={<UserCheck className="text-gray-700" size={24} />}
        />
        <MetricCard
          title="Pending Leaves"
          value={isLoading ? '...' : stats.pending_leaves.toString()}
          change={-12.5}
          icon={<Calendar className="text-gray-700" size={24} />}
        />
        <MetricCard
          title="Monthly Payroll"
          value={isLoading ? '...' : formatCurrency(stats.monthly_payroll)}
          change={8.3}
          icon={<DollarSign className="text-gray-700" size={24} />}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DepartmentChart />
        <RecentActivities />
      </div>

      {/* Employees Table */}
      <EmployeesTable />
    </div>
  );
};

export default Dashboard;

