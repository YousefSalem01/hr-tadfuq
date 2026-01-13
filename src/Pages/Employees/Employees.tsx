import { Download, Upload, Plus } from 'lucide-react';
import { useEmployees } from './hooks/useEmployees';
import SummaryCards from './components/SummaryCards';
import EmployeesFilters from './components/EmployeesFilters';
import EmployeesTable from './components/EmployeesTable';
import HrButton from '../../uikit/HrButton/HrButton';
import EmployeeModal from './components/EmployeeModal';
import HrConfirmationModal from '../../uikit/HrConfirmationModal/HrConfirmationModal';
import ImportEmployeesModal from './components/ImportEmployeesModal';

const Employees = () => {
  const { employees, pagination, filters, modals, selection, actions } = useEmployees();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your workforce</p>
        </div>
        <div className="flex items-center gap-3">
          <HrButton 
            variant="secondary" 
            icon={Download}
            onClick={actions.exportEmployees}
            disabled={modals.export.isLoading}
          >
            {modals.export.isLoading ? 'Exporting...' : 'Export Report'}
          </HrButton>
          <HrButton variant="secondary" icon={Upload} onClick={actions.openImportModal}>
            Import Data
          </HrButton>
          <HrButton variant="primary" icon={Plus} onClick={actions.openAddModal}>
            Add Employee
          </HrButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <SummaryCards stats={employees.stats} />

      {/* Employees Table with Filters */}
      <EmployeesTable
        employees={employees.items}
        isLoading={employees.isLoading}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalItems={employees.filteredCount}
        onPageChange={pagination.onPageChange}
        onPageSizeChange={pagination.onPageSizeChange}
        onEditClick={actions.openEditModal}
        onDeleteClick={actions.deleteClick}
        searchValue={filters.searchTerm}
        onSearchChange={filters.onSearchChange}
        rightActions={
          <EmployeesFilters
            selectedDepartment={filters.selectedDepartment}
            selectedStatus={filters.selectedStatus}
            statusOptions={filters.statusOptions}
            onDepartmentFilter={filters.onDepartmentFilter}
            onStatusFilter={filters.onStatusFilter}
          />
        }
      />

      {/* Employee Modal (Add/Edit) */}
      <EmployeeModal
        isOpen={modals.employee.isOpen}
        onClose={actions.closeEmployeeModal}
        onSubmit={actions.submitEmployee}
        employee={selection.employee}
        mode={modals.employee.mode}
        isSubmitting={modals.employee.isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <HrConfirmationModal
        isOpen={modals.delete.isOpen}
        onClose={actions.closeDeleteModal}
        onConfirm={actions.deleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete"
        itemName={selection.employee?.employee_name}
        confirmText="Delete"
        type="danger"
      />

      {/* Import Employees Modal */}
      <ImportEmployeesModal
        isOpen={modals.import.isOpen}
        onClose={actions.closeImportModal}
        onImport={actions.importEmployees}
        isLoading={modals.import.isLoading}
        error={modals.import.error}
      />
    </div>
  );
};

export default Employees;
