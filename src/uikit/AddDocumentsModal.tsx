import { X, FileText, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrUpload from './HrUpload/HrUpload';
import HrSelectMenu, { Option } from './HrSelectMenu/HrSelectMenu';
import { mockEmployees, departmentOptions, documentTypeOptions } from '../data/mock';

interface AddDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddDocumentsModal = ({ isOpen, onClose, onSubmit }: AddDocumentsModalProps) => {
  const employeeOptions: Option[] = mockEmployees.map(emp => ({
    value: emp.name,
    label: emp.name,
  }));

  const [formData, setFormData] = useState({
    employeeName: null as Option | null,
    department: null as Option | null,
    documentType: null as Option | null,
    issuer: '',
    issueDate: '15/11/2023',
    expireDate: '15/11/2023',
    reason: 'Emergency medical leave',
  });

  const [_uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    onSubmit({
      ...formData,
      employeeName: formData.employeeName?.value || '',
      department: formData.department?.value || '',
      documentType: formData.documentType?.value || '',
    });
    onClose();
    // Reset form
    setFormData({
      employeeName: null,
      department: null,
      documentType: null,
      issuer: '',
      issueDate: '15/11/2023',
      expireDate: '15/11/2023',
      reason: 'Emergency medical leave',
    });
    setUploadedFiles([]);
  };

  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files);
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
              <HrSelectMenu
                name="employeeName"
                label="Employee Name"
                placeholder="Select employee"
                options={employeeOptions}
                value={formData.employeeName}
                onChange={(option) => handleSelectChange('employeeName', option as Option)}
                required
              />

              {/* Document Type */}
              <HrSelectMenu
                name="documentType"
                label="Document Type"
                placeholder="Select Type"
                options={documentTypeOptions}
                value={formData.documentType}
                onChange={(option) => handleSelectChange('documentType', option as Option)}
                required
              />

              <HrInput
                label="Issue Date"
                variant="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
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

              <HrInput
                label="Issuer"
                variant="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="Type issuer"
                icon={UserIcon}
                iconPosition="left"
              />

              <HrInput
                label="Expire Date"
                variant="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Attachment Section */}
          <div className="mt-6">
            <HrUpload
              label="Attachment"
              accept=".pdf,.doc,.docx"
              maxSize={10}
              multiple
              onChange={handleFileChange}
              helperText="Do not upload confidential information"
            />
          </div>

          {/* Reason Text Area */}
          <div className="mt-6">
            <HrInput
              label="Reason"
              variant="textarea"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              icon={FileText}
              iconPosition="left"
            />
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
              Create Document
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentsModal;

