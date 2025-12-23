import { useState } from 'react';
import { 
  Plus, 
  Shield,
  UserCheck
} from 'lucide-react';
import AddRoleModal from '../uikit/AddRoleModal';
import HrButton from '../uikit/HrButton/HrButton';
import { mockRoles, Role } from '../data/mock';

const Users = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  const handleAddRole = (data: any) => {
    const newRole: Role = {
      id: roles.length + 1,
      name: data.name,
      description: data.description,
      permissions: data.permissions,
      userCount: 0,
    };
    setRoles([...roles, newRole]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage roles and permissions</p>
        </div>
        <HrButton 
          variant="primary"
          icon={Plus}
          onClick={() => setIsAddRoleModalOpen(true)}
        >
          Create Role
        </HrButton>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Shield className="text-blue-600" size={24} />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <UserCheck size={16} />
                <span>{role.userCount}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{role.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{role.description}</p>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-700 mb-2">Permissions:</div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onSubmit={handleAddRole}
      />
    </div>
  );
};

export default Users;

