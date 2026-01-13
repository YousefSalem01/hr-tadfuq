import { X, User, Mail, Briefcase, Phone, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrInput from '../../../uikit/HrInput/HrInput';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { currencyOptions, phoneCountryOptions } from '../../../data/mock';
import { API_ENDPOINTS } from '../../../config/endpoints';
import {
  COUNTRY_DIAL_CODES,
  CURRENCY_SYMBOLS,
  guessCountryFromPhone,
  stripDialCode,
} from '../utils/employeeForm';
import type { Employee } from '../types';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: any, setFormError?: (field: string, message: string) => void) => Promise<void>;
  employee?: Employee | null;
  mode?: 'add' | 'edit';
  isSubmitting?: boolean;
}

type EmployeeFormValues = {
  fullName: string;
  email: string;
  role: string;
  department: AsyncSelectOption | null;
  joinDate: string;
  phoneCountry: Option<string>;
  phoneNumber: string;
  address: string;
  emergencyContact: string;
  salary: string;
  salaryCurrency: Option<string>;
  branch: AsyncSelectOption | null;
};

const getInitialFormData = (): EmployeeFormValues => ({
  fullName: '',
  email: '',
  role: '',
  department: null,
  joinDate: '',
  phoneCountry: phoneCountryOptions[0] as Option<string>,
  phoneNumber: '',
  address: '',
  emergencyContact: '',
  salary: '',
  salaryCurrency: currencyOptions[0] as Option<string>,
  branch: null,
});

const EmployeeModal = ({
  isOpen,
  onClose,
  onSubmit,
  employee,
  mode = 'add',
  isSubmitting = false,
}: EmployeeModalProps) => {
  const isEditMode = mode === 'edit';

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: getInitialFormData(),
    mode: 'onSubmit',
  });

  const phoneCountry = watch('phoneCountry');
  const salaryCurrency = watch('salaryCurrency');

  // Populate form when editing
  useEffect(() => {
    if (isOpen && isEditMode && employee) {
      const dept: AsyncSelectOption | null = employee.department_detail
        ? { value: employee.department_detail.id, label: employee.department_detail.name }
        : null;
      const branch: AsyncSelectOption | null = employee.branch_detail
        ? { value: employee.branch_detail.id, label: employee.branch_detail.name }
        : null;

      const country = guessCountryFromPhone(employee.phone_number);
      const dialCode = COUNTRY_DIAL_CODES[country] ?? COUNTRY_DIAL_CODES.US;
      
      const employeeCurrency = employee.salary_currency 
        ? currencyOptions.find((o) => o.value === employee.salary_currency) || currencyOptions[0]
        : currencyOptions[0];
      
      reset({
        fullName: employee.employee_name || '',
        email: employee.email || '',
        role: employee.role || '',
        department: dept,
        joinDate: employee.join_date || '',
        phoneCountry:
          (phoneCountryOptions.find((o) => o.value === country) ?? phoneCountryOptions[0]) as Option<string>,
        phoneNumber: stripDialCode(employee.phone_number || '', dialCode),
        address: employee.address || '',
        emergencyContact: employee.emergency_contact || '',
        salary: employee.salary || '',
        salaryCurrency: employeeCurrency as Option<string>,
        branch: branch,
      });
    } else if (isOpen && !isEditMode) {
      reset(getInitialFormData());
    }
  }, [isOpen, isEditMode, employee, reset]);

  const handleClose = () => {
    reset(getInitialFormData());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditMode ? 'Update employee information' : 'Add New Employee'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (values) => {
            const dialCode = COUNTRY_DIAL_CODES[values.phoneCountry.value] ?? '';
            await onSubmit(
              {
                ...values,
                id: employee?.id,
                department: values.department?.value || null,
                branch: values.branch?.value || null,
                phoneCountry: values.phoneCountry.value,
                salaryCurrency: values.salaryCurrency.value,
                phoneNumber: `${dialCode}${values.phoneNumber}`,
              },
              (field: string, message: string) => {
                setError(field as any, { type: 'manual', message });
              }
            );
          })}
          className="p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <HrInput
                label="Full Name"
                variant="text"
                name="fullName"
                control={control}
                rules={{ required: 'Full name is required' }}
                placeholder="Full Name"
                required
                icon={User}
                iconPosition="left"
                error={errors.fullName?.message}
              />

              <HrInput
                label="Role"
                variant="text"
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                icon={Briefcase}
                iconPosition="left"
                error={errors.role?.message}
              />

              <HrInput
                label="Join Date"
                variant="date"
                name="joinDate"
                control={control}
                rules={{ required: 'Join date is required' }}
                error={errors.joinDate?.message}
              />

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-32">
                    <HrSelectMenu<string>
                      name="phoneCountry"
                      options={phoneCountryOptions as Option<string>[]}
                      control={control as any}
                      rules={{ required: 'Country is required' }}
                      isSearchable={false}
                      error={(errors.phoneCountry as any)?.message}
                    />
                  </div>
                  <HrInput
                    variant="tel"
                    name="phoneNumber"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    containerClassName="flex-1"
                    prefix={COUNTRY_DIAL_CODES[phoneCountry?.value] ?? ''}
                    error={errors.phoneNumber?.message}
                  />
                </div>
              </div>

              <HrInput
                label="Address"
                variant="textarea"
                name="address"
                control={control}
                placeholder="Address"
                rows={3}
                icon={MapPin}
                iconPosition="left"
              />

              <HrInput
                label="Emergency Contact"
                variant="text"
                name="emergencyContact"
                control={control}
                icon={Phone}
                iconPosition="left"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <HrInput
                label="Email"
                variant="email"
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                }}
                placeholder="Email"
                required
                icon={Mail}
                iconPosition="left"
                error={errors.email?.message}
              />

              {/* Department */}
              <HrAsyncSelectMenu
                name="department"
                label="Department"
                placeholder="Select Department"
                endpoint={API_ENDPOINTS.DEPARTMENTS.LIST}
                dataKey="items"
                labelKey="name"
                control={control as any}
                rules={{ required: 'Department is required' }}
                error={(errors.department as any)?.message}
              />

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary
                </label>
                <div className="flex gap-1">
                  <HrInput
                    variant="number"
                    name="salary"
                    control={control}
                    rules={{ required: 'Salary is required' }}
                    prefix={CURRENCY_SYMBOLS[salaryCurrency?.value] ?? ''}
                    containerClassName="flex-1"
                    error={errors.salary?.message}
                  />
                  <div className="w-32">
                    <HrSelectMenu<string>
                      name="salaryCurrency"
                      options={currencyOptions as Option<string>[]}
                      control={control as any}
                      rules={{ required: 'Currency is required' }}
                      isSearchable={false}
                      error={(errors.salaryCurrency as any)?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Branch */}
              <HrAsyncSelectMenu
                name="branch"
                label="Branch"
                placeholder="Select Branch"
                endpoint={API_ENDPOINTS.BRANCHES.LIST}
                dataKey="items"
                labelKey="name"
                control={control as any}
                rules={{ required: 'Branch is required' }}
                error={(errors.branch as any)?.message}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <HrButton
              type="button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </HrButton>
            <HrButton
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Employee'}
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;

