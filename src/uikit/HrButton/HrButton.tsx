import { ReactNode, ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 
  | 'primary'      // Primary action (bg-primary, white text)
  | 'secondary'    // Secondary action (border, gray text)
  | 'outline'      // Same as secondary
  | 'danger'       // Destructive action (red hover)
  | 'ghost'        // Minimal styling
  | 'icon';        // Icon only button

interface HrButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const HrButton = ({
  variant = 'secondary',
  icon: Icon,
  iconPosition = 'left',
  children,
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: HrButtonProps) => {
  
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'px-4 py-2 bg-primary text-white hover:bg-primary-dark',
    secondary: 'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50',
    outline: 'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300',
    ghost: 'px-4 py-2 text-gray-700 hover:bg-gray-100',
    icon: 'p-2 text-gray-600 hover:bg-gray-100 rounded-lg',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combined classes
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`.trim();
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={16} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={16} />}
        </>
      )}
    </button>
  );
};

export default HrButton;

