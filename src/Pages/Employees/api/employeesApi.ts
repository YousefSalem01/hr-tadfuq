import { api } from '../../../services/api';
import { API_ENDPOINTS, buildQueryParams } from '../../../config/endpoints';
import type { EmployeesResponse, EmployeeFormData } from '../types';

export interface StatusApiItem {
  id: number;
  name: string;
}

export type EmployeesListParams = {
  page: number;
  limit: number;
  search?: string;
  department?: number | string;
  status?: number | string;
};

export type ExportEmployeesResponse = {
  success: boolean;
  message: string;
  data: {
    download_url: string;
    filename: string;
    format: string;
    total_records: number;
  };
};

export async function listEmployees(params: EmployeesListParams) {
  const query = buildQueryParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    department: params.department,
    status: params.status,
  });

  return api.get<EmployeesResponse>(`${API_ENDPOINTS.EMPLOYEES.LIST}?${query}`);
}

export async function getEmployeeStatuses() {
  return api.get<StatusApiItem[]>(API_ENDPOINTS.EMPLOYEES.STATUSES);
}

export async function createEmployee(payload: Record<string, any>) {
  return api.post<any>(API_ENDPOINTS.EMPLOYEES.LIST, payload);
}

export async function updateEmployee(id: number | string, patch: Record<string, any>) {
  return api.patch<any>(API_ENDPOINTS.EMPLOYEES.DETAIL(id), patch);
}

export async function deleteEmployee(id: number | string) {
  return api.delete<any>(API_ENDPOINTS.EMPLOYEES.DETAIL(id));
}

export async function importEmployeesFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return api.postFormData<any>(API_ENDPOINTS.EMPLOYEES.IMPORT, formData);
}

export async function exportEmployees() {
  return api.get<ExportEmployeesResponse>(API_ENDPOINTS.EMPLOYEES.EXPORT);
}

// Convenience type export for callers that already use this shape
export type { EmployeeFormData };

