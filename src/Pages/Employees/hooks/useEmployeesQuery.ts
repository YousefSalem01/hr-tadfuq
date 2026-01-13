import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { EmployeesData } from '../types';
import { listEmployees, type EmployeesListParams } from '../api/employeesApi';

export const employeesQueryKey = (params: EmployeesListParams) =>
  [
    'employees',
    'list',
    {
      page: params.page,
      limit: params.limit,
      search: params.search ?? '',
      department: params.department ?? '',
      status: params.status ?? '',
    },
  ] as const;

export function useEmployeesQuery(params: EmployeesListParams) {
  return useQuery<EmployeesData>({
    queryKey: employeesQueryKey(params),
    queryFn: async () => {
      const res = await listEmployees(params);
      if (!res?.success) {
        throw new Error(res?.message || 'Failed to fetch employees');
      }
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

