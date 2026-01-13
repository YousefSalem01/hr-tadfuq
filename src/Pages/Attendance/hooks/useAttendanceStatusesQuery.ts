import { useQuery } from '@tanstack/react-query';
import { getAttendanceStatuses } from '../api/attendanceApi';
import { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';

export const ATTENDANCE_STATUSES_QUERY_KEY = ['attendance', 'statuses'] as const;

/**
 * React Query hook for fetching attendance statuses (for filters)
 * TODO: Enable once backend ready
 */
export function useAttendanceStatusesQuery() {
  return useQuery({
    queryKey: ATTENDANCE_STATUSES_QUERY_KEY,
    queryFn: async () => {
      const data = await getAttendanceStatuses();
      // Map to Option shape for HrSelectMenu
      const options: Option<number>[] = data.map((s) => ({
        value: s.id,
        label: s.name,
      }));
      return options;
    },
    staleTime: Infinity,
    // TODO: Set enabled to true when backend is ready
    enabled: false,
  });
}
