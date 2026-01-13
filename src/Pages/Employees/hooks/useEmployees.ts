import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../../store/authStore';
import type { EmployeeFormData } from '../types';
import { useEmployeesPageState } from './useEmployeesPageState';
import { useEmployeesQuery } from './useEmployeesQuery';
import { useEmployeeStatusesQuery } from './useEmployeeStatusesQuery';
import { useEmployeeMutations } from './useEmployeeMutations';
import { mapApiErrorsToForm, toCreatePayload, toUpdatePatch } from '../utils/employeeMappers';

export const useEmployees = () => {
  const userRole = useAuthStore((state) => state.user?.role);

  const pageState = useEmployeesPageState();
  const { createMutation, updateMutation, deleteMutation, importMutation, exportMutation } = useEmployeeMutations();

  const employeesQuery = useEmployeesQuery({
    page: pageState.paginationState.currentPage,
    limit: pageState.paginationState.pageSize,
    search: pageState.filtersState.searchTerm || undefined,
    department: pageState.filtersState.selectedDepartment?.value || undefined,
    status: pageState.filtersState.selectedStatus?.value || undefined,
  });

  const statusesQuery = useEmployeeStatusesQuery();

  const data = employeesQuery.data;
  const isLoading = employeesQuery.isLoading || employeesQuery.isFetching;
  const error = (employeesQuery.error as any)?.message || null;

  // Derived stats from API response
  const stats = {
    total: data?.summary.total_employees || 0,
    active: data?.summary.active_employees || 0,
    onLeave: data?.summary.on_leave_employees || 0,
    inactive: data?.summary.inactive_employees || 0,
  };

  const submitEmployee = useCallback(
    async (employeeData: EmployeeFormData, setFormError?: (field: string, message: string) => void) => {
      try {
        if (pageState.modalsState.employee.mode === 'edit' && employeeData.id && pageState.selectionState.employee) {
          const selectedEmployee = pageState.selectionState.employee;
          const changes = toUpdatePatch(employeeData, selectedEmployee);

          if (Object.keys(changes).length === 0) {
            toast('No changes detected');
            pageState.actions.closeEmployeeModal();
            return;
          }

          await updateMutation.mutateAsync({ id: employeeData.id, patch: changes });
          pageState.actions.closeEmployeeModal();
          return;
        }

        await createMutation.mutateAsync(toCreatePayload(employeeData, userRole));
        pageState.actions.closeEmployeeModal();
      } catch (err: any) {
        mapApiErrorsToForm(err, setFormError);
      }
    },
    [createMutation, updateMutation, pageState, userRole]
  );

  const deleteConfirm = useCallback(async () => {
    const selectedEmployee = pageState.selectionState.employee;
    if (!selectedEmployee) return;
    await deleteMutation.mutateAsync(selectedEmployee.id);
    pageState.actions.closeDeleteModal();
  }, [deleteMutation, pageState]);

  const importEmployees = useCallback(
    async (file: File) => {
      await importMutation.mutateAsync(file);
      pageState.actions.closeImportModal();
    },
    [importMutation, pageState]
  );

  const exportEmployeesAction = useCallback(async () => {
    await exportMutation.mutateAsync();
  }, [exportMutation]);

  return {
    employees: {
      items: data?.items || [],
      stats,
      filteredCount: data?.pagination.total_records || 0,
      isLoading,
      error,
    },

    pagination: {
      currentPage: pageState.paginationState.currentPage,
      pageSize: pageState.paginationState.pageSize,
      totalPages: data?.pagination.total_pages || 1,
      hasNext: data?.pagination.has_next || false,
      hasPrevious: data?.pagination.has_previous || false,
      onPageChange: pageState.paginationState.onPageChange,
      onPageSizeChange: pageState.paginationState.onPageSizeChange,
    },

    filters: {
      searchTerm: pageState.filtersState.searchTerm,
      selectedDepartment: pageState.filtersState.selectedDepartment,
      selectedStatus: pageState.filtersState.selectedStatus,
      statusOptions: statusesQuery.data || [],
      onSearchChange: pageState.filtersState.onSearchChange,
      onDepartmentFilter: pageState.filtersState.onDepartmentFilter,
      onStatusFilter: pageState.filtersState.onStatusFilter,
    },

    modals: {
      employee: {
        isOpen: pageState.modalsState.employee.isOpen,
        mode: pageState.modalsState.employee.mode,
        isSubmitting:
          pageState.modalsState.employee.mode === 'edit' ? updateMutation.isPending : createMutation.isPending,
        error: null,
      },
      delete: {
        isOpen: pageState.modalsState.delete.isOpen,
      },
      import: {
        isOpen: pageState.modalsState.import.isOpen,
        isLoading: importMutation.isPending,
        error: (importMutation.error as any)?.response?.data?.message || (importMutation.error as any)?.message || null,
      },
      export: {
        isLoading: exportMutation.isPending,
      },
    },

    selection: {
      employee: pageState.selectionState.employee,
    },

    actions: {
      openAddModal: pageState.actions.openAddModal,
      openEditModal: pageState.actions.openEditModal,
      closeEmployeeModal: pageState.actions.closeEmployeeModal,
      closeDeleteModal: pageState.actions.closeDeleteModal,
      openImportModal: pageState.actions.openImportModal,
      closeImportModal: pageState.actions.closeImportModal,

      submitEmployee,
      deleteClick: pageState.actions.deleteClick,
      deleteConfirm,
      importEmployees,
      exportEmployees: exportEmployeesAction,
      refetch: employeesQuery.refetch,
    },
  };
};
