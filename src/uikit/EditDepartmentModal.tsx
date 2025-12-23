import { X, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrSelectMenu from './HrSelectMenu/HrSelectMenu';
import { employeeOptions, departmentNameOptions, SelectOption } from '../data/mock';
import { SingleValue } from 'react-select';

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  department: {
    id: number;
    name: string;
    headOfDepartment: string;
    description: string;
  } | null;
}

const EditDepartmentModal = ({ isOpen, onClose, onSubmit, department }: EditDepartmentModalProps) => {
  const [formData, setFormData] = useState({
    departmentName: '',
    headOfDepartment: '',
    description: '',
  });

  useEffect(() => {
    if (department) {
      setFormData({
        departmentName: department.name,
        headOfDepartment: department.headOfDepartment,
        description: department.description,
      });
    }
  }, [department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, option: SelectOption | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: option ? option.value : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: department?.id });
    onClose();
  };

  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Department</h2>
            <p className="text-sm text-gray-500 mt-1">Update department information.</p>
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
            {/* Department Name */}
            <HrSelectMenu
              name="departmentName"
              label="Department Name"
              placeholder="Select or type department name"
              options={departmentNameOptions}
              value={departmentNameOptions.find(option => option.value === formData.departmentName) || null}
              onChange={(option) => handleSelectChange('departmentName', option as SingleValue<SelectOption>)}
              required
            />

            {/* Head of Department */}
            <HrSelectMenu
              name="headOfDepartment"
              label="Head of Department"
              placeholder="Select employee"
              options={employeeOptions}
              value={employeeOptions.find(option => option.value === formData.headOfDepartment) || null}
              onChange={(option) => handleSelectChange('headOfDepartment', option as SingleValue<SelectOption>)}
            />

            {/* Description */}
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
              Update
            </HrButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentModal;

