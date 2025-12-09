import { X, ChevronDown, User, Mail, Briefcase, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';

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
    department: 'Engineering',
    joinDate: '15/11/2023',
    phoneCountry: 'US',
    phoneNumber: '+20(11) 562 251 11',
    address: '',
    emergencyContact: 'Jane Smith - +20(10) 924 654 37',
    salary: '1,000.00',
    salaryCurrency: 'USD',
    branch: 'Main Office',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      role: 'Senior Developer',
      department: 'Engineering',
      joinDate: '15/11/2023',
      phoneCountry: 'US',
      phoneNumber: '+20(11) 562 251 11',
      address: '',
      emergencyContact: 'Jane Smith - +20(10) 924 654 37',
      salary: '1,000.00',
      salaryCurrency: 'USD',
      branch: 'Main Office',
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
                  <select
                    name="phoneCountry"
                    value={formData.phoneCountry}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="EG">EG</option>
                    <option value="AE">AE</option>
                  </select>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

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
                  <select
                    name="salaryCurrency"
                    value={formData.salaryCurrency}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <div className="relative">
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Main Office">Main Office</option>
                    <option value="Branch 1">Branch 1</option>
                    <option value="Branch 2">Branch 2</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
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

