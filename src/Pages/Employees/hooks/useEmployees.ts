import { useState, useEffect, useCallback, useMemo } from 'react';
import { mockEmployees, Employee } from '../../../data/mock';
import { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';

export const useEmployees = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>(mockEmployees);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredCount, setFilteredCount] = useState(mockEmployees.length);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Statistics
  const stats = useMemo(() => ({
    total: allEmployees.length,
    active: allEmployees.filter(e => e.status === 'Active').length,
    onLeave: allEmployees.filter(e => e.status === 'On Leave').length,
    inactive: allEmployees.filter(e => e.status === 'Inactive').length,
  }), [allEmployees]);

  // Filter and paginate employees
  useEffect(() => {
    let filtered = allEmployees;

    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment?.value) {
      filtered = filtered.filter(emp => emp.department === selectedDepartment.value);
    }

    if (selectedStatus?.value) {
      filtered = filtered.filter(emp => emp.status === selectedStatus.value);
    }

    setFilteredCount(filtered.length);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setEmployees(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedDepartment, selectedStatus, currentPage, allEmployees, pageSize]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleDepartmentFilter = useCallback((option: Option | readonly Option[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option | null);
    setSelectedDepartment(next?.value ? next : null);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((option: Option | readonly Option[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option | null);
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

  const handleAddEmployee = useCallback((employeeData: any) => {
    const newEmployee: Employee = {
      id: allEmployees.length + 1,
      name: employeeData.fullName || employeeData.name,
      email: employeeData.email,
      role: employeeData.role,
      department: employeeData.department,
      phone_country: employeeData.phoneCountry,
      phone_number: employeeData.phoneNumber,
      address: employeeData.address,
      emergency_contact: employeeData.emergencyContact,
      salary: employeeData.salary,
      salary_currency: employeeData.salaryCurrency,
      branch: employeeData.branch,
      join_date: employeeData.joinDate,
      status: employeeData.status || 'Active',
    };
    setAllEmployees(prev => [...prev, newEmployee]);
    setIsModalOpen(false);
  }, [allEmployees.length]);

  const handleDeleteClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedEmployee) {
      setAllEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id));
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    }
  }, [selectedEmployee]);

  const openAddModal = useCallback(() => setIsModalOpen(true), []);
  const closeAddModal = useCallback(() => setIsModalOpen(false), []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  }, []);

  return {
    // Data
    employees,
    stats,
    filteredCount,
    isLoading,
    
    // Pagination
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    
    // Filters
    searchTerm,
    selectedDepartment,
    selectedStatus,
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
  };
};
