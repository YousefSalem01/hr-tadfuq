import { useMemo, ReactNode } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HrTable from '../../../uikit/HrTable/HrTable';
import { getStatusBadgeColor } from '../../../utils';
import { AttendanceRecord as MockAttendanceRecord } from '../../../data/mock';

// TODO: Switch to API type when backend ready
// import type { AttendanceRecord } from '../types';

interface AttendanceTableProps {
  records: MockAttendanceRecord[];
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
  // TODO: Update accessorKeys when switching to API types (employee_name, check_in, check_out)
  const columns = useMemo<ColumnDef<MockAttendanceRecord>[]>(
    () => [
      {
        accessorKey: 'employee',
        header: 'Employee',
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">{row.original.employee}</span>
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
        accessorKey: 'checkIn',
        header: 'Check In',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.checkIn || '-'}</span>
        ),
      },
      {
        accessorKey: 'checkOut',
        header: 'Check Out',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.checkOut || '-'}</span>
        ),
      },
      {
        accessorKey: 'hours',
        header: 'Hours',
        cell: ({ row }) => (
          <span className="text-sm font-medium text-gray-900">{row.original.hours}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {status}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <HrTable<MockAttendanceRecord>
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
