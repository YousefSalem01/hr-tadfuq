import { useState } from 'react';
import { useDashboard } from './hooks/useDashboard';
import WelcomeHeader from './components/WelcomeHeader';
import SummaryCards from './components/SummaryCards';
import DepartmentDistribution from './components/DepartmentDistribution';
import RecentActivitiesFeed from './components/RecentActivitiesFeed';
import EmployeesTable from './components/EmployeesTable';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, error } = useDashboard({
    page: currentPage,
    limit: pageSize,
    search: searchValue,
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset to first page on search
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <WelcomeHeader />

      {/* Summary Cards */}
      <SummaryCards summary={data?.summary || null} isLoading={isLoading} />

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DepartmentDistribution data={data?.department_distribution || null} />
        <RecentActivitiesFeed activities={data?.recent_activities || null} />
      </div>

      {/* Employees Table */}
      <EmployeesTable
        employees={data?.dashboardEmployee || []}
        isLoading={isLoading}
        currentPage={data?.pagination.current_page || 1}
        pageSize={data?.pagination.limit || 10}
        totalItems={data?.pagination.total_records || 0}
        totalPages={data?.pagination.total_pages || 1}
        hasNext={data?.pagination.has_next || false}
        hasPrevious={data?.pagination.has_previous || false}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default Dashboard;


