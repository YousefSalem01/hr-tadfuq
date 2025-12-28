import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import HrButton from '../uikit/HrButton/HrButton';
import HrSelectMenu from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import { mockActivityLogs, ActivityLog as ActivityLogType, actionFilterOptions, entityFilterOptions, SelectOption } from '../data/mock';
import { SingleValue } from 'react-select';
import { getActionIcon, getActionBadgeColor, formatTimestamp } from '../utils';

const ActivityLog = () => {
  const [activityLogs] = useState<ActivityLogType[]>(mockActivityLogs);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLogType[]>(mockActivityLogs);
  const [paginatedLogs, setPaginatedLogs] = useState<ActivityLogType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [entityFilter, setEntityFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading] = useState(false);

  useEffect(() => {
    // Pagination for filtered logs
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedLogs(filteredLogs.slice(startIndex, endIndex));
  }, [filteredLogs, currentPage, pageSize]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    filterLogs(value, actionFilter, entityFilter);
  };

  const filterLogs = (search: string, action: string, entity: string) => {
    let filtered = activityLogs;

    if (search) {
      filtered = filtered.filter(log => 
        log.entityName.toLowerCase().includes(search.toLowerCase()) ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.entity.toLowerCase().includes(search.toLowerCase()) ||
        (log.details && log.details.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (action !== 'All') {
      filtered = filtered.filter(log => log.action === action);
    }

    if (entity !== 'All') {
      filtered = filtered.filter(log => log.entity === entity);
    }

    setFilteredLogs(filtered);
  };

  const handleActionFilter = (value: string) => {
    setActionFilter(value);
    setCurrentPage(1);
    filterLogs(searchTerm, value, entityFilter);
  };

  const handleEntityFilter = (value: string) => {
    setEntityFilter(value);
    setCurrentPage(1);
    filterLogs(searchTerm, actionFilter, value);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const columns = useMemo<ColumnDef<ActivityLogType>[]>(
    () => [
      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ getValue }) => {
          const action = getValue() as string;
          return (
            <div className="flex items-center gap-2">
              {getActionIcon(action)}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getActionBadgeColor(action)}`}>
                {action}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'entity',
        header: 'Entity',
        cell: ({ row }) => (
          <div>
            <div className="text-sm font-semibold text-gray-900">{row.original.entity}</div>
            <div className="text-xs text-gray-500">{row.original.entityName}</div>
          </div>
        ),
      },
      {
        accessorKey: 'details',
        header: 'Details',
        cell: ({ getValue }) => (
          <div className="text-sm text-gray-700 max-w-md">{(getValue() as string) || '-'}</div>
        ),
      },
      {
        accessorKey: 'user',
        header: 'User',
        cell: ({ row }) => (
          <div>
            <div className="text-sm font-semibold text-gray-900">{row.original.user}</div>
            <div className="text-xs text-gray-500">{row.original.userEmail}</div>
          </div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: ({ getValue }) => {
          const timestamp = getValue() as string;
          return (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} className="text-gray-400" />
                <span>{formatTimestamp(timestamp)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{timestamp}</div>
            </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-sm text-gray-500 mt-1">Track all system activities and changes</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <HrSelectMenu
            name="actionFilter"
            placeholder="All Actions"
            options={actionFilterOptions}
            value={actionFilterOptions.find(option => option.value === actionFilter) || null}
            onChange={(option) => {
              const selected = option as SingleValue<SelectOption>;
              handleActionFilter(selected ? selected.value : 'All');
            }}
            isSearchable={false}
          />
          <HrSelectMenu
            name="entityFilter"
            placeholder="All Entities"
            options={entityFilterOptions}
            value={entityFilterOptions.find(option => option.value === entityFilter) || null}
            onChange={(option) => {
              const selected = option as SingleValue<SelectOption>;
              handleEntityFilter(selected ? selected.value : 'All');
            }}
            isSearchable={false}
          />
        </div>
      </div>

      {/* Activity Log Table */}
      <HrTable
        columns={columns}
        data={paginatedLogs}
        isLoading={isLoading}
        emptyText="No activities found matching your filters"
        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredLogs.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ActivityLog;

