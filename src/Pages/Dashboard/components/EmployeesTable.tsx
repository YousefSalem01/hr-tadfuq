import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HrTable from '../../../uikit/HrTable/HrTable';
import { HelpCircle } from 'lucide-react';
import type { DashboardEmployee } from '../types';

interface EmployeesTableProps {
  employees: DashboardEmployee[];
  isLoading?: boolean;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const EmployeesTable = ({
  employees,
  isLoading = false,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  searchValue,
  onSearchChange,
}: EmployeesTableProps) => {
  const columns = useMemo<ColumnDef<DashboardEmployee>[]>(() => {
    return [
      {
        accessorKey: 'full_name',
        header: () => (
          <div className="flex items-center gap-1">
            Employee
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-sm font-semibold text-gray-900">{row.original.full_name}</div>
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
        cell: ({ row }) => (
          <div className="text-sm text-gray-700">{row.original.role || 'N/A'}</div>
        ),
      },
    ];
  }, []);

  return (
    <HrTable<DashboardEmployee>
      title="Employees"
      columns={columns}
      data={employees}
      isLoading={isLoading}
      emptyText="No employees found"
      page={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSizeOptions={[5, 10, 20]}
      showControls={true}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search employees..."
    />
  );
};

export default EmployeesTable;


