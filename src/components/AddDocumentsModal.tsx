import { X, Calendar, ChevronDown, Upload } from 'lucide-react';
import { useState } from 'react';

interface AddDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddDocumentsModal = ({ isOpen, onClose, onSubmit }: AddDocumentsModalProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    documentType: '',
    issuer: '',
    issueDate: '15/11/2023',
    expireDate: '15/11/2023',
    reason: 'Emergency medical leave',
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      documentType: '',
      issuer: '',
      issueDate: '15/11/2023',
      expireDate: '15/11/2023',
      reason: 'Emergency medical leave',
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Documents</h2>
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

              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <div className="relative">
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Certificate">Certificate</option>
                    <option value="License">License</option>
                    <option value="Passport">Passport</option>
                    <option value="Visa">Visa</option>
                    <option value="ID Card">ID Card</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Issue Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
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

              {/* Issuer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="Type issuer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Expire Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expire Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="expireDate"
                    value={formData.expireDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Attachment Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="text-primary mb-3" size={32} />
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-gray-500">
                  Drag and drop files here or browse to upload. Only PDFs and DOCs are allowed. Do not upload confidential information.
                </p>
              </div>
            </div>
          </div>

          {/* Reason Text Area */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Create Advance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentsModal;

