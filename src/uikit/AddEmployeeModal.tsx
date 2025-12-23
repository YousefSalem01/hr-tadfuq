import { X, User, Mail, Briefcase, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrSelectMenu, { Option } from './HrSelectMenu/HrSelectMenu';
import { departmentOptions, branchOptions, currencyOptions, phoneCountryOptions } from '../data/mock';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: any) => void;
}

const AddEmployeeModal = ({ isOpen, onClose, onAdd }: AddEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Senior Developer',
    department: departmentOptions[0],
    joinDate: '15/11/2023',
    phoneCountry: phoneCountryOptions[0],
    phoneNumber: '+20(11) 562 251 11',
    address: '',
    emergencyContact: 'Jane Smith - +20(10) 924 654 37',
    salary: '1,000.00',
    salaryCurrency: currencyOptions[0],
    branch: branchOptions[0],
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert Option values back to strings for submission
    const submitData = {
      ...formData,
      department: formData.department.value,
      phoneCountry: formData.phoneCountry.value,
      salaryCurrency: formData.salaryCurrency.value,
      branch: formData.branch.value,
    };
    onAdd(submitData);
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      role: 'Senior Developer',
      department: departmentOptions[0],
      joinDate: '15/11/2023',
      phoneCountry: phoneCountryOptions[0],
      phoneNumber: '+20(11) 562 251 11',
      address: '',
      emergencyContact: 'Jane Smith - +20(10) 924 654 37',
      salary: '1,000.00',
      salaryCurrency: currencyOptions[0],
      branch: branchOptions[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
            <p className="text-sm text-gray-500 mt-1">Add New Employee</p>
          </div>
          <button
            onClick={onClose}
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
              <HrSelectMenu
                name="department"
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(option) => handleSelectChange('department', option as Option)}
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
              <HrSelectMenu
                name="branch"
                label="Branch"
                options={branchOptions}
                value={formData.branch}
                onChange={(option) => handleSelectChange('branch', option as Option)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <HrButton
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </HrButton>
            <HrButton
              type="submit"
              variant="primary"
            >
              Add Employee
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;

