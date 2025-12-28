import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Edit
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import LeaveRequestModal from '../uikit/LeaveRequestModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrCard from '../uikit/HrCard/HrCard';
import HrConfirmationModal from '../uikit/HrConfirmationModal/HrConfirmationModal';
import HrSelectMenu from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import { mockLeaves, Leave, leaveTypeOptions } from '../data/mock';
import { getStatusBadgeColor, formatStatus } from '../utils';

const Leaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSubmitLeaveRequest = (data: any) => {
    const newLeave: Leave = {
      id: leaves.length + 1,
      employeeName: data.employeeName,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      days: data.days,
      status: 'pending',
    };
    setLeaves([...leaves, newLeave]);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (leave: Leave) => {
    setSelectedLeave(leave);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedLeave) {
      setLeaves(leaves.filter(l => l.id !== selectedLeave.id));
      setIsDeleteModalOpen(false);
      setSelectedLeave(null);
    }
  };

  // Paginate data locally (mock backend pagination)
  const paginatedLeaves = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return leaves.slice(startIndex, endIndex);
  }, [leaves, page, pageSize]);

  const columns = useMemo<ColumnDef<Leave>[]>(
    () => [
      {
        accessorKey: 'employeeName',
        header: 'Company',
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'leaveType',
        header: 'Leave type',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'startDate',
        header: 'Start date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'endDate',
        header: 'End date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'days',
        header: 'Days',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string} Days</span>
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
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <HrButton variant="icon" icon={Edit} />
            <HrButton variant="danger" icon={Trash2} onClick={() => handleDeleteClick(row.original)} className="p-2" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaves managements</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee time off with ease.</p>
        </div>
        <HrButton 
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          New Request
        </HrButton>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <HrCard
          title="Total Requests"
          value="124"
          change={5.2}
          icon={Calendar}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
          subtitle="from last month"
        />
        <HrCard
          title="Pending requests"
          value="118"
          change={2.1}
          icon={Clock}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
          subtitle="from last month"
        />
        <HrCard
          title="Approved requests"
          value="8"
          change={-12.5}
          icon={CheckCircle}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
          subtitle="from last month"
        />
        <HrCard
          title="Rejected Requests"
          value="8"
          change={8.3}
          icon={XCircle}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
          subtitle="from last month"
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
          <div className="w-48">
            <HrSelectMenu
              name="leaveType"
              placeholder="All leave types"
              options={[{ value: '', label: 'All leave types' }, ...leaveTypeOptions]}
              value={null}
              onChange={() => {}}
              isSearchable={false}
            />
          </div>
        </div>
      </div>

      {/* Leaves Table */}
      <HrTable
        columns={columns}
        data={paginatedLeaves}
        page={page}
        pageSize={pageSize}
        totalItems={leaves.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Leave Request Modal */}
      <LeaveRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLeaveRequest}
      />

      {/* Delete Confirmation Modal */}
      <HrConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedLeave(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Leave Request"
        message="Are you sure you want to delete this leave request for"
        itemName={selectedLeave?.employeeName}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Leaves;

