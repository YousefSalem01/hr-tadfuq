import { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  FileMinus,
  DollarSign,
  FileUp,
  FileDown,
  Plus
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import AddAdvanceModal from '../uikit/AddAdvanceModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrCard from '../uikit/HrCard/HrCard';
import HrSelectMenu from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import HrInput from '../uikit/HrInput/HrInput';
import { mockAdvanceRecords, AdvanceRecord, advanceStatusOptions, SelectOption } from '../data/mock';
import { SingleValue } from 'react-select';
import { getStatusBadgeColor, formatStatus, formatCurrency } from '../utils';

const Advance = () => {
  const [allAdvanceRecords, setAllAdvanceRecords] = useState<AdvanceRecord[]>(mockAdvanceRecords);
  const [advanceRecords, setAdvanceRecords] = useState<AdvanceRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredRecordsCount, setFilteredRecordsCount] = useState(mockAdvanceRecords.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Filter advance records based on search term and status
    let filtered = allAdvanceRecords;

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(record => record.status === selectedStatus);
    }

    // Update filtered count
    setFilteredRecordsCount(filtered.length);
    
    // Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setAdvanceRecords(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedStatus, currentPage, allAdvanceRecords, pageSize]);

  const handleAddAdvance = (data: any) => {
    const newAdvance: AdvanceRecord = {
      id: allAdvanceRecords.length + 1,
      employeeName: data.employeeName,
      amount: data.amount,
      monthlyDeduction: data.monthlyDeduction,
      remaining: data.amount,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'Pending',
    };
    setAllAdvanceRecords([...allAdvanceRecords, newAdvance]);
    setIsModalOpen(false);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const columns = useMemo<ColumnDef<AdvanceRecord>[]>(
    () => [
      {
        accessorKey: 'employeeName',
        header: 'Employees',
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{formatCurrency(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'monthlyDeduction',
        header: 'Monthly Deduction',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{formatCurrency(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'remaining',
        header: 'Remaining',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{formatCurrency(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
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
          <div className="flex-1">
            <HrInput
              variant="text"
              name="advanceSearch"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm((e.target as HTMLInputElement).value);
                setCurrentPage(1);
              }}
              placeholder="Search employees..."
              icon={Search}
              iconPosition="left"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <HrSelectMenu
            name="statusFilter"
            placeholder="Select Status"
            options={[{ value: '', label: 'All Statuses' }, ...advanceStatusOptions]}
            value={advanceStatusOptions.find(option => option.value === selectedStatus) || null}
            onChange={(option) => {
              const selected = option as SingleValue<SelectOption>;
              setSelectedStatus(selected ? selected.value : '');
              setCurrentPage(1);
            }}
            isSearchable={false}
          />
          <HrButton variant="secondary" icon={Download}>
            Export Report
          </HrButton>
        </div>
      </div>

      {/* Advances Table */}
      <HrTable
        columns={columns}
        data={advanceRecords}
        isLoading={isLoading}
        emptyText="No advance records found"
        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredRecordsCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

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

