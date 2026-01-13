import { useQuery } from '@tanstack/react-query';
import { listAttendance, ListAttendanceParams } from '../api/attendanceApi';

export const ATTENDANCE_QUERY_KEY = ['attendance', 'list'] as const;

export interface UseAttendanceQueryParams extends ListAttendanceParams {}

/**
 * React Query hook for fetching paginated attendance list
 * TODO: Enable once backend ready, currently disabled by default
 */
export function useAttendanceQuery(params: UseAttendanceQueryParams) {
  return useQuery({
    queryKey: [...ATTENDANCE_QUERY_KEY, params],
    queryFn: () => listAttendance(params),
    // TODO: Set enabled to true when backend is ready
    enabled: false,
  });
}
