import { Search, Filter } from 'lucide-react';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrInput from '../../../uikit/HrInput/HrInput';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { departmentOptions, statusOptions } from '../../../data/mock';

interface EmployeesFiltersProps {
  searchTerm: string;
  selectedDepartment: Option | null;
  selectedStatus: Option | null;
  onSearchChange: (value: string) => void;
  onDepartmentFilter: (option: Option | readonly Option[] | null) => void;
  onStatusFilter: (option: Option | readonly Option[] | null) => void;
}

const EmployeesFilters = ({
  searchTerm,
  selectedDepartment,
  selectedStatus,
  onSearchChange,
  onDepartmentFilter,
  onStatusFilter,
}: EmployeesFiltersProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <HrInput
            variant="text"
            name="employeeSearch"
            value={searchTerm}
            onChange={(e) => onSearchChange((e.target as HTMLInputElement).value)}
            placeholder="Search employees..."
            icon={Search}
            iconPosition="left"
          />
        </div>
        <HrButton variant="icon" icon={Filter} />
        <div className="w-48">
          <HrSelectMenu
            name="department"
            placeholder="All Departments"
            options={[{ value: '', label: 'All Departments' }, ...departmentOptions]}
            value={selectedDepartment}
            onChange={onDepartmentFilter}
            isSearchable={false}
          />
        </div>
        <div className="w-40">
          <HrSelectMenu
            name="status"
            placeholder="All Statuses"
            options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
            value={selectedStatus}
            onChange={onStatusFilter}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesFilters;
