import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Users as UsersIcon,
  Shield,
  Edit,
  Trash2,
  Key,
  UserCheck
} from 'lucide-react';
import AddUserModal from '../../components/AddUserModal';
import EditUserModal from '../../components/EditUserModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import PermissionModal from '../../components/PermissionModal';
import AddRoleModal from '../../components/AddRoleModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  permissions: string[];
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const initialUsers: User[] = [
  { id: 1, name: 'Mohamed Ali', email: 'mohamed.ali@company.com', role: 'Admin', status: 'Active', permissions: ['All'] },
  { id: 2, name: 'Sarah Ahmed', email: 'sarah.ahmed@company.com', role: 'HR Manager', status: 'Active', permissions: ['Employees', 'Leaves', 'Payroll'] },
  { id: 3, name: 'Ahmed Hassan', email: 'ahmed.hassan@company.com', role: 'Manager', status: 'Active', permissions: ['Employees', 'Attendance'] },
  { id: 4, name: 'Fatima Ali', email: 'fatima.ali@company.com', role: 'Employee', status: 'Active', permissions: ['View Only'] },
];

const initialRoles: Role[] = [
  { id: 1, name: 'Admin', description: 'Full system access', permissions: ['All'], userCount: 1 },
  { id: 2, name: 'HR Manager', description: 'HR operations management', permissions: ['Employees', 'Leaves', 'Payroll', 'Documents'], userCount: 1 },
  { id: 3, name: 'Manager', description: 'Team management', permissions: ['Employees', 'Attendance', 'Leaves'], userCount: 1 },
  { id: 4, name: 'Employee', description: 'Basic access', permissions: ['View Only'], userCount: 1 },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-500' : 'bg-gray-500';
  };

  const getStatusTextColor = (status: string) => {
    return status === 'Active' ? 'text-green-700' : 'text-gray-700';
  };

  const handleAddUser = (data: any) => {
    const newUser: User = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      role: data.role,
      status: 'Active',
      permissions: roles.find(r => r.name === data.role)?.permissions || [],
    };
    setUsers([...users, newUser]);
    // Update role user count
    setRoles(roles.map(role => 
      role.name === data.role 
        ? { ...role, userCount: role.userCount + 1 }
        : role
    ));
  };

  const handleEditUser = (data: any) => {
    setUsers(users.map(user => 
      user.id === data.id 
        ? { ...user, name: data.name, email: data.email, role: data.role }
        : user
    ));
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      // Update role user count
      setRoles(roles.map(role => 
        role.name === selectedUser.role 
          ? { ...role, userCount: Math.max(0, role.userCount - 1) }
          : role
      ));
      setSelectedUser(null);
    }
  };

  const handleUpdatePermissions = (permissions: string[]) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, permissions }
          : user
      ));
    }
  };

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

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const openPermissionModal = (user: User) => {
    setSelectedUser(user);
    setIsPermissionModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
          >
            <Plus size={16} />
            Add User
          </button>
        )}
        {activeTab === 'roles' && (
          <button 
            onClick={() => setIsAddRoleModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
          >
            <Plus size={16} />
            Create Role
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'users'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <UsersIcon size={18} />
              Users
            </div>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'roles'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield size={18} />
              Roles & Permissions
            </div>
          </button>
        </div>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Permissions</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{user.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                          <span className={`text-sm font-medium ${getStatusTextColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Key size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {user.permissions.length} permission{user.permissions.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openPermissionModal(user)}
                            className="p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600"
                            title="Manage Permissions"
                          >
                            <Key size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
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
      )}

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
        roles={roles}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditUser}
        user={selectedUser}
        roles={roles}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        itemName={selectedUser?.name || ''}
      />

      <PermissionModal
        isOpen={isPermissionModalOpen}
        onClose={() => {
          setIsPermissionModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={handleUpdatePermissions}
        user={selectedUser}
        roles={roles}
      />

      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onSubmit={handleAddRole}
      />
    </div>
  );
};

export default Users;

