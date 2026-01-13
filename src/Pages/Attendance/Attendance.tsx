import { Download, Upload } from 'lucide-react';
import { useMemo } from 'react';
import { useAttendance } from './hooks/useAttendance';
import SummaryCards from './components/SummaryCards';
import WeeklyOverviewChart from './components/WeeklyOverviewChart';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilters from './components/AttendanceFilters';
import HrButton from '../../uikit/HrButton/HrButton';
import type { AttendanceChartItem } from './types';

const Attendance = () => {
  const { attendance, pagination, filters, modals, actions } = useAttendance();

  // Calculate chart data from API summary
  const chartData: AttendanceChartItem[] = useMemo(() => {
    const stats = attendance.stats;
    return [
      { name: 'Present', value: stats.present, color: '#10B981' },
      { name: 'Late', value: stats.late, color: '#F59E0B' },
      { name: 'Absent', value: stats.absent, color: '#DC2626' },
    ].filter(item => item.value > 0); // Only show non-zero values
  }, [attendance.stats]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage employee attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <HrButton
            variant="secondary"
            icon={Download}
            onClick={actions.exportRecords}
            disabled={modals.export.isLoading}
          >
            {modals.export.isLoading ? 'Exporting...' : 'Export Report'}
          </HrButton>
          <HrButton variant="secondary" icon={Upload} onClick={actions.openImportModal}>
            Import Data
          </HrButton>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards stats={attendance.stats} />

      {/* Weekly Overview Chart */}
      <WeeklyOverviewChart
        data={chartData}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />

      {/* Attendance Table with Filters */}
      <AttendanceTable
        records={attendance.items}
        isLoading={attendance.isLoading}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalItems={attendance.filteredCount}
        onPageChange={pagination.onPageChange}
        onPageSizeChange={pagination.onPageSizeChange}
        searchValue={filters.searchTerm}
        onSearchChange={filters.onSearchChange}
        rightActions={
          <AttendanceFilters
            selectedDepartment={filters.selectedDepartment}
            selectedStatus={filters.selectedStatus}
            statusOptions={filters.statusOptions}
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDepartmentFilter={filters.onDepartmentFilter}
            onStatusFilter={filters.onStatusFilter}
            onStartDateFilter={filters.onStartDateFilter}
            onEndDateFilter={filters.onEndDateFilter}
          />
        }
      />

      {/* TODO: Add modals when backend ready */}
      {/* <AttendanceModal ... /> */}
      {/* <HrConfirmationModal ... /> */}
      {/* <ImportAttendanceModal ... /> */}
    </div>
  );
};

export default Attendance;
