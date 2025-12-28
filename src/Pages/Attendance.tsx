import { useState, useMemo } from 'react';
import { 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Users, 
  UserCheck, 
  AlertCircle,
  Laptop,
  UserX,
  Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ColumnDef } from '@tanstack/react-table';
import { 
  mockAttendanceChartData, 
  mockAttendanceStats, 
  departmentFilterOptions, 
  attendanceStatusFilterOptions,
  mockAttendanceRecords,
  AttendanceRecord
} from '../data/mock';
import HrSelectMenu, { Option } from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import { getStatusBadgeColor } from '../utils';

const Attendance = () => {
  const [selectedDate] = useState('Today');
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(departmentFilterOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(attendanceStatusFilterOptions[0]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const chartData = mockAttendanceChartData;

  const attendanceStats = [
    { label: 'Total', value: mockAttendanceStats.total.toString(), icon: <Users className="text-primary" size={24} />, color: 'text-primary' },
    { label: 'Present', value: mockAttendanceStats.present.toString(), icon: <UserCheck className="text-green-600" size={24} />, color: 'text-green-600' },
    { label: 'Late', value: mockAttendanceStats.late.toString(), icon: <AlertCircle className="text-yellow-600" size={24} />, color: 'text-yellow-600' },
    { label: 'Remote', value: mockAttendanceStats.remote.toString(), icon: <Laptop className="text-yellow-600" size={24} />, color: 'text-yellow-600' },
    { label: 'Absent', value: mockAttendanceStats.absent.toString(), icon: <UserX className="text-red-600" size={24} />, color: 'text-red-600' },
  ];

  const columns = useMemo<ColumnDef<AttendanceRecord>[]>(
    () => [
      {
        accessorKey: 'employee',
        header: 'Employee',
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{ getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'checkIn',
        header: 'Check In',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'checkOut',
        header: 'Check Out',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'hours',
        header: 'Hours',
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-gray-900">{getValue() as string}</span>
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
              {status}
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
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage employee attendance</p>
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
        </div>
      </div>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        {attendanceStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border-2 ${stat.color.replace('text-', 'border-')} bg-white`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Attendance Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Weekly Attendance Overview</h3>
            <p className="text-sm text-gray-500">Staff participation across divisions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Calendar size={16} />
            {selectedDate}
          </button>
        </div>
        
        <div className="flex items-center justify-center py-8">
          <div className="relative w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">40%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Present 50</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Absent 4</span>
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
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
          <div className="w-48">
            <HrSelectMenu
              name="department"
              options={departmentFilterOptions}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value as Option | null)}
              isSearchable={false}
            />
          </div>
          <div className="w-44">
            <HrSelectMenu
              name="status"
              options={attendanceStatusFilterOptions}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value as Option | null)}
              isSearchable={false}
            />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <HrTable
        columns={columns}
        data={mockAttendanceRecords}
        page={page}
        pageSize={pageSize}
        totalItems={mockAttendanceRecords.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default Attendance;

