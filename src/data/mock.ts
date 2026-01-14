// Centralized Mock Data for HR Management System

// ============================================================================
// COMMON OPTIONS FOR SELECT MENUS
// ============================================================================
export interface SelectOption {
  value: string;
  label: string;
}

export const departmentOptions: SelectOption[] = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
  { value: 'Human Resources', label: 'Human Resources' },
];

export const departmentNameOptions: SelectOption[] = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'IT', label: 'IT' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Research & Development', label: 'Research & Development' },
];

export const branchOptions: SelectOption[] = [
  { value: 'Main Office', label: 'Main Office' },
  { value: 'Branch 1', label: 'Branch 1' },
  { value: 'Branch 2', label: 'Branch 2' },
];

export const currencyOptions: SelectOption[] = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'AED', label: 'AED' },
];

export const phoneCountryOptions: SelectOption[] = [
  { value: 'US', label: 'US' },
  { value: 'UK', label: 'UK' },
  { value: 'EG', label: 'EG' },
  { value: 'AE', label: 'AE' },
];

export const leaveTypeOptions: SelectOption[] = [
  { value: 'Sick', label: 'Sick' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Maternity', label: 'Maternity' },
  { value: 'Paternity', label: 'Paternity' },
  { value: 'Bereavement', label: 'Bereavement' },
  { value: 'Vacation', label: 'Vacation' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Unpaid', label: 'Unpaid' },
];

export const leaveStatusOptions: SelectOption[] = [
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Rejected', label: 'Rejected' },
];

export const documentTypeOptions: SelectOption[] = [
  { value: 'Certificate', label: 'Certificate' },
  { value: 'ID Card', label: 'ID Card' },
  { value: 'Passport', label: 'Passport' },
  { value: 'License', label: 'License' },
  { value: 'Contract', label: 'Contract' },
];

export const advanceTypeOptions: SelectOption[] = [
  { value: 'Salary Advance', label: 'Salary Advance' },
  { value: 'Emergency', label: 'Emergency' },
  { value: 'Personal Loan', label: 'Personal Loan' },
];

export const paymentMethodOptions: SelectOption[] = [
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Cheque', label: 'Cheque' },
];

export const statusOptions: SelectOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'On Leave', label: 'On Leave' },
];

export const attendanceStatusFilterOptions: SelectOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'Present', label: 'Present' },
  { value: 'Late', label: 'Late' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Absent', label: 'Absent' },
  { value: 'On Leave', label: 'On Leave' },
];

