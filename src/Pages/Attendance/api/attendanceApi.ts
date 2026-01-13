import { api } from '../../../services/api';
import { API_ENDPOINTS, buildQueryParams } from '../../../config/endpoints';
import type { AttendanceResponse } from '../types';

export interface ListAttendanceParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: number | string;
  status?: number | string;
  date?: string; // e.g. '2024-01-15' or date range
}

/**
 * Fetch paginated attendance list with optional filters
 */
export async function listAttendance(params: ListAttendanceParams): Promise<AttendanceResponse> {
  // TODO: Replace mock with real API call when backend ready
  const query = buildQueryParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    department: params.department,
    status: params.status,
    date: params.date,
  });
  const url = query ? `${API_ENDPOINTS.ATTENDANCE.LIST}?${query}` : API_ENDPOINTS.ATTENDANCE.LIST;
  return api.get<AttendanceResponse>(url);
}

interface StatusApiItem {
  id: number;
  name: string;
}

/**
 * Fetch attendance status options for filters
 */
export async function getAttendanceStatuses(): Promise<StatusApiItem[]> {
  // TODO: Replace mock with real API call when backend ready
  return api.get<StatusApiItem[]>(API_ENDPOINTS.ATTENDANCE.STATUSES);
}

/**
 * Create a new attendance record (manual entry)
 */
export async function createAttendance(payload: Record<string, any>) {
  // TODO: Implement when backend ready
  return api.post(API_ENDPOINTS.ATTENDANCE.LIST, payload);
}

/**
 * Update an existing attendance record
 */
export async function updateAttendance(id: number | string, patch: Record<string, any>) {
  // TODO: Implement when backend ready
  return api.patch(API_ENDPOINTS.ATTENDANCE.DETAIL(id), patch);
}

/**
 * Delete an attendance record
 */
export async function deleteAttendance(id: number | string) {
  // TODO: Implement when backend ready
  return api.delete(API_ENDPOINTS.ATTENDANCE.DETAIL(id));
}

/**
 * Import attendance records from file
 */
export async function importAttendanceFile(file: File) {
  // TODO: Implement when backend ready
  const formData = new FormData();
  formData.append('file', file);
  return api.postFormData(API_ENDPOINTS.ATTENDANCE.IMPORT, formData);
}

interface ExportResponse {
  success: boolean;
  message: string;
  data: {
    download_url: string;
    filename: string;
    format: string;
    total_records: number;
  };
}

/**
 * Export attendance records
 */
export async function exportAttendance(): Promise<ExportResponse> {
  // TODO: Implement when backend ready
  return api.get<ExportResponse>(API_ENDPOINTS.ATTENDANCE.EXPORT);
}
