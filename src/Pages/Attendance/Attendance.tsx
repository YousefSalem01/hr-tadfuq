import { Download, Upload } from 'lucide-react';
import { useAttendance } from './hooks/useAttendance';
import SummaryCards from './components/SummaryCards';
import WeeklyOverviewChart from './components/WeeklyOverviewChart';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilters from './components/AttendanceFilters';
import HrButton from '../../uikit/HrButton/HrButton';
import { mockAttendanceChartData } from '../../data/mock';
import type { AttendanceChartItem } from './types';

const Attendance = () => {
  const { attendance, pagination, filters, modals, actions } = useAttendance();

  // TODO: Replace with real chart data from API when backend ready
  const chartData: AttendanceChartItem[] = mockAttendanceChartData;

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
        selectedDate={filters.selectedDate || 'Today'}
        onDateClick={() => {
          // TODO: Open date picker or handle date selection
        }}
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
            onDepartmentFilter={filters.onDepartmentFilter}
            onStatusFilter={filters.onStatusFilter}
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
