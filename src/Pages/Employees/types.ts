export interface DepartmentDetail {
  id: number;
  name: string;
  head_of_department: string;
  description: string;
  created_at: string;
}

export interface BranchDetail {
  id: number;
  name: string;
  manager: string;
  location: string;
  contact_number: string;
  contact: string;
  established: string | null;
}

export interface Employee {
  id: number;
  email: string;
  role: string;
  department: number | null;
  branch: number | null;
  join_date: string | null;
  salary: string;
  phone_number: string;
  address: string;
  emergency_contact: string;
  employee_name: string;
  department_detail: DepartmentDetail | null;
  branch_detail: BranchDetail | null;
  status: string;
  created_at: string;
  updated_at: string;
  has_user_account: boolean;
  user_id: number | null;
  username_display: string | null;
}

export interface EmployeesPagination {
  current_page: number;
  total_records: number;
  total_pages: number;
  limit: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface EmployeesSummary {
  total_employees: number;
  active_employees: number;
  on_leave_employees: number;
  inactive_employees: number;
  employees_with_user: number;
  employees_without_user: number;
}

export interface EmployeesData {
  items: Employee[];
  pagination: EmployeesPagination;
  summary: EmployeesSummary;
}

export interface EmployeesResponse {
  success: boolean;
  message: string;
  data: EmployeesData;
}
