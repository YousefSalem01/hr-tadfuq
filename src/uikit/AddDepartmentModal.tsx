import { X, Building, User, FileText } from 'lucide-react';
import { useState } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddDepartmentModal = ({ isOpen, onClose, onSubmit }: AddDepartmentModalProps) => {
  const [formData, setFormData] = useState({
    departmentName: '',
    headOfDepartment: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      departmentName: '',
      headOfDepartment: '',
      description: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Department</h2>
            <p className="text-sm text-gray-500 mt-1">Create a new department in your organization.</p>
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
          <div className="space-y-6">
            <HrInput
              label="Department Name"
              variant="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              placeholder="e.g., Engineering"
              icon={Building}
              iconPosition="left"
              required
            />

            <HrInput
              label="Head of Department"
              variant="text"
              name="headOfDepartment"
              value={formData.headOfDepartment}
              onChange={handleChange}
              placeholder="e.g., Ali Maged"
              icon={User}
              iconPosition="left"
            />

            <HrInput
              label="Description"
              variant="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the department"
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
              Create
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentModal;

