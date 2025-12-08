// Centralized Mock Data for HR Management System

// ============================================================================
// DEPARTMENTS
// ============================================================================
export interface Department {
  id: number;
  name: string;
  head_of_department?: string;
  headOfDepartment?: string;
  description: string;
  employee_count?: number;
  employeeCount?: number;
  employees?: string[];
}

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    headOfDepartment: 'John Smith',
    description: 'Software development and technical operations',
    employeeCount: 15,
    employees: ['JS', 'MA', 'SK'],
  },
  {
    id: 2,
    name: 'Human Resources',
    headOfDepartment: 'Sarah Ahmed',
    description: 'Employee relations and recruitment',
    employeeCount: 5,
    employees: ['SA', 'LM', 'RK'],
  },
  {
    id: 3,
    name: 'Marketing',
    headOfDepartment: 'Ali Maged',
    description: 'Brand management and marketing campaigns',
    employeeCount: 8,
    employees: ['AM', 'FH', 'NK'],
  },
  {
    id: 4,
    name: 'Sales',
    headOfDepartment: 'Mohamed Ali',
    description: 'Sales and business development',
    employeeCount: 12,
    employees: ['MA', 'HK', 'ZA'],
  },
];

// ============================================================================
// EMPLOYEES
// ============================================================================
export interface Employee {
  id: number;
  name: string;
  role: string;
  department_name?: string;
  department?: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  phone_country?: string;
  phone_number?: string;
  address?: string;
  emergency_contact?: string;
  salary?: number;
  salary_currency?: string;
  branch?: string;
  join_date?: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Olivia Rhye',
    role: 'Product Designer',
    department: 'Engineering',
    email: 'olivia.rhye@company.com',
    status: 'Active',
    phone_country: 'US',
    phone_number: '+1 555-0101',
    salary: 5500,
    salary_currency: 'USD',
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    role: 'Software Engineer',
    department: 'Engineering',
    email: 'phoenix.baker@company.com',
    status: 'Active',
    phone_country: 'US',
    phone_number: '+1 555-0102',
    salary: 6000,
    salary_currency: 'USD',
  },
  {
    id: 3,
    name: 'Lana Steiner',
    role: 'HR Manager',
    department: 'Human Resources',
    email: 'lana.steiner@company.com',
    status: 'On Leave',
    phone_country: 'US',
    phone_number: '+1 555-0103',
    salary: 5800,
    salary_currency: 'USD',
  },
  {
    id: 4,
    name: 'Demi Wilkinson',
    role: 'Marketing Specialist',
    department: 'Marketing',
    email: 'demi.wilkinson@company.com',
    status: 'Active',
    phone_country: 'US',
    phone_number: '+1 555-0104',
    salary: 5200,
    salary_currency: 'USD',
  },
  {
    id: 5,
    name: 'Candice Wu',
    role: 'Sales Representative',
    department: 'Sales',
    email: 'candice.wu@company.com',
    status: 'Active',
    phone_country: 'US',
    phone_number: '+1 555-0105',
    salary: 4800,
    salary_currency: 'USD',
  },
];

