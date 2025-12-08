import { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AddEmployeeModal from '../../components/AddEmployeeModal';
import { mockEmployees, mockDepartments, Employee } from '../../data/mock';

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>(mockEmployees);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(mockEmployees.length);
  const [activeEmployees, setActiveEmployees] = useState(mockEmployees.filter(e => e.status === 'Active').length);
  const [onLeaveEmployees, setOnLeaveEmployees] = useState(mockEmployees.filter(e => e.status === 'On Leave').length);
  const [inactiveEmployees, setInactiveEmployees] = useState(mockEmployees.filter(e => e.status === 'Inactive').length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [departments] = useState(mockDepartments);
  const itemsPerPage = 10;

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

    if (selectedDepartment) {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }

    if (selectedStatus) {
      filtered = filtered.filter(emp => emp.status === selectedStatus);
    }

    // Update statistics
    setTotalEmployees(allEmployees.length);
    setActiveEmployees(allEmployees.filter(e => e.status === 'Active').length);
    setOnLeaveEmployees(allEmployees.filter(e => e.status === 'On Leave').length);
    setInactiveEmployees(allEmployees.filter(e => e.status === 'Inactive').length);

    // Pagination
    const totalPagesCalc = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPagesCalc);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setEmployees(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedDepartment, selectedStatus, currentPage, allEmployees]);

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

  const handleDeleteEmployee = (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    setAllEmployees(allEmployees.filter(emp => emp.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDepartmentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'On Leave':
        return 'bg-orange-500';
      case 'Inactive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700';
      case 'On Leave':
        return 'text-orange-700';
      case 'Inactive':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };


  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your workforce</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Upload size={16} />
            Import Data
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
          >
            <Plus size={16} />
            Add Employee
          </button>
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
          <select 
            value={selectedDepartment}
            onChange={handleDepartmentFilter}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          <select 
            value={selectedStatus}
            onChange={handleStatusFilter}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Employees
                    <HelpCircle size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Role
                    <HelpCircle size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Loading employees...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {getInitials(employee.name)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{employee.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{employee.role}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{employee.department}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{employee.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`}></div>
                      <span className={`text-sm font-medium ${getStatusTextColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-500">...</span>;
              }
              return null;
            })}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;

