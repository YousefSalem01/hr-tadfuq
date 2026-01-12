import { Users, UserCheck, Calendar, UserX } from 'lucide-react';
import HrCard from '../../../uikit/HrCard/HrCard';

interface SummaryCardsProps {
  stats: {
    total: number;
    active: number;
    onLeave: number;
    inactive: number;
  };
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <HrCard
        title="Total Employees"
        value={stats.total}
        icon={Users}
      />
      <HrCard
        title="Active"
        value={stats.active}
        icon={UserCheck}
        iconBgColor="#6ce9a620"
        iconColor='#039855'
      />
      <HrCard
        title="On Leave"
        value={stats.onLeave}
        icon={Calendar}
        iconBgColor="#fde68a20"
        iconColor='#f59e0b'
      />
      <HrCard
        title="Inactive"
        value={stats.inactive}
        icon={UserX}
        iconBgColor="#fecdd320"
        iconColor='#ef4444'
      />
    </div>
  );
};

export default SummaryCards;
