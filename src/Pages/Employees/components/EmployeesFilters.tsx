import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { API_ENDPOINTS } from '../../../config/endpoints';

interface EmployeesFiltersProps {
  selectedDepartment: AsyncSelectOption | null;
  selectedStatus: Option<number> | null;
  statusOptions: Option<number>[];
  onDepartmentFilter: (option: AsyncSelectOption | null) => void;
    onStatusFilter: (option: Option<number> | readonly Option<number>[] | null) => void;
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
      <div className="w-48">
        <HrAsyncSelectMenu
          name="department"
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={onDepartmentFilter}
          endpoint={API_ENDPOINTS.DEPARTMENTS.LIST}
          dataKey="items"
          labelKey="name"
        />
      </div>
      <div className="w-40">
        <HrSelectMenu<number>
          name="status"
          placeholder="All Statuses"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusFilter}
          isSearchable={false}
          isClearable
        />
      </div>
    </div>
  );
};

export default EmployeesFilters;
