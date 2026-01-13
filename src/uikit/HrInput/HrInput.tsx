import { InputHTMLAttributes, TextareaHTMLAttributes, useState, forwardRef } from 'react';
import { LucideIcon, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

// Base props shared across all input types
interface BaseInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  prefix?: string;
  suffix?: string;
  containerClassName?: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

// Text/Email/Number/Tel/Date Input Props
interface TextInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  variant?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel';
  showPasswordToggle?: boolean;
}

// Textarea Props
interface TextareaInputProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: 'textarea';
  rows?: number;
}

// Combined Props Type
type HrInputProps = TextInputProps | TextareaInputProps;

const HrInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, HrInputProps>(
  (props, _ref) => {
    const {
      label,
      required = false,
      error,
      helperText,
      icon: Icon,
      iconPosition = 'left',
      prefix,
      suffix,
      containerClassName = '',
      variant = 'text',
      className = '',
      control,
      rules,
      ...restProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    // Base styles
    const baseInputStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors';
    const errorStyles = error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-primary focus:border-transparent';
    const disabledStyles = restProps.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';

    // Icon padding adjustments
    const iconPaddingLeft = Icon && iconPosition === 'left' ? 'pl-10' : '';
    const iconPaddingRight = Icon && iconPosition === 'right' ? 'pr-10' : '';
    const prefixPaddingLeft = prefix ? 'pl-12' : '';
    const suffixPaddingRight = suffix ? 'pr-12' : '';
    const passwordTogglePadding = variant === 'password' && (props as TextInputProps).showPasswordToggle ? 'pr-10' : '';

    const inputClasses = `${baseInputStyles} ${errorStyles} ${disabledStyles} ${iconPaddingLeft} ${iconPaddingRight} ${prefixPaddingLeft} ${suffixPaddingRight} ${passwordTogglePadding} ${className}`.trim();

    // Render label
    const renderLabel = () => {
      if (!label) return null;
      return (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      );
    };

    // Render error message
    const renderError = () => {
      if (!error) return null;
      return (
        <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      );
    };

    // Render helper text
    const renderHelperText = () => {
      if (!helperText || error) return null;
      return <p className="mt-2 text-sm text-gray-500">{helperText}</p>;
    };

    // Render icon
    const renderIcon = () => {
      if (!Icon) return null;
      const iconClasses = `absolute ${iconPosition === 'left' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400`;
      return <Icon className={iconClasses} size={20} />;
    };

    // Render prefix
    const renderPrefix = () => {
      if (!prefix) return null;
      return (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium">
          {prefix}
        </div>
      );
    };

    // Render suffix
    const renderSuffix = () => {
      if (!suffix) return null;
      return (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium">
          {suffix}
        </div>
      );
    };

    // Render password toggle
    const renderPasswordToggle = () => {
      if (variant !== 'password' || !(props as TextInputProps).showPasswordToggle) return null;
      const PasswordIcon = showPassword ? EyeOff : Eye;
      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <PasswordIcon size={20} />
        </button>
      );
    };

    const inputType = variant === 'password' && showPassword ? 'text' : variant;
    const fieldName = (restProps as any).name as string;

    // Render input based on variant (RHF Controller only)
    const renderInput = () => {
      return (
        <Controller
          name={fieldName}
          control={control}
          rules={rules}
          render={({ field }) => {
            if (variant === 'textarea') {
              const textareaProps = restProps as TextareaHTMLAttributes<HTMLTextAreaElement>;
              return (
                <textarea
                  ref={field.ref}
                  className={`${inputClasses} resize-none`}
                  rows={(props as TextareaInputProps).rows || 4}
                  required={required}
                  {...textareaProps}
                  value={(field.value ?? '') as any}
                  onChange={(e) => {
                    field.onChange(e);
                    textareaProps.onChange?.(e);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    textareaProps.onBlur?.(e);
                  }}
                />
              );
            }

            const inputProps = restProps as InputHTMLAttributes<HTMLInputElement>;
            return (
              <input
                ref={field.ref}
                type={inputType}
                className={inputClasses}
                required={required}
                {...inputProps}
                value={(field.value ?? '') as any}
                onChange={(e) => {
                  field.onChange(e);
                  inputProps.onChange?.(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                  inputProps.onBlur?.(e);
                }}
              />
            );
          }}
        />
      );
    };

    return (
      <div className={containerClassName}>
        {renderLabel()}
        <div className="relative">
          {renderPrefix()}
          {renderIcon()}
          {renderInput()}
          {renderSuffix()}
          {renderPasswordToggle()}
        </div>
        {renderError()}
        {renderHelperText()}
      </div>
    );
  }
);

HrInput.displayName = 'HrInput';

export default HrInput;

