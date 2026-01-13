import { useCallback, useMemo } from 'react';
import { useAttendancePageState } from './useAttendancePageState';
import { useAttendanceQuery } from './useAttendanceQuery';
import { useAttendanceStatusesQuery } from './useAttendanceStatusesQuery';
import { useAttendanceMutations } from './useAttendanceMutations';
import { attendanceStatusFilterOptions } from '../../../data/mock';
import type { AttendanceRecord } from '../types';

/**
 * Facade hook for Attendance page.
 * Combines data fetching, mutations, and UI state.
 */
export function useAttendance() {
  const pageState = useAttendancePageState();
  const { pagination, filters, modals, selection, actions } = pageState;

  const attendanceQuery = useAttendanceQuery({
    page: pagination.currentPage,
    limit: pagination.pageSize,
    search: filters.searchTerm || undefined,
    department: filters.selectedDepartment?.value,
    status: filters.selectedStatus?.value,
    start: filters.startDate || undefined,
    end: filters.endDate || undefined,
  });

  // TODO: Enable when backend ready
  // const statusesQuery = useAttendanceStatusesQuery();
  void useAttendanceStatusesQuery; // Mark as intentionally unused for now

  const mutations = useAttendanceMutations();

  // --- Derived data from API ---
  const items: AttendanceRecord[] = attendanceQuery.data?.data?.items || [];
  const apiSummary = attendanceQuery.data?.data?.summary;
  const apiPagination = attendanceQuery.data?.data?.pagination;
  
  const stats = useMemo(() => ({
    total: apiSummary?.total_records || 0,
    present: apiSummary?.present_today || 0,
    late: apiSummary?.late_today || 0,
    remote: 0, // Not provided in API
    absent: apiSummary?.absent_today || 0,
  }), [apiSummary]);

  const filteredCount = apiPagination?.total_records || 0;
  const isLoading = attendanceQuery.isLoading;
  const error = attendanceQuery.error?.message || null;

  // TODO: Replace with statusesQuery.data when backend ready (use Option<number> then)
  const statusOptions = attendanceStatusFilterOptions;

  // --- Action handlers ---

  const handleSubmitRecord = useCallback(
    async (data: Record<string, any>) => {
      if (modals.record.mode === 'edit' && selection.record) {
        await mutations.updateMutation.mutateAsync({ id: selection.record.id, patch: data });
      } else {
        await mutations.createMutation.mutateAsync(data);
      }
      actions.closeModal();
    },
    [modals.record.mode, selection.record, mutations, actions]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!selection.record) return;
    await mutations.deleteMutation.mutateAsync(selection.record.id);
    actions.closeDeleteModal();
  }, [selection.record, mutations, actions]);

  const handleImport = useCallback(
    async (file: File) => {
      await mutations.importMutation.mutateAsync(file);
      actions.closeImportModal();
    },
    [mutations, actions]
  );

  const handleExport = useCallback(async () => {
    await mutations.exportMutation.mutateAsync();
  }, [mutations]);

  return {
    attendance: {
      items,
      stats,
      filteredCount,
      isLoading,
      error,
    },

    pagination: {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      totalPages: apiPagination?.total_pages || 1,
      hasNext: apiPagination?.has_next || false,
      hasPrevious: apiPagination?.has_previous || false,
      onPageChange: pagination.onPageChange,
      onPageSizeChange: pagination.onPageSizeChange,
    },

    filters: {
      searchTerm: filters.searchTerm,
      selectedDepartment: filters.selectedDepartment,
      selectedStatus: filters.selectedStatus,
      startDate: filters.startDate,
      endDate: filters.endDate,
      statusOptions,
      onSearchChange: filters.onSearchChange,
      onDepartmentFilter: filters.onDepartmentFilter,
      onStatusFilter: filters.onStatusFilter,
      onStartDateFilter: filters.onStartDateFilter,
      onEndDateFilter: filters.onEndDateFilter,
    },

    modals: {
      record: {
        isOpen: modals.record.isOpen,
        mode: modals.record.mode,
        isSubmitting: mutations.createMutation.isPending || mutations.updateMutation.isPending,
      },
      delete: {
        isOpen: modals.delete.isOpen,
      },
      import: {
        isOpen: modals.import.isOpen,
        isLoading: mutations.importMutation.isPending,
        error: mutations.importMutation.error?.message || null,
      },
      export: {
        isLoading: mutations.exportMutation.isPending,
      },
    },

    selection: {
      record: selection.record,
    },

    actions: {
      openAddModal: actions.openAddModal,
      openEditModal: actions.openEditModal,
      closeModal: actions.closeModal,
      openDeleteModal: actions.openDeleteModal,
      closeDeleteModal: actions.closeDeleteModal,
      openImportModal: actions.openImportModal,
      closeImportModal: actions.closeImportModal,
      submitRecord: handleSubmitRecord,
      deleteConfirm: handleDeleteConfirm,
      importRecords: handleImport,
      exportRecords: handleExport,
      refetch: attendanceQuery.refetch,
    },
  };
}
