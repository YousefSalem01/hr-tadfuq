import { X } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrSelectMenu, { Option } from './HrSelectMenu/HrSelectMenu';
import { mockEmployees, departmentOptions, advanceTypeOptions, currencyOptions, paymentMethodOptions } from '../data/mock';

interface AddAdvanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddAdvanceModal = ({ isOpen, onClose, onSubmit }: AddAdvanceModalProps) => {
  const employeeOptions: Option[] = mockEmployees.map(emp => ({
    value: emp.name,
    label: emp.name,
  }));

  const repaymentPeriodUnitOptions: Option[] = [
    { value: 'Days', label: 'Days' },
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' },
  ];

  const [formData, setFormData] = useState({
    employeeName: null as Option | null,
    department: null as Option | null,
    advanceType: null as Option | null,
    requestedAmount: '1,000.00',
    amountCurrency: currencyOptions[0],
    requestDate: '15/11/2023',
    repaymentStartDate: '15/11/2023',
    paymentMethod: null as Option | null,
    repaymentPeriod: '5',
    repaymentPeriodUnit: repaymentPeriodUnitOptions[2], // Months
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
      department: formData.department?.value || '',
      advanceType: formData.advanceType?.value || '',
      amountCurrency: formData.amountCurrency.value,
      paymentMethod: formData.paymentMethod?.value || '',
      repaymentPeriodUnit: formData.repaymentPeriodUnit.value,
    });
    onClose();
    // Reset form
    setFormData({
      employeeName: null,
      department: null,
      advanceType: null,
      requestedAmount: '1,000.00',
      amountCurrency: currencyOptions[0],
      requestDate: '15/11/2023',
      repaymentStartDate: '15/11/2023',
      paymentMethod: null,
      repaymentPeriod: '5',
      repaymentPeriodUnit: repaymentPeriodUnitOptions[2],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Advance</h2>
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

              {/* Advance Type */}
              <HrSelectMenu
                name="advanceType"
                label="Advance Type"
                placeholder="Select Type"
                options={advanceTypeOptions}
                value={formData.advanceType}
                onChange={(option) => handleSelectChange('advanceType', option as Option)}
                required
              />

              <HrInput
                label="Request Date"
                variant="date"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
              />

              {/* Payment Method */}
              <HrSelectMenu
                name="paymentMethod"
                label="Payment Method"
                placeholder="Select Type"
                options={paymentMethodOptions}
                value={formData.paymentMethod}
                onChange={(option) => handleSelectChange('paymentMethod', option as Option)}
                required
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Department */}
              <HrSelectMenu
                name="department"
                label="Department"
                placeholder="Select Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(option) => handleSelectChange('department', option as Option)}
                required
              />

              {/* Requested Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Amount
                </label>
                <div className="flex gap-2">
                  <HrInput
                    variant="number"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    prefix="$"
                    containerClassName="flex-1"
                  />
                  <div className="w-32">
                    <HrSelectMenu
                      name="amountCurrency"
                      options={currencyOptions}
                      value={formData.amountCurrency}
                      onChange={(option) => handleSelectChange('amountCurrency', option as Option)}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <HrInput
                label="Repayment Start Date"
                variant="date"
                name="repaymentStartDate"
                value={formData.repaymentStartDate}
                onChange={handleChange}
              />

              {/* Repayment period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repayment period
                </label>
                <div className="flex gap-2">
                  <HrInput
                    variant="number"
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleChange}
                    containerClassName="flex-1"
                  />
                  <div className="w-32">
                    <HrSelectMenu
                      name="repaymentPeriodUnit"
                      options={repaymentPeriodUnitOptions}
                      value={formData.repaymentPeriodUnit}
                      onChange={(option) => handleSelectChange('repaymentPeriodUnit', option as Option)}
                      isSearchable={false}
                    />
                  </div>
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
              Create Advance
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdvanceModal;

