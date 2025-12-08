import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface HrCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  subtitle?: string;
}

const HrCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  iconBgColor = 'bg-gray-50',
  iconColor = 'text-gray-700',
  subtitle
}: HrCardProps) => {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${iconBgColor} rounded-lg`}>
          <Icon className={iconColor} size={24} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
};

export default HrCard;

