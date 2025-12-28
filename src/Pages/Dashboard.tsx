import { useCallback, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HrCard from '../uikit/HrCard/HrCard';
import DepartmentChart from '../uikit/DepartmentChart';
import RecentActivities from '../uikit/RecentActivities';
import HrTable from '../uikit/HrTable/HrTable';
import { Users, UserCheck, Calendar, DollarSign, Edit, Trash2, HelpCircle } from 'lucide-react';
import { mockDashboardStats, mockEmployees, Employee } from '../data/mock';
import HrConfirmationModal from '../uikit/HrConfirmationModal/HrConfirmationModal';
import EditEmployeeDashboardModal from '../uikit/EditEmployeeDashboardModal';

const Dashboard = () => {
  const [stats] = useState(mockDashboardStats);
  const [isLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState<Employee[]>(mockEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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
    return allEmployees.slice(startIndex, endIndex);
  }, [allEmployees, currentPage, pageSize]);

  const handleDeleteClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!selectedEmployee) return;

    setAllEmployees((prev) => prev.filter((e) => e.id !== selectedEmployee.id));

    // If we deleted the last row on the current page, go back one page (when possible)
    setCurrentPage((prevPage) => {
      const nextTotal = allEmployees.length - 1;
      const lastValidPage = Math.max(1, Math.ceil(nextTotal / pageSize));
      return Math.min(prevPage, lastValidPage);
    });
  }, [allEmployees.length, pageSize, selectedEmployee]);

  const handleEditClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  }, []);

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
          <div className="text-sm font-semibold text-gray-900">{row.original.name}</div>
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
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
              aria-label="Edit employee"
              onClick={() => handleEditClick(row.original)}
            >
              <Edit size={16} />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"
              aria-label="Delete employee"
              onClick={() => handleDeleteClick(row.original)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ];
  }, [handleDeleteClick, handleEditClick]);

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
        totalItems={allEmployees.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        showControls={true}
      />

      <EditEmployeeDashboardModal
        isOpen={isEditModalOpen}
        employee={selectedEmployee}
        onSave={(employeeId, updates) => {
          setAllEmployees((prev) =>
            prev.map((e) => (e.id === employeeId ? { ...e, ...updates } : e))
          );
        }}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEmployee(null);
        }}
      />

      <HrConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete"
        itemName={selectedEmployee?.name}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;

