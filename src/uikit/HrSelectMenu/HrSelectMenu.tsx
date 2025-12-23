import Select, { Props as ReactSelectProps, MultiValue, SingleValue } from 'react-select';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

export interface Option<TValue = string> {
  value: TValue;
  label: string;
}

interface BaseProps<TValue> {
  name: string;
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  options: Option<TValue>[];
  className?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  isDisabled?: boolean;
}

interface RHFProps<TValue> extends BaseProps<TValue> {
  control: Control<any>;
  rules?: RegisterOptions;
  value?: never;
  onChange?: never;
}

interface StandaloneProps<TValue> extends BaseProps<TValue> {
  control?: never;
  rules?: never;
  value?: Option<TValue> | Option<TValue>[] | null;
  onChange?: (
    value: SingleValue<Option<TValue>> | MultiValue<Option<TValue>>
  ) => void;
}

type HrSelectMenuProps<TValue> = (RHFProps<TValue> | StandaloneProps<TValue>) &
  Omit<ReactSelectProps, 'options' | 'isMulti' | 'isSearchable' | 'onChange' | 'value'>;

const HrSelectMenu = <TValue = string,>(props: HrSelectMenuProps<TValue>) => {
  const { 
    name, 
    label, 
    placeholder, 
    isMulti, 
    isSearchable = true, 
    options, 
    className = '', 
    error, 
    required = false,
    helperText,
    isDisabled,
    ...rest 
  } = props as any;

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: 'none',
      minHeight: 42,
      backgroundColor: isDisabled ? '#f3f4f6' : base.backgroundColor,
      cursor: isDisabled ? 'not-allowed' : 'default',
      '&:hover': {
        borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#9ca3af',
      },
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? '#eff6ff'
        : base.backgroundColor,
      color: state.isSelected ? '#ffffff' : '#1f2937',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3b82f6',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#eff6ff',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#1f2937',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
      },
    }),
  };

  const SelectElement = (
    <Select
      inputId={name}
      isMulti={isMulti}
      isSearchable={isSearchable}
      options={options}
      classNamePrefix="react-select"
      className={className}
      placeholder={placeholder}
      value={'value' in props ? props.value : undefined}
      onChange={'onChange' in props ? props.onChange : undefined}
      isDisabled={isDisabled}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={customStyles}
      {...(rest as any)}
    />
  );

  const ControlledElement = 'control' in props && (props as any).control ? (
    <Controller
      name={name}
      control={(props as any).control}
      rules={(props as any).rules}
      render={({ field }) => (
        <Select
          inputId={name}
          isMulti={isMulti}
          isSearchable={isSearchable}
          options={options}
          classNamePrefix="react-select"
          className={className}
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isDisabled={isDisabled}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={customStyles}
          {...(rest as any)}
        />
      )}
    />
  ) : (
    SelectElement
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {ControlledElement}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default HrSelectMenu;

