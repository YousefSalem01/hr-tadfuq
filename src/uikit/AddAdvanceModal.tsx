import { X, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';

interface AddAdvanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddAdvanceModal = ({ isOpen, onClose, onSubmit }: AddAdvanceModalProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    advanceType: '',
    requestedAmount: '1,000.00',
    amountCurrency: 'USD',
    requestDate: '15/11/2023',
    repaymentStartDate: '15/11/2023',
    paymentMethod: '',
    repaymentPeriod: '5',
    repaymentPeriodUnit: 'Months',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      employeeName: '',
      department: '',
      advanceType: '',
      requestedAmount: '1,000.00',
      amountCurrency: 'USD',
      requestDate: '15/11/2023',
      repaymentStartDate: '15/11/2023',
      paymentMethod: '',
      repaymentPeriod: '5',
      repaymentPeriodUnit: 'Months',
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <div className="relative">
                  <select
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">select employee</option>
                    <option value="Olivia Rhye">Olivia Rhye</option>
                    <option value="Liam Smith">Liam Smith</option>
                    <option value="Ava Johnson">Ava Johnson</option>
                    <option value="Noah Brown">Noah Brown</option>
                    <option value="Isabella Davis">Isabella Davis</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Advance Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Type
                </label>
                <div className="relative">
                  <select
                    name="advanceType"
                    value={formData.advanceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Salary Advance">Salary Advance</option>
                    <option value="Emergency Advance">Emergency Advance</option>
                    <option value="Travel Advance">Travel Advance</option>
                    <option value="Medical Advance">Medical Advance</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Request Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="relative">
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                    <option value="Direct Deposit">Direct Deposit</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
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
                    <option value="">select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Requested Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Amount
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 border border-gray-300 rounded-l-lg bg-gray-50">
                    <span className="text-gray-700">$</span>
                  </div>
                  <input
                    type="text"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <select
                    name="amountCurrency"
                    value={formData.amountCurrency}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>

              {/* Repayment Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repayment Start Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="repaymentStartDate"
                    value={formData.repaymentStartDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
                </div>
              </div>

              {/* Repayment period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repayment period
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <select
                    name="repaymentPeriodUnit"
                    value={formData.repaymentPeriodUnit}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
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

