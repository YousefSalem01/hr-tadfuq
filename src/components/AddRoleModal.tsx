import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const allPermissions = [
  'Dashboard',
  'Employees',
  'Attendance',
  'Leaves',
  'Payroll',
  'Advance',
  'Documents',
  'Departments',
  'Users',
  'Settings',
];

const AddRoleModal = ({ isOpen, onClose, onSubmit }: AddRoleModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const togglePermission = (permission: string) => {
    if (permission === 'All') {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.includes('All') ? [] : ['All'],
      }));
    } else {
      setFormData(prev => {
        const newPerms = prev.permissions.includes(permission)
          ? prev.permissions.filter(p => p !== permission && p !== 'All')
          : [...prev.permissions.filter(p => p !== 'All'), permission];
        return {
          ...prev,
          permissions: newPerms,
        };
      });
    }
  };

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
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Role</h2>
            <p className="text-sm text-gray-500 mt-1">Define a new role with specific permissions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., HR Manager"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the role"
                rows={3}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Permissions <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => togglePermission('All')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    formData.permissions.includes('All')
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}>
                    {formData.permissions.includes('All') && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">All Permissions</span>
                </div>
              </div>

              {allPermissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => togglePermission(permission)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      formData.permissions.includes(permission) || formData.permissions.includes('All')
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                    }`}>
                      {(formData.permissions.includes(permission) || formData.permissions.includes('All')) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="text-gray-900">{permission}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
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
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;

