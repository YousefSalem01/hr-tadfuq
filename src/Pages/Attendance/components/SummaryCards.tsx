import { Users, UserCheck, AlertCircle, Laptop, UserX } from 'lucide-react';

interface SummaryCardsProps {
  stats: {
    total: number;
    present: number;
    late: number;
    remote: number;
    absent: number;
  };
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  const cards = [
    { label: 'Total', value: stats.total, icon: Users, color: 'text-primary', borderColor: 'border-primary' },
    { label: 'Present', value: stats.present, icon: UserCheck, color: 'text-green-600', borderColor: 'border-green-600' },
    { label: 'Late', value: stats.late, icon: AlertCircle, color: 'text-yellow-600', borderColor: 'border-yellow-600' },
    { label: 'Remote', value: stats.remote, icon: Laptop, color: 'text-yellow-600', borderColor: 'border-yellow-600' },
    { label: 'Absent', value: stats.absent, icon: UserX, color: 'text-red-600', borderColor: 'border-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border-2 ${card.borderColor} bg-white`}>
                <Icon className={card.color} size={24} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
