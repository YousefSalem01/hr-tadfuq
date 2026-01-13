import { useQuery } from '@tanstack/react-query';
import type { Option } from '../../../uikit/HrSelectMenu/HrSelectMenu';
import { getEmployeeStatuses } from '../api/employeesApi';

export const employeeStatusesQueryKey = ['employees', 'statuses'] as const;

export function useEmployeeStatusesQuery() {
  return useQuery<Option<number>[]>({
    queryKey: employeeStatusesQueryKey,
    queryFn: async () => {
      const res = await getEmployeeStatuses();
      if (!Array.isArray(res)) return [];
      return res.map((s) => ({ value: s.id, label: s.name }));
    },
    staleTime: 30 * 60 * 1000, // statuses rarely change
  });
}

