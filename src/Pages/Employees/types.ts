export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  phone_country?: string;
  phone_number?: string;
  address?: string;
  emergency_contact?: string;
  salary?: string;
  salary_currency?: string;
  branch?: string;
  join_date?: string;
  status: string;
}

export interface EmployeesStats {
  total: number;
  active: number;
  onLeave: number;
  inactive: number;
}
