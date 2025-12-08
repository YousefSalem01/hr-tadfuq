import { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  FileMinus,
  DollarSign,
  FileUp,
  FileDown,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AddAdvanceModal from '../uikit/AddAdvanceModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrCard from '../uikit/HrCard/HrCard';
import { mockAdvanceRecords, AdvanceRecord } from '../data/mock';

const Advance = () => {
  const [advanceRecords, setAdvanceRecords] = useState<AdvanceRecord[]>(mockAdvanceRecords);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(advanceRecords.length / itemsPerPage);

  const handleAddAdvance = (data: any) => {
    const newAdvance: AdvanceRecord = {
      id: advanceRecords.length + 1,
      employeeName: data.employeeName,
      amount: data.amount,
      monthlyDeduction: data.monthlyDeduction,
      remaining: data.amount,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'Pending',
    };
    setAdvanceRecords([...advanceRecords, newAdvance]);
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
      case 'Pending':
        return 'bg-orange-500';
      case 'Hold':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700';
      case 'Pending':
        return 'text-orange-700';
      case 'Hold':
        return 'text-gray-700';
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = advanceRecords.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advance</h1>
          <p className="text-sm text-gray-500 mt-1">Streamline employee salary advances and payments</p>
        </div>
        <HrButton 
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Add Advance
        </HrButton>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <HrCard
          title="Total Advances"
          value="14"
          icon={FileMinus}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Total Amount"
          value="$21,750"
          icon={DollarSign}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Monthly Deduction"
          value="$2,750"
          icon={FileUp}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Completed"
          value="8"
          icon={FileDown}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            <option>Completed</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Hold</option>
          </select>
          <HrButton variant="secondary" icon={Download}>
            Export Report
          </HrButton>
        </div>
      </div>

      {/* Advances Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Employees</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Monthly Deduction</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Remaining</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Start Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">End Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {getInitials(record.employeeName)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{record.employeeName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.amount)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.monthlyDeduction)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{formatCurrency(record.remaining)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.startDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.endDate}</div>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <HrButton
            variant="secondary"
            icon={ChevronLeft}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </HrButton>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <HrButton
                    key={page}
                    variant={currentPage === page ? 'primary' : 'ghost'}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </HrButton>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-500">...</span>;
              }
              return null;
            })}
          </div>
          <HrButton
            variant="secondary"
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </HrButton>
        </div>
      </div>

      {/* Add Advance Modal */}
      <AddAdvanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAdvance}
      />
    </div>
  );
};

export default Advance;

