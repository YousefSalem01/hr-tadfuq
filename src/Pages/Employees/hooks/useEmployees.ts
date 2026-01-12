import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import { endpoints } from '../../../config/endpoints';
import { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import type { Employee, EmployeesResponse, EmployeesData } from '../types';

interface StatusApiItem {
  id: number;
  name: string;
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Initial load: fetch employees and statuses in parallel
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [employeesRes, statusesRes] = await Promise.all([
          api.get<EmployeesResponse>(
            `${endpoints.employees.list}?page=${currentPage}&limit=${pageSize}`
          ),
          api.get<StatusApiItem[]>(endpoints.employees.statuses),
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
        `${endpoints.employees.list}?page=${currentPage}&limit=${pageSize}${searchParam}${departmentParam}${statusParam}`
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

  const handleAddEmployee = useCallback((_employeeData: any) => {
    // TODO: Implement add employee API call
    setIsModalOpen(false);
    fetchEmployees();
  }, [fetchEmployees]);

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

  const openAddModal = useCallback(() => setIsModalOpen(true), []);
  const closeAddModal = useCallback(() => setIsModalOpen(false), []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  }, []);

  return {
    // Data
    employees: data?.items || [],
    stats,
    filteredCount: data?.pagination.total_records || 0,
    isLoading,
    error,
    
    // Pagination
    currentPage: data?.pagination.current_page || 1,
    pageSize: data?.pagination.limit || 10,
    totalPages: data?.pagination.total_pages || 1,
    hasNext: data?.pagination.has_next || false,
    hasPrevious: data?.pagination.has_previous || false,
    handlePageChange,
    handlePageSizeChange,
    
    // Filters
    searchTerm,
    selectedDepartment,
    selectedStatus,
    statusOptions,
    handleSearchChange,
    handleDepartmentFilter,
    handleStatusFilter,
    
    // Modals
    isModalOpen,
    isDeleteModalOpen,
    selectedEmployee,
    openAddModal,
    closeAddModal,
    closeDeleteModal,
    
    // Actions
    handleAddEmployee,
    handleDeleteClick,
    handleDeleteConfirm,
    refetch: fetchEmployees,
  };
};
