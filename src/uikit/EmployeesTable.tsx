import { Trash2, Edit, HelpCircle } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  username: string;
  role: string;
  avatar?: string;
}

const employees: Employee[] = [
  { id: 1, name: 'Olivia Rhye', username: '@olivia', role: 'Product Designer' },
  { id: 2, name: 'Phoenix Baker', username: '@phoenix', role: 'Product Manager' },
  { id: 3, name: 'Lana Steiner', username: '@lana', role: 'Frontend Developer' },
  { id: 4, name: 'Demi Wilkinson', username: '@demi', role: 'Backend Developer' },
  { id: 5, name: 'Candice Wu', username: '@candice', role: 'Fullstack Developer' },
  { id: 6, name: 'Natali Craig', username: '@natali', role: 'UX Designer' },
];

const EmployeesTable = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Employees</h3>
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          View All
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-1">
                  Role
                  <HelpCircle size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                      {getInitials(employee.name)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.username}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-700">{employee.role}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600">
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
  );
};

export default EmployeesTable;

