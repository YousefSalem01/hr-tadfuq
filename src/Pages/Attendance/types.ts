// Attendance record returned by API
export interface AttendanceRecord {
  id: number;
  employee: number;
  employee_name: string;
  department: string;
  branch: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  late_minutes: number;
  overtime_hours: string;
  hours_worked: string;
  status: string;
  status_display: string;
  notes: string;
}

// Summary stats from API
export interface AttendanceSummary {
  total_records: number;
  present_today: number;
  absent_today: number;
  late_today: number;
  on_leave_today: number;
  average_late_minutes: number;
  total_overtime_hours: number;
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
