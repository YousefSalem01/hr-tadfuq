import { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Download, 
  Upload, 
  Plus, 
  Search,
  Filter, 
  ChevronDown, 
  Users, 
  UserCheck, 
  Calendar, 
  UserX,
  Trash2,
  Edit,
  HelpCircle,
} from 'lucide-react';
import AddEmployeeModal from '../uikit/AddEmployeeModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrConfirmationModal from '../uikit/HrConfirmationModal/HrConfirmationModal';
import HrSelectMenu, { Option } from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import HrInput from '../uikit/HrInput/HrInput';
import { mockEmployees, Employee, departmentOptions, statusOptions } from '../data/mock';
import { getInitials, getStatusBadgeColor } from '../utils';

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>(mockEmployees);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmployeesCount, setFilteredEmployeesCount] = useState(mockEmployees.length);
  const [totalEmployees, setTotalEmployees] = useState(mockEmployees.length);
  const [activeEmployees, setActiveEmployees] = useState(mockEmployees.filter(e => e.status === 'Active').length);
  const [onLeaveEmployees, setOnLeaveEmployees] = useState(mockEmployees.filter(e => e.status === 'On Leave').length);
  const [inactiveEmployees, setInactiveEmployees] = useState(mockEmployees.filter(e => e.status === 'Inactive').length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Filter employees based on search term, department, and status
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

    // Update statistics
    setTotalEmployees(allEmployees.length);
    setActiveEmployees(allEmployees.filter(e => e.status === 'Active').length);
    setOnLeaveEmployees(allEmployees.filter(e => e.status === 'On Leave').length);
    setInactiveEmployees(allEmployees.filter(e => e.status === 'Inactive').length);

    // Pagination (mock backend for now)
    setFilteredEmployeesCount(filtered.length);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setEmployees(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedDepartment, selectedStatus, currentPage, allEmployees, pageSize]);

  const handleAddEmployee = (employeeData: any) => {
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
    setAllEmployees([...allEmployees, newEmployee]);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      setAllEmployees(allEmployees.filter(emp => emp.id !== selectedEmployee.id));
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDepartmentFilter = (option: Option | readonly Option[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option | null);
    setSelectedDepartment(next?.value ? next : null);
    setCurrentPage(1);
  };

  const handleStatusFilter = (option: Option | readonly Option[] | null) => {
    const next = Array.isArray(option) ? null : (option as Option | null);
    setSelectedStatus(next?.value ? next : null);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const columns = useMemo<ColumnDef<Employee>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => (
          <div className="flex items-center gap-1">
            Employees
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {getInitials(row.original.name)}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{row.original.name}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: () => (
          <div className="flex items-center gap-1">
            Role
            <HelpCircle size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.role}</div>,
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.department}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.email}</div>,
      },
      {
        accessorKey: 'status',
        header: () => (
          <div className="flex items-center gap-1">
            Status
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        ),
        cell: ({ row }) => (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(row.original.status)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {row.original.status}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="w-full text-right" />,
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <HrButton variant="icon" icon={Edit} />
            <HrButton
              variant="icon"
              icon={Trash2}
              onClick={() => handleDeleteClick(row.original)}
              className="hover:bg-red-50 hover:text-red-600"
            />
          </div>
        ),
      },
    ];
  }, []);


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
          <HrButton variant="secondary" icon={Upload}>
            Import Data
          </HrButton>
          <HrButton variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Employee
          </HrButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Users className="text-gray-700" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalEmployees}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <UserCheck className="text-gray-700" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{activeEmployees}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-gray-700" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{onLeaveEmployees}</div>
            <div className="text-sm text-gray-500">On Leave</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <UserX className="text-gray-700" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{inactiveEmployees}</div>
            <div className="text-sm text-gray-500">Inactive</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <HrInput
              variant="text"
              name="employeeSearch"
              value={searchTerm}
              onChange={(e) => handleSearchChange((e.target as HTMLInputElement).value)}
              placeholder="Search employees..."
              icon={Search}
              iconPosition="left"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <div className="w-48">
            <HrSelectMenu
              name="department"
              placeholder="All Departments"
              options={[{ value: '', label: 'All Departments' }, ...departmentOptions]}
            value={selectedDepartment}
            onChange={handleDepartmentFilter}
              isSearchable={false}
            />
          </div>
          <div className="w-40">
            <HrSelectMenu
              name="status"
              placeholder="All Statuses"
              options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
            value={selectedStatus}
            onChange={handleStatusFilter}
              isSearchable={false}
            />
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <HrTable<Employee>
        columns={columns}
        data={employees}
        isLoading={isLoading}
        emptyText="No employees found"
        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredEmployeesCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEmployee}
      />

      {/* Delete Confirmation Modal */}
      <HrConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete"
        itemName={selectedEmployee?.name}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Employees;

