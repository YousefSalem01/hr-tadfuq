import { useCallback } from 'react';
import { useAttendancePageState } from './useAttendancePageState';
import { useAttendanceQuery } from './useAttendanceQuery';
import { useAttendanceStatusesQuery } from './useAttendanceStatusesQuery';
import { useAttendanceMutations } from './useAttendanceMutations';
import {
  mockAttendanceRecords,
  mockAttendanceStats,
  attendanceStatusFilterOptions,
  AttendanceRecord as MockAttendanceRecord,
} from '../../../data/mock';

/**
 * Facade hook for Attendance page.
 * Combines data fetching, mutations, and UI state.
 * Currently uses mock data; switch to real queries when backend ready.
 */
export function useAttendance() {
  const pageState = useAttendancePageState();
  const { pagination, filters, modals, selection, actions } = pageState;

  // TODO: Enable when backend ready
  const attendanceQuery = useAttendanceQuery({
    page: pagination.currentPage,
    limit: pagination.pageSize,
    search: filters.searchTerm || undefined,
    department: filters.selectedDepartment?.value,
    status: filters.selectedStatus?.value,
    date: filters.selectedDate || undefined,
  });

  // TODO: Enable when backend ready
  // const statusesQuery = useAttendanceStatusesQuery();
  void useAttendanceStatusesQuery; // Mark as intentionally unused for now

  const mutations = useAttendanceMutations();

  // --- Derived data (using mock for now) ---
  // TODO: Replace with attendanceQuery.data when backend ready
  const items: MockAttendanceRecord[] = mockAttendanceRecords;
  const stats = mockAttendanceStats;
  const filteredCount = items.length;
  const isLoading = attendanceQuery.isLoading;
  const error = attendanceQuery.error?.message || null;

  // TODO: Replace with statusesQuery.data when backend ready (use Option<number> then)
  const statusOptions = attendanceStatusFilterOptions;

  // --- Action handlers ---

  const handleSubmitRecord = useCallback(
    async (data: Record<string, any>) => {
      // TODO: Implement when backend ready
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
    // TODO: Implement when backend ready
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
      // TODO: Replace with data from API pagination when backend ready
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
      onPageChange: pagination.onPageChange,
      onPageSizeChange: pagination.onPageSizeChange,
    },

    filters: {
      searchTerm: filters.searchTerm,
      selectedDepartment: filters.selectedDepartment,
      selectedStatus: filters.selectedStatus,
      selectedDate: filters.selectedDate,
      statusOptions,
      onSearchChange: filters.onSearchChange,
      onDepartmentFilter: filters.onDepartmentFilter,
      onStatusFilter: filters.onStatusFilter,
      onDateFilter: filters.onDateFilter,
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
