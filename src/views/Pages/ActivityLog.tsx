import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown,
  UserPlus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { mockActivityLogs, ActivityLog as ActivityLogType } from '../../data/mock';

const ActivityLog = () => {
  const [activityLogs] = useState<ActivityLogType[]>(mockActivityLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockActivityLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [entityFilter, setEntityFilter] = useState('All');

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Created':
        return <UserPlus className="text-green-600" size={18} />;
      case 'Updated':
        return <Edit className="text-blue-600" size={18} />;
      case 'Deleted':
        return <Trash2 className="text-red-600" size={18} />;
      case 'Permission Changed':
        return <User className="text-purple-600" size={18} />;
      case 'Logged In':
        return <Clock className="text-green-600" size={18} />;
      case 'Logged Out':
        return <Clock className="text-gray-600" size={18} />;
      default:
        return <FileText className="text-gray-600" size={18} />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Created':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Updated':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Deleted':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Permission Changed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Logged In':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Logged Out':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
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
    filterLogs(searchTerm, value, entityFilter);
  };

  const handleEntityFilter = (value: string) => {
    setEntityFilter(value);
    filterLogs(searchTerm, actionFilter, value);
  };

  const uniqueEntities = Array.from(new Set(activityLogs.map(log => log.entity)));

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
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
          <select 
            value={actionFilter}
            onChange={(e) => handleActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option>All Actions</option>
            <option>Created</option>
            <option>Updated</option>
            <option>Deleted</option>
            <option>Permission Changed</option>
            <option>Logged In</option>
            <option>Logged Out</option>
          </select>
          <select 
            value={entityFilter}
            onChange={(e) => handleEntityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option>All Entities</option>
            {uniqueEntities.map((entity) => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Entity</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Details</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Timestamp
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{log.entity}</div>
                      <div className="text-xs text-gray-500">{log.entityName}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700 max-w-md">{log.details || '-'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
                        {getInitials(log.user)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{log.user}</div>
                        <div className="text-xs text-gray-500">{log.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{log.timestamp}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">No activities found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;

