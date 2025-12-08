import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import LeaveRequestModal from '../uikit/LeaveRequestModal';
import HrButton from '../uikit/HrButton/HrButton';
import { mockLeaves, Leave } from '../data/mock';

const Leaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case 'Approved':
      case 'Active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-orange-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Active':
        return 'text-green-700';
      case 'pending':
        return 'text-orange-700';
      case 'Rejected':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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
        {/* Total Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Calendar className="text-primary" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+5.2%</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">124</div>
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="text-xs text-gray-400 mt-1">from last month</div>
          </div>
        </div>

        {/* Pending requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Clock className="text-primary" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+2.1%</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">118</div>
            <div className="text-sm text-gray-500">Pending requests</div>
            <div className="text-xs text-gray-400 mt-1">from last month</div>
          </div>
        </div>

        {/* Approved requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <CheckCircle className="text-primary" size={24} />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown size={16} />
              <span className="text-sm font-medium">-12.5%</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-500">Approved requests</div>
            <div className="text-xs text-gray-400 mt-1">from last month</div>
          </div>
        </div>

        {/* Rejected Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="text-primary" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+8.3%</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-500">Rejected Requests</div>
            <div className="text-xs text-gray-400 mt-1">from last month</div>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            <option>All leave types</option>
            <option>Sick</option>
            <option>Casual</option>
            <option>Maternity</option>
            <option>Paternity</option>
            <option>Vacation</option>
            <option>Personal</option>
            <option>Unpaid</option>
            <option>Bereavement</option>
            <option>Compassionate</option>
            <option>Jury Duty</option>
            <option>Study Leave</option>
            <option>Sabbatical</option>
            <option>Public Holiday</option>
            <option>Family Leave</option>
          </select>
        </div>
      </div>

      {/* Leaves Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Company</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Leave type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Start date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">End date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Days</th>
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
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {getInitials(leave.employeeName)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{leave.employeeName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{leave.leaveType}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{leave.startDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{leave.endDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{leave.days} Days</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(leave.status)}`}></div>
                      <span className={`text-sm font-medium ${getStatusTextColor(leave.status)}`}>
                        {formatStatus(leave.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <HrButton variant="icon" icon={Edit} />
                      <HrButton variant="danger" icon={Trash2} className="p-2" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Modal */}
      <LeaveRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLeaveRequest}
      />
    </div>
  );
};

export default Leaves;

