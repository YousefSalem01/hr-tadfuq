import { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HrCard from '../uikit/HrCard/HrCard';
import DepartmentChart from '../uikit/DepartmentChart';
import RecentActivities from '../uikit/RecentActivities';
import HrTable from '../uikit/HrTable/HrTable';
import { Users, UserCheck, Calendar, DollarSign, Edit, Trash2, HelpCircle } from 'lucide-react';
import { mockDashboardStats, mockEmployees, Employee } from '../data/mock';
import { getInitials } from '../utils';

const Dashboard = () => {
  const [stats] = useState(mockDashboardStats);
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get paginated employees for display
  const displayedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return mockEmployees.slice(startIndex, endIndex);
  }, [currentPage, pageSize]);

  const columns = useMemo<ColumnDef<Employee>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => (
          <div className="flex items-center gap-1">
            Employee
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {getInitials(row.original.name)}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{row.original.name}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: () => (
          <div className="flex items-center gap-1">
            Role
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.role}</div>,
      },
      {
        id: 'actions',
        header: () => <div className="w-full text-right">Actions</div>,
        cell: () => (
          <div className="flex items-center justify-end gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900">
              <Edit size={16} />
            </button>
            <button className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <HrCard
          title="Total Employees"
          value={isLoading ? '...' : stats.total_employees.toString()}
          change={5.2}
          icon={Users}
        />
        <HrCard
          title="Present Today"
          value={isLoading ? '...' : stats.present_today.toString()}
          change={2.1}
          icon={UserCheck}
        />
        <HrCard
          title="Pending Leaves"
          value={isLoading ? '...' : stats.pending_leaves.toString()}
          change={-12.5}
          icon={Calendar}
        />
        <HrCard
          title="Monthly Payroll"
          value={isLoading ? '...' : formatCurrency(stats.monthly_payroll)}
          change={8.3}
          icon={DollarSign}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DepartmentChart />
        <RecentActivities />
      </div>

      {/* Employees Table */}
      <HrTable<Employee>
        title="Employees"
        columns={columns}
        data={displayedEmployees}
        isLoading={isLoading}
        emptyText="No employees found"
        page={currentPage}
        pageSize={pageSize}
        totalItems={mockEmployees.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        showControls={true}
      />
    </div>
  );
};

export default Dashboard;

