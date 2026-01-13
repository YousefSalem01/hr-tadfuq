import { useCallback, useState } from 'react';
import type { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import type { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import type { Employee } from '../types';

export function useEmployeesPageState() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<AsyncSelectOption | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option<number> | null>(null);

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeModalMode, setEmployeeModalMode] = useState<'add' | 'edit'>('add');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const onSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const onDepartmentFilter = useCallback((option: AsyncSelectOption | null) => {
    setSelectedDepartment(option);
    setCurrentPage(1);
  }, []);

  const onStatusFilter = useCallback((option: Option<number> | readonly Option<number>[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option<number> | null);
    setSelectedStatus(next?.value ? next : null);
    setCurrentPage(1);
  }, []);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const openAddModal = useCallback(() => {
    setSelectedEmployee(null);
    setEmployeeModalMode('add');
    setIsEmployeeModalOpen(true);
  }, []);

  const openEditModal = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setEmployeeModalMode('edit');
    setIsEmployeeModalOpen(true);
  }, []);

  const closeEmployeeModal = useCallback(() => {
    setIsEmployeeModalOpen(false);
    setSelectedEmployee(null);
  }, []);

  const deleteClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  }, []);

  const openImportModal = useCallback(() => {
    setIsImportModalOpen(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsImportModalOpen(false);
  }, []);

  return {
    paginationState: {
      currentPage,
      pageSize,
      onPageChange,
      onPageSizeChange,
    },
    filtersState: {
      searchTerm,
      selectedDepartment,
      selectedStatus,
      onSearchChange,
      onDepartmentFilter,
      onStatusFilter,
    },
    modalsState: {
      employee: {
        isOpen: isEmployeeModalOpen,
        mode: employeeModalMode,
      },
      delete: {
        isOpen: isDeleteModalOpen,
      },
      import: {
        isOpen: isImportModalOpen,
      },
    },
    selectionState: {
      employee: selectedEmployee,
    },
    actions: {
      openAddModal,
      openEditModal,
      closeEmployeeModal,
      deleteClick,
      closeDeleteModal,
      openImportModal,
      closeImportModal,
    },
  };
}

