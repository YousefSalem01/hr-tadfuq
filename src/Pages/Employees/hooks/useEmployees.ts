import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import { API_ENDPOINTS } from '../../../config/endpoints';
import { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { useAuthStore } from '../../../store/authStore';
import { toast } from 'react-hot-toast';
import type { Employee, EmployeesResponse, EmployeesData, EmployeeFormData } from '../types';

interface StatusApiItem {
  id: number;
  name: string;
}

function normalizePhoneNumber(input: string) {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return '';
  return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
}

export const useEmployees = () => {
  const [data, setData] = useState<EmployeesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<AsyncSelectOption | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option<number> | null>(null);
  const [statusOptions, setStatusOptions] = useState<Option<number>[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);
  const [submitEmployeeError, setSubmitEmployeeError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const userRole = useAuthStore((state) => state.user?.role);

  // Initial load: fetch employees and statuses in parallel
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [employeesRes, statusesRes] = await Promise.all([
          api.get<EmployeesResponse>(
            `${API_ENDPOINTS.EMPLOYEES.LIST}?page=${currentPage}&limit=${pageSize}`
          ),
          api.get<StatusApiItem[]>(API_ENDPOINTS.EMPLOYEES.STATUSES),
        ]);

        // Handle employees response
        if (employeesRes.success) {
          setData(employeesRes.data);
        } else {
          setError(employeesRes.message || 'Failed to fetch employees');
        }

        // Handle statuses response
        if (Array.isArray(statusesRes)) {
          const options: Option<number>[] = statusesRes.map((status) => ({
            value: status.id,
            label: status.name,
          }));
          setStatusOptions(options);
        }
      } catch (err: any) {
        console.error('Initial data fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch employees when filters/pagination change (skip initial load)
  const fetchEmployees = useCallback(async () => {
    if (isInitialLoad) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
      const departmentParam = selectedDepartment?.value ? `&department=${selectedDepartment.value}` : '';
      const statusParam = selectedStatus?.value ? `&status=${selectedStatus.value}` : '';
      
      const response = await api.get<EmployeesResponse>(
        `${API_ENDPOINTS.EMPLOYEES.LIST}?page=${currentPage}&limit=${pageSize}${searchParam}${departmentParam}${statusParam}`
      );

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch employees');
      }
    } catch (err: any) {
      console.error('Employees fetch error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, selectedDepartment, selectedStatus, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      fetchEmployees();
    }
  }, [fetchEmployees, isInitialLoad]);

  // Derived stats from API response
  const stats = {
    total: data?.summary.total_employees || 0,
    active: data?.summary.active_employees || 0,
    onLeave: data?.summary.on_leave_employees || 0,
    inactive: data?.summary.inactive_employees || 0,
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleDepartmentFilter = useCallback((option: AsyncSelectOption | null) => {
    setSelectedDepartment(option);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((option: Option<number> | readonly Option<number>[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option<number> | null);
    setSelectedStatus(next?.value ? next : null);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleSubmitEmployee = useCallback(
    async (employeeData: EmployeeFormData) => {
      setSubmitEmployeeError(null);
      setIsSubmittingEmployee(true);

      try {
        const payload = {
          full_name: employeeData.fullName,
          email: employeeData.email,
          role: employeeData.role,
          user_role: userRole,
          phone_number: normalizePhoneNumber(employeeData.phoneNumber),
          salary:
            employeeData.salary === '' || employeeData.salary === null || employeeData.salary === undefined
              ? undefined
              : Number(employeeData.salary),
          join_date: employeeData.joinDate,
          address: employeeData.address,
          emergency_contact: employeeData.emergencyContact,
          department: employeeData.department ?? null,
          branch: employeeData.branch ?? null,
        };

        const response =
          modalMode === 'edit' && employeeData.id
            ? await api.put<any>(API_ENDPOINTS.EMPLOYEES.DETAIL(employeeData.id), payload)
            : await api.post<any>(API_ENDPOINTS.EMPLOYEES.LIST, payload);

        if (response && typeof response === 'object' && 'success' in response && response.success === false) {
          throw new Error((response as any).message || 'Failed to save employee');
        }

        const successMessage = response.message;
        toast.success(successMessage);

        setIsModalOpen(false);
        setSelectedEmployee(null);
        fetchEmployees();
      } catch (err: any) {
        console.error('Employee submit error:', err);
        const msg = err.response?.data?.message || err.message || 'Failed to save employee';
        setSubmitEmployeeError(msg);
        toast.error(msg);
      } finally {
        setIsSubmittingEmployee(false);
      }
    },
    [fetchEmployees, modalMode, userRole]
  );

  const handleDeleteClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedEmployee) {
      // TODO: Implement delete employee API call
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
      fetchEmployees();
    }
  }, [selectedEmployee, fetchEmployees]);

  const openAddModal = useCallback(() => {
    setSelectedEmployee(null);
    setModalMode('add');
    setSubmitEmployeeError(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
    setSubmitEmployeeError(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setSubmitEmployeeError(null);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  }, []);

  const openImportModal = useCallback(() => {
    setImportError(null);
    setIsImportModalOpen(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsImportModalOpen(false);
    setImportError(null);
  }, []);

  const handleImportEmployees = useCallback(async (file: File) => {
    setIsImporting(true);
    setImportError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.postFormData(API_ENDPOINTS.EMPLOYEES.IMPORT, formData);
      setIsImportModalOpen(false);
      fetchEmployees();
    } catch (err: any) {
      console.error('Import error:', err);
      setImportError(err.response?.data?.message || err.message || 'Failed to import employees');
    } finally {
      setIsImporting(false);
    }
  }, [fetchEmployees]);

  return {
    employees: {
      items: data?.items || [],
      stats,
      filteredCount: data?.pagination.total_records || 0,
      isLoading,
      error,
    },

    pagination: {
      currentPage: data?.pagination.current_page || 1,
      pageSize: data?.pagination.limit || 10,
      totalPages: data?.pagination.total_pages || 1,
      hasNext: data?.pagination.has_next || false,
      hasPrevious: data?.pagination.has_previous || false,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    },

    filters: {
      searchTerm,
      selectedDepartment,
      selectedStatus,
      statusOptions,
      onSearchChange: handleSearchChange,
      onDepartmentFilter: handleDepartmentFilter,
      onStatusFilter: handleStatusFilter,
    },

    modals: {
      employee: {
        isOpen: isModalOpen,
        mode: modalMode,
        isSubmitting: isSubmittingEmployee,
        error: submitEmployeeError,
      },
      delete: {
        isOpen: isDeleteModalOpen,
      },
      import: {
        isOpen: isImportModalOpen,
        isLoading: isImporting,
        error: importError,
      },
    },

    selection: {
      employee: selectedEmployee,
    },

    actions: {
      openAddModal,
      openEditModal,
      closeEmployeeModal: closeModal,
      closeDeleteModal,
      openImportModal,
      closeImportModal,

      submitEmployee: handleSubmitEmployee,
      deleteClick: handleDeleteClick,
      deleteConfirm: handleDeleteConfirm,
      importEmployees: handleImportEmployees,
      refetch: fetchEmployees,
    },
  };
};
