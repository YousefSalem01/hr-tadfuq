// Attendance record returned by API
export interface AttendanceRecord {
  id: number;
  employee_id: number;
  employee_name: string;
  department: string;
  department_id: number | null;
  check_in: string | null;
  check_out: string | null;
  hours: string;
  status: string;
  date: string;
  created_at: string;
  updated_at: string;
}

// Summary stats from API
export interface AttendanceSummary {
  total: number;
  present: number;
  late: number;
  remote: number;
  absent: number;
}

// Pagination fields from API
export interface AttendancePagination {
  current_page: number;
  total_records: number;
  total_pages: number;
  limit: number;
  has_next: boolean;
  has_previous: boolean;
}

// Full list response shape
export interface AttendanceData {
  items: AttendanceRecord[];
  pagination: AttendancePagination;
  summary: AttendanceSummary;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  data: AttendanceData;
}

// Chart data item
export interface AttendanceChartItem {
  name: string;
  value: number;
  color: string;
}
