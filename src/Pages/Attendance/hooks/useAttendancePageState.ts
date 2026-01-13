import { useState, useCallback } from 'react';
import { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { AttendanceRecord as MockAttendanceRecord } from '../../../data/mock';

// TODO: Switch to API type when backend ready
// import type { AttendanceRecord } from '../types';

/**
 * UI-only state for Attendance page (filters, modals, selection)
 */
export function useAttendancePageState() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<AsyncSelectOption | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option<string> | null>(null);
  const [startDate, setStartDate] = useState<string>(''); // e.g. '2026-01-01'
  const [endDate, setEndDate] = useState<string>(''); // e.g. '2026-01-31'

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Selection
  const [selectedRecord, setSelectedRecord] = useState<MockAttendanceRecord | null>(null);

  // --- Handlers ---

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleDepartmentFilter = useCallback((option: AsyncSelectOption | null) => {
    setSelectedDepartment(option);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((option: Option<string> | readonly Option<string>[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option<string> | null);
    setSelectedStatus(next?.value ? next : null);
    setCurrentPage(1);
  }, []);

  const handleStartDateFilter = useCallback((date: string) => {
    setStartDate(date);
    setCurrentPage(1);
  }, []);

  const handleEndDateFilter = useCallback((date: string) => {
    setEndDate(date);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // Modal actions
  const openAddModal = useCallback(() => {
    setSelectedRecord(null);
    setModalMode('add');
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((record: MockAttendanceRecord) => {
    setSelectedRecord(record);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  }, []);

  const openDeleteModal = useCallback((record: MockAttendanceRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  }, []);

  const openImportModal = useCallback(() => {
    setIsImportModalOpen(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsImportModalOpen(false);
  }, []);

  return {
    pagination: {
      currentPage,
      pageSize,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    },
    filters: {
      searchTerm,
      selectedDepartment,
      selectedStatus,
      startDate,
      endDate,
      onSearchChange: handleSearchChange,
      onDepartmentFilter: handleDepartmentFilter,
      onStatusFilter: handleStatusFilter,
      onStartDateFilter: handleStartDateFilter,
      onEndDateFilter: handleEndDateFilter,
    },
    modals: {
      record: {
        isOpen: isModalOpen,
        mode: modalMode,
      },
      delete: {
        isOpen: isDeleteModalOpen,
      },
      import: {
        isOpen: isImportModalOpen,
      },
    },
    selection: {
      record: selectedRecord,
    },
    actions: {
      openAddModal,
      openEditModal,
      closeModal,
      openDeleteModal,
      closeDeleteModal,
      openImportModal,
      closeImportModal,
    },
  };
}
