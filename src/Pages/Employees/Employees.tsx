import { Download, Upload, Plus } from 'lucide-react';
import { useEmployees } from './hooks/useEmployees';
import SummaryCards from './components/SummaryCards';
import EmployeesFilters from './components/EmployeesFilters';
import EmployeesTable from './components/EmployeesTable';
import HrButton from '../../uikit/HrButton/HrButton';
import EmployeeModal from '../../uikit/EmployeeModal';
import HrConfirmationModal from '../../uikit/HrConfirmationModal/HrConfirmationModal';
import ImportEmployeesModal from './components/ImportEmployeesModal';

const Employees = () => {
  const {
    employees,
    stats,
    filteredCount,
    isLoading,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    searchTerm,
    selectedDepartment,
    selectedStatus,
    statusOptions,
    handleSearchChange,
    handleDepartmentFilter,
    handleStatusFilter,
    isModalOpen,
    modalMode,
    isDeleteModalOpen,
    isImportModalOpen,
    isImporting,
    importError,
    selectedEmployee,
    openAddModal,
    openEditModal,
    closeModal,
    closeDeleteModal,
    openImportModal,
    closeImportModal,
    handleImportEmployees,
    handleSubmitEmployee,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useEmployees();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your workforce</p>
        </div>
        <div className="flex items-center gap-3">
          <HrButton variant="secondary" icon={Download}>
            Export Report
          </HrButton>
          <HrButton variant="secondary" icon={Upload} onClick={openImportModal}>
            Import Data
          </HrButton>
          <HrButton variant="primary" icon={Plus} onClick={openAddModal}>
            Add Employee
          </HrButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <SummaryCards stats={stats} />

      {/* Employees Table with Filters */}
      <EmployeesTable
        employees={employees}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onEditClick={openEditModal}
        onDeleteClick={handleDeleteClick}
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        rightActions={
          <EmployeesFilters
            selectedDepartment={selectedDepartment}
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
            onDepartmentFilter={handleDepartmentFilter}
            onStatusFilter={handleStatusFilter}
          />
        }
      />

      {/* Employee Modal (Add/Edit) */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitEmployee}
        employee={selectedEmployee}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <HrConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete"
        itemName={selectedEmployee?.employee_name}
        confirmText="Delete"
        type="danger"
      />

      {/* Import Employees Modal */}
      <ImportEmployeesModal
        isOpen={isImportModalOpen}
        onClose={closeImportModal}
        onImport={handleImportEmployees}
        isLoading={isImporting}
        error={importError}
      />
    </div>
  );
};

export default Employees;
