import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { API_ENDPOINTS } from '../../../config/endpoints';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
  const { control, setValue } = useForm<{
    department: AsyncSelectOption | null;
    status: Option<number> | null;
  }>({
    defaultValues: {
      department: selectedDepartment,
      status: selectedStatus,
    },
  });

  // keep form values synced with parent state
  useEffect(() => {
    setValue('department', selectedDepartment);
  }, [selectedDepartment, setValue]);
  useEffect(() => {
    setValue('status', selectedStatus);
  }, [selectedStatus, setValue]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-48">
        <HrAsyncSelectMenu
          name="department"
          placeholder="All Departments"
          control={control}
          onValueChange={onDepartmentFilter}
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
          control={control}
          onValueChange={onStatusFilter as any}
          isSearchable={false}
          isClearable
        />
      </div>
    </div>
  );
};

export default EmployeesFilters;