// ============================================================================
// USERS & ROLES
// ============================================================================
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  permissions: string[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export const mockUsers: User[] = [
  { id: 1, name: 'Mohamed Ali', email: 'mohamed.ali@company.com', role: 'Admin', status: 'Active', permissions: ['All'] },
  { id: 2, name: 'Sarah Ahmed', email: 'sarah.ahmed@company.com', role: 'HR Manager', status: 'Active', permissions: ['Employees', 'Leaves', 'Payroll'] },
  { id: 3, name: 'Ahmed Hassan', email: 'ahmed.hassan@company.com', role: 'Manager', status: 'Active', permissions: ['Employees', 'Attendance'] },
  { id: 4, name: 'Fatima Ali', email: 'fatima.ali@company.com', role: 'Employee', status: 'Active', permissions: ['View Only'] },
];

export const mockRoles: Role[] = [
  { id: 1, name: 'Admin', description: 'Full system access', permissions: ['All'], userCount: 1 },
  { id: 2, name: 'HR Manager', description: 'HR operations management', permissions: ['Employees', 'Leaves', 'Payroll', 'Documents'], userCount: 1 },
  { id: 3, name: 'Manager', description: 'Team management', permissions: ['Employees', 'Attendance', 'Leaves'], userCount: 1 },
  { id: 4, name: 'Employee', description: 'Basic access', permissions: ['View Only'], userCount: 1 },
];

// ============================================================================
// PAYROLL
// ============================================================================
export interface PayrollRecord {
  id: number;
  employee_name?: string;
  employeeName?: string;
  month: string;
  basic_salary?: number;
  basicSalary?: number;
  allowances: number;
  deductions: number;
  net_pay?: number;
  netPay?: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export const mockPayrollRecords: PayrollRecord[] = [
  {
    id: 1,
    employeeName: 'Olivia Rhye',
    month: '2024-01',
    basicSalary: 5500,
    allowances: 500,
    deductions: 200,
    netPay: 5800,
    status: 'Active',
  },
  {
    id: 2,
    employeeName: 'Phoenix Baker',
    month: '2024-01',
    basicSalary: 6000,
    allowances: 600,
    deductions: 250,
    netPay: 6350,
    status: 'Active',
  },
  {
    id: 3,
    employeeName: 'Lana Steiner',
    month: '2024-01',
    basicSalary: 5800,
    allowances: 400,
    deductions: 200,
    netPay: 6000,
    status: 'On Leave',
  },
  {
    id: 4,
    employeeName: 'Demi Wilkinson',
    month: '2024-01',
    basicSalary: 5200,
    allowances: 300,
    deductions: 100,
    netPay: 5400,
    status: 'Active',
  },
];

// ============================================================================
// LEAVES
// ============================================================================
export interface Leave {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Approved' | 'pending' | 'Rejected' | 'Active';
}

export const mockLeaves: Leave[] = [
  { id: 1, employeeName: 'Olivia Rhye', leaveType: 'Sick', startDate: 'Nov 1, 2025', endDate: 'Dec 5, 2025', days: 4, status: 'Approved' },
  { id: 2, employeeName: 'Phoenix Baker', leaveType: 'Casual', startDate: 'Nov 1, 2025', endDate: 'Dec 5, 2025', days: 5, status: 'pending' },
  { id: 3, employeeName: 'Lana Steiner', leaveType: 'Maternity', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 8, status: 'Approved' },
  { id: 4, employeeName: 'Demi Wilkinson', leaveType: 'Paternity', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 7, status: 'Rejected' },
  { id: 5, employeeName: 'Candice Wu', leaveType: 'Bereavement', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 1, status: 'Approved' },
  { id: 6, employeeName: 'Natali Craig', leaveType: 'Vacation', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 2, status: 'Approved' },
  { id: 7, employeeName: 'Drew Cano', leaveType: 'Personal', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 4, status: 'Approved' },
  { id: 8, employeeName: 'Orlando Diggs', leaveType: 'Unpaid', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 5, status: 'Approved' },
  { id: 9, employeeName: 'Andi Lane', leaveType: 'Compassionate', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 5, status: 'Approved' },
  { id: 10, employeeName: 'Kate Morrison', leaveType: 'Jury Duty', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 7, status: 'Active' },
  { id: 11, employeeName: 'Jasper Lee', leaveType: 'Study Leave', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 5, status: 'Approved' },
  { id: 12, employeeName: 'Sienna Faye', leaveType: 'Sabbatical', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 5, status: 'Approved' },
  { id: 13, employeeName: 'Gideon Parks', leaveType: 'Public Holiday', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 6, status: 'Approved' },
  { id: 14, employeeName: 'Zara Ellis', leaveType: 'Family Leave', startDate: 'Dec 15, 2025', endDate: 'Jan 10, 2026', days: 4, status: 'Approved' },
];

// ============================================================================
// DOCUMENTS
// ============================================================================
export interface DocumentRecord {
  id: number;
  employeeName: string;
  documentType: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Pending' | 'Hold' | 'Expired';
}

export const mockDocuments: DocumentRecord[] = [
  { id: 1, employeeName: 'Olivia Rhye', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 2, employeeName: 'Liam Smith', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Pending' },
  { id: 3, employeeName: 'Ava Johnson', documentType: 'Certificate', issuer: 'UAE Immigration', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 4, employeeName: 'Noah Brown', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Hold' },
  { id: 5, employeeName: 'Isabella Davis', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 6, employeeName: 'Mason Wilson', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 7, employeeName: 'Sophia Garcia', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Pending' },
];

// ============================================================================
// ADVANCE
// ============================================================================
export interface AdvanceRecord {
  id: number;
  employeeName: string;
  amount: number;
  monthlyDeduction: number;
  remaining: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Pending' | 'Hold';
}

export const mockAdvanceRecords: AdvanceRecord[] = [
  { id: 1, employeeName: 'Olivia Rhye', amount: 7000, monthlyDeduction: 5000, remaining: 900, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Active' },
  { id: 2, employeeName: 'Liam Smith', amount: 9000, monthlyDeduction: 4500, remaining: 1000, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Pending' },
  { id: 3, employeeName: 'Ava Johnson', amount: 5000, monthlyDeduction: 5200, remaining: 800, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Active' },
  { id: 4, employeeName: 'Noah Brown', amount: 5000, monthlyDeduction: 5500, remaining: 1200, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Hold' },
  { id: 5, employeeName: 'Isabella Davis', amount: 6000, monthlyDeduction: 4800, remaining: 750, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Active' },
  { id: 6, employeeName: 'Mason Wilson', amount: 5000, monthlyDeduction: 4900, remaining: 1150, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Active' },
  { id: 7, employeeName: 'Sophia Garcia', amount: 5000, monthlyDeduction: 5300, remaining: 950, startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2025', status: 'Pending' },
];

// ============================================================================
// ACTIVITY LOG
// ============================================================================
export interface ActivityLog {
  id: number;
  action: 'Created' | 'Updated' | 'Deleted' | 'Logged In' | 'Logged Out' | 'Permission Changed';
  entity: string;
  entityName: string;
  user: string;
  userEmail: string;
  timestamp: string;
  details?: string;
}

export const mockActivityLogs: ActivityLog[] = [
  { 
    id: 1, 
    action: 'Created', 
    entity: 'Employee', 
    entityName: 'John Doe', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-15 10:30:25',
    details: 'Added new employee with role: Product Designer'
  },
  { 
    id: 2, 
    action: 'Updated', 
    entity: 'Department', 
    entityName: 'Engineering', 
    user: 'Sarah Ahmed', 
    userEmail: 'sarah.ahmed@company.com',
    timestamp: '2024-01-15 09:15:42',
    details: 'Updated department head to: Mohamed Ahmed'
  },
  { 
    id: 3, 
    action: 'Deleted', 
    entity: 'Leave Request', 
    entityName: 'Annual Leave - Phoenix Baker', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-15 08:45:10',
    details: 'Deleted leave request for dates: Nov 1-5, 2025'
  },
  { 
    id: 4, 
    action: 'Created', 
    entity: 'Payroll', 
    entityName: 'January 2024 - Olivia Rhye', 
    user: 'Sarah Ahmed', 
    userEmail: 'sarah.ahmed@company.com',
    timestamp: '2024-01-14 16:20:33',
    details: 'Created payroll record: $5,500'
  },
  { 
    id: 5, 
    action: 'Permission Changed', 
    entity: 'User', 
    entityName: 'Ahmed Hassan', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-14 14:10:18',
    details: 'Updated permissions: Added Employees, Attendance access'
  },
  { 
    id: 6, 
    action: 'Updated', 
    entity: 'Employee', 
    entityName: 'Lana Steiner', 
    user: 'Sarah Ahmed', 
    userEmail: 'sarah.ahmed@company.com',
    timestamp: '2024-01-14 11:30:55',
    details: 'Updated employee status to: Active'
  },
  { 
    id: 7, 
    action: 'Created', 
    entity: 'Department', 
    entityName: 'Marketing', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-13 15:45:20',
    details: 'Created new department with head: Ali Maged'
  },
  { 
    id: 8, 
    action: 'Deleted', 
    entity: 'Document', 
    entityName: 'Certificate - Noah Brown', 
    user: 'Sarah Ahmed', 
    userEmail: 'sarah.ahmed@company.com',
    timestamp: '2024-01-13 10:20:40',
    details: 'Deleted expired document'
  },
  { 
    id: 9, 
    action: 'Updated', 
    entity: 'Advance', 
    entityName: 'Advance Request - Isabella Davis', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-12 13:15:30',
    details: 'Updated advance status to: Approved'
  },
  { 
    id: 10, 
    action: 'Created', 
    entity: 'User', 
    entityName: 'Fatima Ali', 
    user: 'Mohamed Ali', 
    userEmail: 'mohamed.ali@company.com',
    timestamp: '2024-01-12 09:00:12',
    details: 'Created new user account with role: Employee'
  },
  { 
    id: 11, 
    action: 'Logged In', 
    entity: 'System', 
    entityName: 'Login', 
    user: 'Ahmed Hassan', 
    userEmail: 'ahmed.hassan@company.com',
    timestamp: '2024-01-15 08:00:00',
    details: 'User logged into the system'
  },
  { 
    id: 12, 
    action: 'Logged Out', 
    entity: 'System', 
    entityName: 'Logout', 
    user: 'Fatima Ali', 
    userEmail: 'fatima.ali@company.com',
    timestamp: '2024-01-14 17:30:00',
    details: 'User logged out of the system'
  },
];

// ============================================================================
// ATTENDANCE
// ============================================================================
export interface AttendanceData {
  name: string;
  value: number;
  color: string;
}

export const mockAttendanceChartData: AttendanceData[] = [
  { name: 'Present', value: 40, color: '#10B981' },
  { name: 'Absent', value: 60, color: '#DC2626' },
];

export interface AttendanceStat {
  label: string;
  value: string;
  color: string;
}

export const mockAttendanceStats = {
  total: 124,
  present: 0,
  late: 0,
  remote: 0,
  absent: 0,
};

// ============================================================================
// DASHBOARD
// ============================================================================
export interface DashboardStats {
  total_employees: number;
  active_employees: number;
  present_today: number;
  pending_leaves: number;
  monthly_payroll: number;
}

export const mockDashboardStats: DashboardStats = {
  total_employees: 124,
  active_employees: 118,
  present_today: 95,
  pending_leaves: 8,
  monthly_payroll: 215750,
};

