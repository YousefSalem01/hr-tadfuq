import { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  DollarSign,
  UserCheck,
  UserMinus,
  Users,
  Plus
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import CreatePayrollModal from '../uikit/CreatePayrollModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrCard from '../uikit/HrCard/HrCard';
import HrSelectMenu from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import { mockPayrollRecords, mockEmployees, PayrollRecord, payrollMonthOptions, SelectOption } from '../data/mock';
import { SingleValue } from 'react-select';
import { getStatusBadgeColor, formatStatus, formatCurrency } from '../utils';

const Payroll = () => {
  const [allPayrollRecords, setAllPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredRecordsCount, setFilteredRecordsCount] = useState(mockPayrollRecords.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [employees] = useState(mockEmployees);

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

    // Update filtered count
    setFilteredRecordsCount(filtered.length);
    
    // Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPayrollRecords(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedMonth, currentPage, allPayrollRecords, pageSize]);

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

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const columns = useMemo<ColumnDef<PayrollRecord>[]>(
    () => [
      {
        accessorKey: 'employeeName',
        header: 'Employees',
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">{row.original.employeeName || row.original.employee_name}</span>
        ),
      },
      {
        accessorKey: 'month',
        header: 'Month',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'basicSalary',
        header: 'Basic Salary',
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{formatCurrency(row.original.basicSalary || row.original.basic_salary || 0)}</span>
        ),
      },
      {
        accessorKey: 'allowances',
        header: 'Allowances',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{formatCurrency(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'deductions',
        header: 'Deductions',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{formatCurrency(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'netPay',
        header: 'Net Pay',
        cell: ({ row }) => (
          <span className="text-sm font-semibold text-gray-900">{formatCurrency(row.original.netPay || row.original.net_pay || 0)}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {formatStatus(status)}
            </span>
          );
        },
      },
    ],
    []
  );


  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee payroll and salary processing</p>
        </div>
        <HrButton 
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Create Payroll
        </HrButton>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <HrCard
          title="Total Payroll"
          value="$21,750"
          icon={DollarSign}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <HrCard
          title="Processed"
          value="2"
          icon={UserCheck}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <HrCard
          title="Pending"
          value="1"
          icon={UserMinus}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <HrCard
          title="Employees"
          value="4"
          icon={Users}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
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
          <HrButton variant="icon" icon={Filter} />
          <HrSelectMenu
            name="monthFilter"
            placeholder="All Months"
            options={payrollMonthOptions}
            value={payrollMonthOptions.find(option => option.value === selectedMonth) || null}
            onChange={(option) => {
              const selected = option as SingleValue<SelectOption>;
              setSelectedMonth(selected ? selected.value : '');
              setCurrentPage(1);
            }}
            isSearchable={false}
          />
          <HrButton variant="secondary" icon={Download}>
            Export Report
          </HrButton>
        </div>
      </div>

      {/* Payroll Table */}
      <HrTable
        columns={columns}
        data={payrollRecords}
        isLoading={isLoading}
        emptyText="No payroll records found"
        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredRecordsCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

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

