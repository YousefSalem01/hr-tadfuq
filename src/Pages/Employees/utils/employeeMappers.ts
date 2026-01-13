import type { Employee, EmployeeFormData } from '../types';

function normalizePhoneNumber(input: string) {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return '';
  return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
}

export function toCreatePayload(employeeData: EmployeeFormData, userRole?: string | null) {
  return {
    full_name: employeeData.fullName,
    email: employeeData.email,
    role: employeeData.role,
    user_role: userRole,
    phone_number: normalizePhoneNumber(employeeData.phoneNumber),
    salary:
      employeeData.salary === '' || employeeData.salary === null || employeeData.salary === undefined
        ? undefined
        : Number(employeeData.salary),
    salary_currency: employeeData.salaryCurrency || 'USD',
    join_date: employeeData.joinDate,
    address: employeeData.address,
    emergency_contact: employeeData.emergencyContact,
    department: employeeData.department ?? null,
    branch: employeeData.branch ?? null,
  };
}

export function toUpdatePatch(employeeData: EmployeeFormData, selectedEmployee: Employee) {
  const changes: any = {};

  if (employeeData.fullName !== selectedEmployee.employee_name) changes.full_name = employeeData.fullName;
  if (employeeData.email !== selectedEmployee.email) changes.email = employeeData.email;
  if (employeeData.role !== selectedEmployee.role) changes.role = employeeData.role;
  if (normalizePhoneNumber(employeeData.phoneNumber) !== selectedEmployee.phone_number) {
    changes.phone_number = normalizePhoneNumber(employeeData.phoneNumber);
  }
  if (Number(employeeData.salary) !== Number(selectedEmployee.salary)) {
    changes.salary =
      employeeData.salary === '' || employeeData.salary === null || employeeData.salary === undefined
        ? undefined
        : Number(employeeData.salary);
  }
  if (employeeData.salaryCurrency !== selectedEmployee.salary_currency) {
    changes.salary_currency = employeeData.salaryCurrency || 'USD';
  }
  if (employeeData.joinDate !== selectedEmployee.join_date) changes.join_date = employeeData.joinDate;
  if (employeeData.address !== selectedEmployee.address) changes.address = employeeData.address;
  if (employeeData.emergencyContact !== selectedEmployee.emergency_contact) {
    changes.emergency_contact = employeeData.emergencyContact;
  }
  if (employeeData.department !== selectedEmployee.department) changes.department = employeeData.department ?? null;
  if (employeeData.branch !== selectedEmployee.branch) changes.branch = employeeData.branch ?? null;

  return changes as Record<string, any>;
}

export function mapApiErrorsToForm(
  err: any,
  setFormError?: (field: string, message: string) => void
) {
  if (!setFormError) return false;
  if (!err?.response?.data?.errors) return false;

  const apiErrors = err.response.data.errors;
  const fieldMap: Record<string, string> = {
    full_name: 'fullName',
    email: 'email',
    role: 'role',
    phone_number: 'phoneNumber',
    salary: 'salary',
    join_date: 'joinDate',
    address: 'address',
    emergency_contact: 'emergencyContact',
    department: 'department',
    branch: 'branch',
  };

  Object.keys(apiErrors).forEach((field) => {
    const message = Array.isArray(apiErrors[field]) ? apiErrors[field][0] : apiErrors[field];
    const formField = fieldMap[field] || field;
    setFormError(formField, message);
  });

  return true;
}

