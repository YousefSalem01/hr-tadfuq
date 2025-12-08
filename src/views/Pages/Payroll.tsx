import { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  DollarSign,
  UserCheck,
  UserMinus,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import CreatePayrollModal from '../../components/CreatePayrollModal';
import { mockPayrollRecords, mockEmployees, PayrollRecord } from '../../data/mock';

const Payroll = () => {
  const [allPayrollRecords, setAllPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [employees] = useState(mockEmployees);
  const itemsPerPage = 10;

  useEffect(() => {
    // Filter payroll records based on search term and month
    let filtered = allPayrollRecords;

    if (searchTerm) {
      filtered = filtered.filter(record =>
        (record.employeeName || record.employee_name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter(record => record.month === selectedMonth);
    }

    // Pagination
    const totalPagesCalc = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPagesCalc);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPayrollRecords(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedMonth, currentPage, allPayrollRecords]);

  const handleCreatePayroll = (data: any) => {
    const employee = employees.find(emp => emp.name === data.employeeName);
    if (!employee) {
      alert('Employee not found');
      return;
    }

    const netPay = (data.basicSalary || 0) + (data.allowances || 0) - (data.deductions || 0);
    
    const newPayroll: PayrollRecord = {
      id: allPayrollRecords.length + 1,
      employeeName: data.employeeName,
      month: data.month,
      basicSalary: data.basicSalary,
      allowances: data.allowances || 0,
      deductions: data.deductions || 0,
      netPay: netPay,
      status: data.status || 'Active',
    };

    setAllPayrollRecords([...allPayrollRecords, newPayroll]);
    setIsModalOpen(false);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee payroll and salary processing</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} />
          Create Payroll
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Payroll */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">$21,750</div>
            <div className="text-sm text-gray-500">Total Payroll</div>
          </div>
        </div>

        {/* Processed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-sm text-gray-500">Processed</div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <UserMinus className="text-orange-600" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Users className="text-red-600" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-sm text-gray-500">Employees</div>
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
          <select 
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(i);
              const month = date.toLocaleString('default', { month: 'long' });
              const year = new Date().getFullYear();
              const monthValue = `${year}-${String(i + 1).padStart(2, '0')}`;
              return (
                <option key={monthValue} value={monthValue}>
                  {month} {year}
                </option>
              );
            })}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Employees</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Month</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Basic Salary</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Allowances</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Deductions</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Net Pay</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">Loading payroll records...</td>
                </tr>
              ) : payrollRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">No payroll records found</td>
                </tr>
              ) : (
                payrollRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {getInitials(record.employeeName || record.employee_name || '')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{record.employeeName || record.employee_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.month}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.basicSalary || record.basic_salary || 0)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.allowances)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.deductions)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(record.netPay || record.net_pay || 0)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`}></div>
                      <span className={`text-sm font-medium ${getStatusTextColor(record.status)}`}>
                        {record.status}
                      </span>
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

      {/* Create Payroll Modal */}
      <CreatePayrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePayroll}
      />
    </div>
  );
};

export default Payroll;

