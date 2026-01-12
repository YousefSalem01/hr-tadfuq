import { useMemo, ReactNode } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, Trash2, Edit, HelpCircle } from 'lucide-react';
import HrTable from '../../../uikit/HrTable/HrTable';
import HrButton from '../../../uikit/HrButton/HrButton';
import type { Employee } from '../types';
import { getStatusBadgeColor } from '../../../utils';

interface EmployeesTableProps {
  employees: Employee[];
  isLoading: boolean;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDeleteClick: (employee: Employee) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  rightActions?: ReactNode;
}

const EmployeesTable = ({
  employees,
  isLoading,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onDeleteClick,
  searchValue,
  onSearchChange,
  rightActions,
}: EmployeesTableProps) => {
  const columns = useMemo<ColumnDef<Employee>[]>(() => {
    return [
      {
        accessorKey: 'employee_name',
        header: () => (
          <div className="flex items-center gap-1">
            Employees
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-sm font-semibold text-gray-900">{row.original.employee_name}</div>
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
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.role || 'N/A'}</div>,
      },
      {
        accessorKey: 'department_detail',
        header: 'Department',
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.department_detail?.name || 'N/A'}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.email}</div>,
      },
      {
        accessorKey: 'status',
        header: () => (
          <div className="flex items-center gap-1">
            Status
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(row.original.status)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {row.original.status}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="w-full text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <HrButton variant="icon" icon={Edit} />
            <HrButton
              variant="icon"
              icon={Trash2}
              onClick={() => onDeleteClick(row.original)}
              className="hover:bg-red-50 hover:text-red-600"
            />
          </div>
        ),
      },
    ];
  }, [onDeleteClick]);

  return (
    <HrTable<Employee>
      columns={columns}
      data={employees}
      isLoading={isLoading}
      emptyText="No employees found"
      page={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search employees..."
      rightActions={rightActions}
    />
  );
};

export default EmployeesTable;
