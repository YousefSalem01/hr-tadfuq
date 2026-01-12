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
      />
      <HrCard
        title="On Leave"
        value={stats.onLeave}
        icon={Calendar}
      />
      <HrCard
        title="Inactive"
        value={stats.inactive}
        icon={UserX}
      />
    </div>
  );
};

export default SummaryCards;