export const departmentFilterOptions: SelectOption[] = [
  { value: '', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
];

export const employeeOptions: SelectOption[] = [
  { value: 'Olivia Rhye', label: 'Olivia Rhye' },
  { value: 'Phoenix Baker', label: 'Phoenix Baker' },
  { value: 'Lana Steiner', label: 'Lana Steiner' },
  { value: 'Demi Wilkinson', label: 'Demi Wilkinson' },
  { value: 'Candice Wu', label: 'Candice Wu' },
  { value: 'Liam Smith', label: 'Liam Smith' },
  { value: 'Ava Johnson', label: 'Ava Johnson' },
  { value: 'Noah Brown', label: 'Noah Brown' },
  { value: 'Isabella Davis', label: 'Isabella Davis' },
  { value: 'Mason Wilson', label: 'Mason Wilson' },
  { value: 'Sophia Garcia', label: 'Sophia Garcia' },
  { value: 'Sarah Ahmed', label: 'Sarah Ahmed' },
  { value: 'Ali Maged', label: 'Ali Maged' },
  { value: 'John Smith', label: 'John Smith' },
  { value: 'Mohamed Ali', label: 'Mohamed Ali' },
];

export const advanceStatusOptions: SelectOption[] = [
  { value: 'Completed', label: 'Completed' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Hold', label: 'Hold' },
];

export const documentStatusOptions: SelectOption[] = [
  { value: 'type', label: 'type' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'License', label: 'License' },
  { value: 'Passport', label: 'Passport' },
  { value: 'Visa', label: 'Visa' },
  { value: 'ID Card', label: 'ID Card' },
];

export const payrollMonthOptions: SelectOption[] = [
  { value: '', label: 'All Months' },
  { value: '2025-01', label: 'January 2025' },
  { value: '2025-02', label: 'February 2025' },
  { value: '2025-03', label: 'March 2025' },
  { value: '2025-04', label: 'April 2025' },
  { value: '2025-05', label: 'May 2025' },
  { value: '2025-06', label: 'June 2025' },
  { value: '2025-07', label: 'July 2025' },
  { value: '2025-08', label: 'August 2025' },
  { value: '2025-09', label: 'September 2025' },
  { value: '2025-10', label: 'October 2025' },
  { value: '2025-11', label: 'November 2025' },
  { value: '2025-12', label: 'December 2025' },
];

export const actionFilterOptions: SelectOption[] = [
  { value: 'All', label: 'All Actions' },
  { value: 'Created', label: 'Created' },
  { value: 'Updated', label: 'Updated' },
  { value: 'Deleted', label: 'Deleted' },
  { value: 'Permission Changed', label: 'Permission Changed' },
  { value: 'Logged In', label: 'Logged In' },
  { value: 'Logged Out', label: 'Logged Out' },
];

export const entityFilterOptions: SelectOption[] = [
  { value: 'All', label: 'All Entities' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Leave Request', label: 'Leave Request' },
  { value: 'Payroll', label: 'Payroll' },
  { value: 'Department', label: 'Department' },
  { value: 'Document', label: 'Document' },
  { value: 'Advance', label: 'Advance' },
  { value: 'User', label: 'User' },
  { value: 'System', label: 'System' },
];

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
  {
    id: 5,
    employeeName: 'Candice Wu',
    month: '2024-01',
    basicSalary: 4800,
    allowances: 200,
    deductions: 100,
    netPay: 4900,
    status: 'On Leave',
  },
  {
    id: 6,
    employeeName: 'Natali Craig',
    month: '2024-01',
    basicSalary: 4900,
    allowances: 100,
    deductions: 50,
    netPay: 4850,
    status: 'Active',
  },
  {
    id: 7,
    employeeName: 'Drew Cano',
    month: '2024-01',
    basicSalary: 5000,
    allowances: 150,
    deductions: 75,
    netPay: 5125,
    status: 'Inactive',
  },
  {
    id: 8,
    employeeName: 'Orlando Diggs',
    month: '2024-01',
    basicSalary: 5100,
    allowances: 175,
    deductions: 85,
    netPay: 5230,
    status: 'Active',
  },
  {
    id: 9,
    employeeName: 'Andi Lane',
    month: '2024-01',
    basicSalary: 5200,
    allowances: 200,
    deductions: 95,
    netPay: 5310,
    status: 'Inactive',
  },
  {
    id: 10,
    employeeName: 'Kate Morrison',
    month: '2024-01',
    basicSalary: 5300,
    allowances: 225,
    deductions: 105,
    netPay: 5420,
    status: 'Active',
  },
  {
    id: 11,
    employeeName: 'Jasper Lee',
    month: '2024-01',
    basicSalary: 5400,
    allowances: 250,
    deductions: 125,
    netPay: 5550,
    status: 'Active',
  },
  {
    id: 12,
    employeeName: 'Sienna Faye',
    month: '2024-01',
    basicSalary: 5500,
    allowances: 275,
    deductions: 145,
    netPay: 5675,
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

export interface AttendanceRecord {
  id: number;
  employee: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: 'Present' | 'Late' | 'Remote' | 'Absent';
}

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    employee: 'Olivia Rhye',
    department: 'Engineering',
    checkIn: '09:00 AM',
    checkOut: '05:30 PM',
    hours: '8.5h',
    status: 'Present',
  },
  {
    id: 2,
    employee: 'Phoenix Baker',
    department: 'Engineering',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    hours: '8.5h',
    status: 'Late',
  },
  {
    id: 3,
    employee: 'Lana Steiner',
    department: 'Human Resources',
    checkIn: '08:45 AM',
    checkOut: '05:00 PM',
    hours: '8.25h',
    status: 'Present',
  },
  {
    id: 4,
    employee: 'Demi Wilkinson',
    department: 'Marketing',
    checkIn: '-',
    checkOut: '-',
    hours: '-',
    status: 'Absent',
  },
  {
    id: 5,
    employee: 'Candice Wu',
    department: 'Sales',
    checkIn: '10:00 AM',
    checkOut: '06:00 PM',
    hours: '8h',
    status: 'Remote',
  },
  {
    id: 6,
    employee: 'Natali Craig',
    department: 'Engineering',
    checkIn: '09:05 AM',
    checkOut: '05:30 PM',
    hours: '8.42h',
    status: 'Present',
  },
  {
    id: 7,
    employee: 'Drew Cano',
    department: 'Sales',
    checkIn: '09:30 AM',
    checkOut: '05:45 PM',
    hours: '8.25h',
    status: 'Late',
  },
  {
    id: 8,
    employee: 'Orlando Diggs',
    department: 'Marketing',
    checkIn: '08:50 AM',
    checkOut: '05:15 PM',
    hours: '8.42h',
    status: 'Present',
  },
  {
    id: 9,
    employee: 'Andi Lane',
    department: 'Human Resources',
    checkIn: '09:00 AM',
    checkOut: '05:30 PM',
    hours: '8.5h',
    status: 'Present',
  },
  {
    id: 10,
    employee: 'Kate Morrison',
    department: 'Sales',
    checkIn: '10:30 AM',
    checkOut: '06:30 PM',
    hours: '8h',
    status: 'Remote',
  },
];

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

// ============================================================================
// NOTIFICATIONS
// ============================================================================
export interface AppNotification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const mockNotifications: AppNotification[] = [
  {
    id: 1,
    title: 'Leave request',
    message: 'Phoenix Baker submitted a leave request.',
    createdAt: '2025-12-28 09:10',
    isRead: false,
  },
  {
    id: 2,
    title: 'Payroll',
    message: 'January payroll draft is ready for review.',
    createdAt: '2025-12-27 17:45',
    isRead: false,
  },
  {
    id: 3,
    title: 'Document expiry',
    message: 'A visa document will expire in 7 days.',
    createdAt: '2025-12-26 13:05',
    isRead: true,
  },
];

