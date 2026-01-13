import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from 'lucide-react';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import { API_ENDPOINTS } from '../../../config/endpoints';

interface AttendanceFiltersProps {
  selectedDepartment: AsyncSelectOption | null;
  selectedStatus: Option<string> | null;
  statusOptions: Option<string>[];
  onDepartmentFilter: (option: AsyncSelectOption | null) => void;
  onStatusFilter: (option: Option<string> | readonly Option<string>[] | null) => void;
}

const AttendanceFilters = ({
  selectedDepartment,
  selectedStatus,
  statusOptions,
  onDepartmentFilter,
  onStatusFilter,
}: AttendanceFiltersProps) => {
  const { control, setValue } = useForm<{
    department: AsyncSelectOption | null;
    status: Option<string> | null;
  }>({
    defaultValues: {
      department: selectedDepartment,
      status: selectedStatus,
    },
  });

  // Keep form values synced with parent state
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
      <div className="w-44">
        <HrSelectMenu<string>
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

export default AttendanceFilters;
