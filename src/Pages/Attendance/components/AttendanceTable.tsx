import { useMemo, ReactNode } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HrTable from '../../../uikit/HrTable/HrTable';
import { getStatusBadgeColor } from '../../../utils';
import type { AttendanceRecord } from '../types';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  isLoading: boolean;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  rightActions?: ReactNode;
}

const AttendanceTable = ({
  records,
  isLoading,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  searchValue,
  onSearchChange,
  rightActions,
}: AttendanceTableProps) => {
  const columns = useMemo<ColumnDef<AttendanceRecord>[]>(
    () => [
      {
        accessorKey: 'employee_name',
        header: 'Employee',
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">{row.original.employee_name}</span>
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.department}</span>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.date}</span>
        ),
      },
      {
        accessorKey: 'check_in',
        header: 'Check In',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.check_in || '-'}</span>
        ),
      },
      {
        accessorKey: 'check_out',
        header: 'Check Out',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.check_out || '-'}</span>
        ),
      },
      {
        accessorKey: 'hours_worked',
        header: 'Hours',
        cell: ({ row }) => (
          <span className="text-sm font-medium text-gray-900">{row.original.hours_worked}</span>
        ),
      },
      {
        accessorKey: 'status_display',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const statusDisplay = row.original.status_display;
          return (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {statusDisplay}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <HrTable<AttendanceRecord>
      columns={columns}
      data={records}
      isLoading={isLoading}
      emptyText="No attendance records found"
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

export default AttendanceTable;
