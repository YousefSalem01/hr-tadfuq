import { Filter } from 'lucide-react';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { endpoints } from '../../../config/endpoints';

interface EmployeesFiltersProps {
  selectedDepartment: AsyncSelectOption | null;
  selectedStatus: Option | null;
  statusOptions: Option[];
  onDepartmentFilter: (option: AsyncSelectOption | null) => void;
  onStatusFilter: (option: Option | readonly Option[] | null) => void;
}

const EmployeesFilters = ({
  selectedDepartment,
  selectedStatus,
  statusOptions,
  onDepartmentFilter,
  onStatusFilter,
}: EmployeesFiltersProps) => {
  return (
    <div className="flex items-center gap-3">
      <HrButton variant="icon" icon={Filter} />
      <div className="w-48">
        <HrAsyncSelectMenu
          name="department"
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={onDepartmentFilter}
          endpoint={endpoints.departments}
          dataKey="items"
          labelKey="name"
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
