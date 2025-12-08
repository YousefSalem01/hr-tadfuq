interface Activity {
  name: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const activities: Activity[] = [
  { name: 'Ahmed Maged', type: 'Annual leave request', status: 'Pending' },
  { name: 'Mustafa Raffat', type: 'Sick leave request', status: 'Approved' },
  { name: 'Sarah Medhat', type: 'Sick leave request', status: 'Approved' },
  { name: 'Laila Noor', type: 'Maternity leave request', status: 'Rejected' },
  { name: 'Ali Zidan', type: 'Annual leave request', status: 'Rejected' },
  { name: 'Khaled Elmasry', type: 'Study leave request', status: 'Rejected' },
];

const RecentActivities = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-50';
      case 'Rejected':
        return 'text-red-600 bg-red-50';
      case 'Pending':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start justify-between pb-4 border-b last:border-b-0 last:pb-0">
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">{activity.name}</div>
              <div className="text-xs text-gray-500 mt-1">{activity.type}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

