import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import HrButton from './HrButton/HrButton';
import HrInput from './HrInput/HrInput';
import HrSelectMenu, { Option } from './HrSelectMenu/HrSelectMenu';
import { mockEmployees } from '../data/mock';

interface EmployeeData {
  id: number;
  name: string;
  role: string;
}

interface EditEmployeeDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeData | null;
  onSave?: (employeeId: number, updates: { name: string; role: string }) => void;
}

const EditEmployeeDashboardModal = ({
  isOpen,
  onClose,
  employee,
  onSave,
}: EditEmployeeDashboardModalProps) => {
  const roleOptions = useMemo<Option<string>[]>(() => {
    const roles = Array.from(new Set(mockEmployees.map((e) => e.role)));
    return roles.map((role) => ({ value: role, label: role }));
  }, []);

  const [selectedRole, setSelectedRole] = useState<Option<string> | null>(null);
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    if (!employee) {
      setSelectedRole(null);
      setEmployeeName('');
      return;
    }
    const initial = roleOptions.find((o) => o.value === employee.role) ?? { value: employee.role, label: employee.role };
    setSelectedRole(initial);
    setEmployeeName(employee.name);
  }, [employee, roleOptions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Employee</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <HrInput
              label="Employee Name"
              variant="text"
              name="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName((e.target as HTMLInputElement).value)}
              placeholder="Enter employee name"
            />

            <HrSelectMenu<string>
              name="role"
              label="Role"
              placeholder="Select role"
              options={roleOptions}
              value={selectedRole}
              onChange={(value) => {
                if (Array.isArray(value)) return;
                setSelectedRole(value as Option<string> | null);
              }}
              isSearchable={true}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <HrButton variant="secondary" type="button" onClick={onClose}>
              Cancel
            </HrButton>
            <HrButton
              variant="primary"
              type="button"
              onClick={() => {
                if (employee && selectedRole?.value && employeeName.trim()) {
                  onSave?.(employee.id, { name: employeeName.trim(), role: selectedRole.value });
                }
                onClose();
              }}
              disabled={!employee || !selectedRole?.value || !employeeName.trim()}
            >
              Save
            </HrButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDashboardModal;


