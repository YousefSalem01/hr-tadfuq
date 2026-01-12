import { Filter } from 'lucide-react';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { departmentOptions, statusOptions } from '../../../data/mock';

interface EmployeesFiltersProps {
  selectedDepartment: Option | null;
  selectedStatus: Option | null;
  onDepartmentFilter: (option: Option | readonly Option[] | null) => void;
  onStatusFilter: (option: Option | readonly Option[] | null) => void;
}

const EmployeesFilters = ({
  selectedDepartment,
  selectedStatus,
  onDepartmentFilter,
  onStatusFilter,
}: EmployeesFiltersProps) => {
  return (
    <div className="flex items-center gap-3">
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
  );
};

export default EmployeesFilters;
