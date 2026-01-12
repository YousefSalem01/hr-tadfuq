import { LucideIcon } from 'lucide-react';

interface HrCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

const HrCard = ({ 
  title, 
  value, 
  icon: Icon,
  iconBgColor,
  iconColor,
}: HrCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between gap-4">
        {/* Label and Value */}
        <div>
          <div className="text-sm font-normal leading-5" style={{ color: '#A4A7AE' }}>{title}</div>
          <div className="text-2xl font-bold leading-8 text-gray-900">{value}</div>
        </div>
        {/* Icon */}
        <div 
          className="w-[60px] h-[60px] flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ backgroundColor: iconBgColor ? iconBgColor : '#FDEDED' }}
        >
          <Icon style={{ color: iconColor ? iconColor : '#A63534' }} size={24} />
        </div>
      </div>
    </div>
  );
};

export default HrCard;

