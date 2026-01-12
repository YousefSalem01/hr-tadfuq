// Dashboard types
export interface DashboardEmployee {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
  status_display: string;
  department: string | null;
  department_id: number | null;
  branch: string | null;
  branch_id: number | null;
  join_date: string | null;
  salary: string | null;
  address: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardSummary {
  total_employees: number;
  active_employees: number;
  on_leave_employees: number;
  inactive_employees: number;
  present_today: number;
  absent_today: number;
  pending_leaves: number;
  approved_leaves_today: number;
}

export interface RecentActivity {
  id: number;
  employee: string;
  employee_id: number;
  action: string;
  status: string;
  description: string;
  created_at: string;
  created_by: string | null;
}

export interface DepartmentDistribution {
  department: string;
  count: number;
  percentage: number;
  percentage_display: string;
}

export interface DashboardPagination {
  current_page: number;
  total_records: number;
  total_pages: number;
  limit: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface DashboardData {
  dashboardEmployee: DashboardEmployee[];
  pagination: DashboardPagination;
  summary: DashboardSummary;
  recent_activities: RecentActivity[];
  department_distribution: DepartmentDistribution[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}


