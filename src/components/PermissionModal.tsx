import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: string[]) => void;
  user: any;
  roles: any[];
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

const PermissionModal = ({ isOpen, onClose, onSave, user, roles }: PermissionModalProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setSelectedPermissions(user.permissions || []);
    }
  }, [user]);

  const togglePermission = (permission: string) => {
    if (permission === 'All') {
      setSelectedPermissions(selectedPermissions.includes('All') ? [] : ['All']);
    } else {
      setSelectedPermissions(prev => {
        const newPerms = prev.includes(permission)
          ? prev.filter(p => p !== permission)
          : [...prev.filter(p => p !== 'All'), permission];
        return newPerms;
      });
    }
  };

  const handleSave = () => {
    onSave(selectedPermissions);
    onClose();
  };

  if (!isOpen || !user) return null;

  const rolePermissions = roles.find(r => r.name === user.role)?.permissions || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Permissions</h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure permissions for {user.name} ({user.role})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Role Default Permissions:</h3>
            <div className="flex flex-wrap gap-2">
              {rolePermissions.map((perm, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => togglePermission('All')}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  selectedPermissions.includes('All')
                    ? 'bg-primary border-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedPermissions.includes('All') && (
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
                    selectedPermissions.includes(permission) || selectedPermissions.includes('All')
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}>
                    {(selectedPermissions.includes(permission) || selectedPermissions.includes('All')) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span className="text-gray-900">{permission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;

