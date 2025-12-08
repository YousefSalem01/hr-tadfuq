import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type ChipVariant = 'default' | 'active';

interface HrChipProps {
  icon?: LucideIcon;
  children?: ReactNode;
  variant?: ChipVariant;
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

const HrChip = ({
  icon: Icon,
  children,
  variant = 'default',
  collapsed = false,
  onClick,
  className = '',
}: HrChipProps) => {
  const baseStyles = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer';

  const variantStyles = {
    default: 'text-gray-700 hover:bg-gray-100',
    active: 'bg-primary text-white',
  };

  const collapsedClass = collapsed ? 'justify-center' : '';

  const chipClasses = `${baseStyles} ${variantStyles[variant]} ${collapsedClass} ${className}`.trim();

  return (
    <div className={chipClasses} onClick={onClick}>
      {Icon && <Icon size={20} />}
      {!collapsed && children && <span className="text-sm font-medium">{children}</span>}
    </div>
  );
};

export default HrChip;

