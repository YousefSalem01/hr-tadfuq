import { X, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrSelectMenu, { Option } from './HrSelectMenu/HrSelectMenu';
import { mockEmployees, currencyOptions } from '../data/mock';

interface CreatePayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreatePayrollModal = ({ isOpen, onClose, onSubmit }: CreatePayrollModalProps) => {
  const employeeOptions: Option[] = mockEmployees.map(emp => ({
    value: emp.name,
    label: emp.name,
  }));

  const [formData, setFormData] = useState({
    employeeName: null as Option | null,
    month: '15/11/2023',
    basicSalary: '1,000.00',
    salaryCurrency: currencyOptions[0],
    allowances: '0.00',
    deductions: '0.00',
    deductionType: 'Bonus',
    overtimeHours: '0',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    onSubmit({
      ...formData,
      employeeName: formData.employeeName?.value || '',
      salaryCurrency: formData.salaryCurrency.value,
    });
    onClose();
    // Reset form
    setFormData({
      employeeName: null,
      month: '15/11/2023',
      basicSalary: '1,000.00',
      salaryCurrency: currencyOptions[0],
      allowances: '0.00',
      deductions: '0.00',
      deductionType: 'Bonus',
      overtimeHours: '0',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Payroll</h2>
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
              {/* Employee Name */}
              <HrSelectMenu
                name="employeeName"
                label="Employee Name"
                placeholder="Select employee"
                options={employeeOptions}
                value={formData.employeeName}
                onChange={(option) => handleSelectChange('employeeName', option as Option)}
                required
              />

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basic Salary
                </label>
                <div className="flex gap-2">
                  <HrInput
                    variant="number"
                    name="basicSalary"
                    value={formData.basicSalary}
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

              <HrInput
                label="Deductions"
                variant="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                icon={DollarSign}
                iconPosition="left"
              />

              <HrInput
                label="Deduction Type"
                variant="text"
                name="deductionType"
                value={formData.deductionType}
                onChange={handleChange}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <HrInput
                label="Month"
                variant="date"
                name="month"
                value={formData.month}
                onChange={handleChange}
              />

              <HrInput
                label="Allowances"
                variant="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                icon={DollarSign}
                iconPosition="left"
              />

              <HrInput
                label="Overtime Hours"
                variant="number"
                name="overtimeHours"
                value={formData.overtimeHours}
                onChange={handleChange}
                icon={Clock}
                iconPosition="left"
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
              Create Payroll
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayrollModal;

