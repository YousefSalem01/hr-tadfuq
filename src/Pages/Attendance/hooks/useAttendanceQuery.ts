import { useQuery } from '@tanstack/react-query';
import { listAttendance, ListAttendanceParams } from '../api/attendanceApi';

export const ATTENDANCE_QUERY_KEY = ['attendance', 'list'] as const;

export interface UseAttendanceQueryParams extends ListAttendanceParams {}

/**
 * React Query hook for fetching paginated attendance list
 */
export function useAttendanceQuery(params: UseAttendanceQueryParams) {
  return useQuery({
    queryKey: [...ATTENDANCE_QUERY_KEY, params],
    queryFn: () => listAttendance(params),
    enabled: true,
  });
}
