import type { RecentActivity } from '../types';

interface RecentActivitiesFeedProps {
  activities: RecentActivity[] | null;
}

const RecentActivitiesFeed = ({ activities }: RecentActivitiesFeedProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.slice(0, 6).map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start justify-between pb-4 border-b last:border-b-0 last:pb-0"
            >
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{activity.employee}</div>
                <div className="text-xs text-gray-500 mt-1">{activity.description}</div>
              </div>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}
              >
                {formatStatus(activity.status)}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No recent activities
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivitiesFeed;


