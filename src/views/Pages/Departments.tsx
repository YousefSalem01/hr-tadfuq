import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus,
  Trash2,
  Edit,
  Users
} from 'lucide-react';
import AddDepartmentModal from '../../components/AddDepartmentModal';
import EditDepartmentModal from '../../components/EditDepartmentModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { departmentsAPI, employeesAPI } from '../../services/api';

interface Department {
  id: number;
  name: string;
  head_of_department?: string;
  headOfDepartment?: string;
  description: string;
  employee_count?: number;
  employeeCount?: number;
  employees?: string[];
}

const Departments = () => {
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await departmentsAPI.getAll({ search: searchTerm || undefined });
      if (response.success) {
        // Map API response to match component interface
        const mappedDepartments = await Promise.all(
          response.data.map(async (dept: any) => {
            // Get employee initials for this department
            const empResponse = await employeesAPI.getAll({ department: dept.name, per_page: 3 });
            const employees = empResponse.success ? empResponse.data : [];
            const initials = employees.map((emp: any) => {
              const names = emp.name.split(' ');
              return (names[0]?.[0] || '') + (names[1]?.[0] || '');
            });

            return {
              ...dept,
              headOfDepartment: dept.head_of_department || dept.headOfDepartment || '',
              employeeCount: dept.employee_count || dept.employeeCount || 0,
              employees: initials,
            };
          })
        );
        setDepartmentsList(mappedDepartments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [searchTerm]);

  const handleAddDepartment = async (data: any) => {
    try {
      const response = await departmentsAPI.create({
        departmentName: data.departmentName,
        headOfDepartment: data.headOfDepartment,
        description: data.description,
      });
      if (response.success) {
        fetchDepartments();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department. Please try again.');
    }
  };

  const handleEditDepartment = async (data: any) => {
    if (!selectedDepartment) return;
    
    try {
      const response = await departmentsAPI.update(selectedDepartment.id, {
        departmentName: data.departmentName,
        headOfDepartment: data.headOfDepartment,
        description: data.description,
      });
      if (response.success) {
        fetchDepartments();
        setIsEditModalOpen(false);
        setSelectedDepartment(null);
      }
    } catch (error) {
      console.error('Error updating department:', error);
      alert('Failed to update department. Please try again.');
    }
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    
    try {
      const response = await departmentsAPI.delete(selectedDepartment.id);
      if (response.success) {
        fetchDepartments();
        setIsDeleteModalOpen(false);
        setSelectedDepartment(null);
      }
    } catch (error: any) {
      console.error('Error deleting department:', error);
      alert(error.message || 'Failed to delete department. Please try again.');
    }
  };

  const openEditModal = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage company departments and structure</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add Department
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-8 text-gray-500">Loading departments...</div>
        ) : departmentsList.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">No departments found</div>
        ) : (
          departmentsList.map((department) => (
          <div key={department.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{department.name}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openEditModal(department)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => openDeleteModal(department)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Head of Department */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Head of Department</div>
              <div className="text-sm font-semibold text-gray-900">{department.headOfDepartment || department.head_of_department || 'N/A'}</div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Description</div>
              <div className="text-sm text-gray-700">{department.description}</div>
            </div>

            {/* Employees */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="text-gray-400" size={18} />
                <span className="text-sm text-gray-700">{department.employeeCount || department.employee_count || 0} Employees</span>
              </div>
              <div className="flex items-center -space-x-2">
                {(department.employees || []).map((initial, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 border-2 border-white"
                  >
                    {initial}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Add Department Modal */}
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddDepartment}
      />

      {/* Edit Department Modal */}
      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDepartment(null);
        }}
        onSubmit={handleEditDepartment}
        department={selectedDepartment}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDepartment(null);
        }}
        onConfirm={handleDeleteDepartment}
        itemName={selectedDepartment?.name || ''}
      />
    </div>
  );
};

export default Departments;

