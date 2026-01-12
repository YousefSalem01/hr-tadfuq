import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';
import HrCard from '../../../uikit/HrCard/HrCard';
import type { DashboardSummary } from '../types';

interface SummaryCardsProps {
  summary: DashboardSummary | null;
  isLoading?: boolean;
}

const SummaryCards = ({ summary, isLoading = false }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <HrCard
        title="Total Employees"
        value={isLoading ? '...' : summary?.total_employees.toString() || '0'}
        icon={Users}
      />
      <HrCard
        title="Present Today"
        value={isLoading ? '...' : summary?.present_today.toString() || '0'}
        icon={UserCheck}
      />
      <HrCard
        title="Pending Leaves"
        value={isLoading ? '...' : summary?.pending_leaves.toString() || '0'}
        icon={Calendar}
      />
      <HrCard
        title="Active Employees"
        value={isLoading ? '...' : summary?.active_employees.toString() || '0'}
        icon={DollarSign}
      />
    </div>
  );
};

export default SummaryCards;


