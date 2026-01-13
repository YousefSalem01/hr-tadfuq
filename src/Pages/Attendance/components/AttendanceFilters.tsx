import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HrSelectMenu, { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import HrAsyncSelectMenu, { AsyncSelectOption } from '../../../uikit/HrAsyncSelectMenu/HrAsyncSelectMenu';
import HrInput from '../../../uikit/HrInput/HrInput';
import { API_ENDPOINTS } from '../../../config/endpoints';

interface AttendanceFiltersProps {
  selectedDepartment: AsyncSelectOption | null;
  selectedStatus: Option<string> | null;
  statusOptions: Option<string>[];
  startDate: string;
  endDate: string;
  onDepartmentFilter: (option: AsyncSelectOption | null) => void;
  onStatusFilter: (option: Option<string> | readonly Option<string>[] | null) => void;
  onStartDateFilter: (date: string) => void;
  onEndDateFilter: (date: string) => void;
}

const AttendanceFilters = ({
  selectedDepartment,
  selectedStatus,
  statusOptions,
  startDate,
  endDate,
  onDepartmentFilter,
  onStatusFilter,
  onStartDateFilter,
  onEndDateFilter,
}: AttendanceFiltersProps) => {
  const { control, setValue, watch } = useForm<{
    department: AsyncSelectOption | null;
    status: Option<string> | null;
    startDate: string;
    endDate: string;
  }>({
    defaultValues: {
      department: selectedDepartment,
      status: selectedStatus,
      startDate: startDate,
      endDate: endDate,
    },
  });

  // Keep form values synced with parent state
  useEffect(() => {
    setValue('department', selectedDepartment);
  }, [selectedDepartment, setValue]);

  useEffect(() => {
    setValue('status', selectedStatus);
  }, [selectedStatus, setValue]);

  useEffect(() => {
    setValue('startDate', startDate);
  }, [startDate, setValue]);

  useEffect(() => {
    setValue('endDate', endDate);
  }, [endDate, setValue]);

  // Watch date changes
  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');

  useEffect(() => {
    if (watchStartDate !== startDate) {
      onStartDateFilter(watchStartDate);
    }
  }, [watchStartDate]);

  useEffect(() => {
    if (watchEndDate !== endDate) {
      onEndDateFilter(watchEndDate);
    }
  }, [watchEndDate]);

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
      <div className="w-44">
        <HrInput
          name="startDate"
          variant="date"
          placeholder="Start Date"
          control={control}
        />
      </div>
      <div className="w-44">
        <HrInput
          name="endDate"
          variant="date"
          placeholder="End Date"
          control={control}
        />
      </div>
    </div>
  );
};

export default AttendanceFilters;
