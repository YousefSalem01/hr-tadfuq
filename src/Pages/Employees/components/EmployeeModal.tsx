import { X, User, Mail, Briefcase, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrInput from '../../../uikit/HrInput/HrInput';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { currencyOptions, phoneCountryOptions } from '../../../data/mock';
import { endpoints } from '../../../config/endpoints';
import type { Employee } from '../types';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: any) => void;
  employee?: Employee | null;
  mode?: 'add' | 'edit';
}

const getInitialFormData = () => ({
  fullName: '',
  email: '',
  role: '',
  department: null as AsyncSelectOption | null,
  joinDate: '',
  phoneCountry: phoneCountryOptions[0],
  phoneNumber: '',
  address: '',
  emergencyContact: '',
  salary: '',
  salaryCurrency: currencyOptions[0],
  branch: null as AsyncSelectOption | null,
});

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee, mode = 'add' }: EmployeeModalProps) => {
  const [formData, setFormData] = useState(getInitialFormData());

  const isEditMode = mode === 'edit';

  // Populate form when editing
  useEffect(() => {
    if (isOpen && isEditMode && employee) {
      const dept: AsyncSelectOption | null = employee.department_detail
        ? { value: employee.department_detail.id, label: employee.department_detail.name }
        : null;
      const branch: AsyncSelectOption | null = employee.branch_detail
        ? { value: employee.branch_detail.id, label: employee.branch_detail.name }
        : null;
      
      setFormData({
        fullName: employee.employee_name || '',
        email: employee.email || '',
        role: employee.role || '',
        department: dept,
        joinDate: employee.join_date || '',
        phoneCountry: phoneCountryOptions[0],
        phoneNumber: employee.phone_number || '',
        address: employee.address || '',
        emergencyContact: employee.emergency_contact || '',
        salary: employee.salary || '',
        salaryCurrency: currencyOptions[0],
        branch: branch,
      });
    } else if (isOpen && !isEditMode) {
      setFormData(getInitialFormData());
    }
  }, [isOpen, isEditMode, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: Option | null) => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAsyncSelectChange = (name: string, value: AsyncSelectOption | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert Option values back to strings for submission
    const submitData = {
      ...formData,
      id: employee?.id,
      department: formData.department?.value || null,
      phoneCountry: formData.phoneCountry.value,
      salaryCurrency: formData.salaryCurrency.value,
      branch: formData.branch?.value || null,
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    setFormData(getInitialFormData());
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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <HrInput
                label="Full Name"
                variant="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                icon={User}
                iconPosition="left"
              />

              <HrInput
                label="Role"
                variant="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                icon={Briefcase}
                iconPosition="left"
              />

              <HrInput
                label="Join Date"
                variant="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-32">
                    <HrSelectMenu
                      name="phoneCountry"
                      options={phoneCountryOptions}
                      value={formData.phoneCountry}
                      onChange={(option) => handleSelectChange('phoneCountry', option as Option)}
                      isSearchable={false}
                    />
                  </div>
                  <HrInput
                    variant="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    containerClassName="flex-1"
                  />
                </div>
              </div>

              <HrInput
                label="Address"
                variant="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                rows={3}
                icon={MapPin}
                iconPosition="left"
              />

              <HrInput
                label="Emergency Contact"
                variant="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                icon={Mail}
                iconPosition="left"
              />

              {/* Department */}
              <HrAsyncSelectMenu
                name="department"
                label="Department"
                placeholder="Select Department"
                endpoint={endpoints.departments}
                dataKey="items"
                labelKey="name"
                value={formData.department}
                onChange={(option) => handleAsyncSelectChange('department', option)}
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
                    value={formData.salary}
                    onChange={handleChange}
                    prefix="$"
                    containerClassName="flex-1"
                  />
                  <div className="w-32">
                    <HrSelectMenu
                      name="salaryCurrency"
                      options={currencyOptions}
                      value={formData.salaryCurrency}
                      onChange={(option) => handleSelectChange('salaryCurrency', option as Option)}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Branch */}
              <HrAsyncSelectMenu
                name="branch"
                label="Branch"
                placeholder="Select Branch"
                endpoint={endpoints.branches}
                dataKey="items"
                labelKey="name"
                value={formData.branch}
                onChange={(option) => handleAsyncSelectChange('branch', option)}
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
            >
              {isEditMode ? 'Save Changes' : 'Add Employee'}
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;

