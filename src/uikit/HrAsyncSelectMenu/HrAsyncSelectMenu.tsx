/**
 * @fileoverview Async select component with pagination
 */
import { AsyncPaginate } from 'react-select-async-paginate';
import { GroupBase, StylesConfig, OptionsOrGroups } from 'react-select';
import { api } from '../../services/api';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

export interface AsyncSelectOption {
  value: number;
  label: string;
}

interface Additional {
  page: number;
}

export interface HrAsyncSelectMenuProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  endpoint: string;
  dataKey: string;
  labelKey?: string;
  pageSize?: number;
  required?: boolean;
  control: Control<any>;
  rules?: RegisterOptions;
  onValueChange?: (value: AsyncSelectOption | null) => void;
}

const buildSelectStyles = (error?: string): StylesConfig<AsyncSelectOption, false> => ({
  control: (base, state) => ({
    ...base,
    borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db',
    boxShadow: 'none',
    minHeight: 42,
    '&:hover': {
      borderColor: error ? '#ef4444' : '#3b82f6',
    },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
});

const HrAsyncSelectMenu = ({
  name,
  label,
  placeholder = 'Select...',
  error,
  endpoint,
  dataKey,
  labelKey = 'name',
  pageSize = 10,
  required = false,
  control,
  rules,
  onValueChange,
}: HrAsyncSelectMenuProps) => {
  const selectStyles = buildSelectStyles(error);

  const loadOptions = async (
    search: string,
    _loadedOptions: OptionsOrGroups<AsyncSelectOption, GroupBase<AsyncSelectOption>>,
    additional: Additional | undefined
  ) => {
    const page = additional?.page ?? 1;

    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      const res = await api.get<any>(`${endpoint}?page=${page}&limit=${pageSize}${searchParam}`);
      
      const data = res.data || {};
      const items = data[dataKey] || [];
      const pagination = data.pagination || {};
      
      const currentPage: number = pagination.current_page ?? page;
      const hasMore: boolean = pagination.has_next ?? false;

      const options: AsyncSelectOption[] = items.map((item: any) => ({
        value: item.id,
        label: item[labelKey] ?? String(item.id),
      }));

      return {
        options,
        hasMore,
        additional: {
          page: currentPage + 1,
        },
      };
    } catch (error) {
      console.error('Error loading options:', error);
      return {
        options: [],
        hasMore: false,
        additional: { page: 1 },
      };
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <AsyncPaginate<AsyncSelectOption, GroupBase<AsyncSelectOption>, Additional>
            inputId={name}
            additional={{ page: 1 }}
            value={field.value}
            loadOptions={loadOptions}
            onChange={(option) => {
              const next = option as AsyncSelectOption | null;
              field.onChange(next);
              onValueChange?.(next);
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            isClearable
            debounceTimeout={400}
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={selectStyles}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default HrAsyncSelectMenu;
