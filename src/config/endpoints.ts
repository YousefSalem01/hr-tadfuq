/**
 * @fileoverview API endpoints configuration
 */

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },

  // Dashboard endpoint
  DASHBOARD: '/api/dashboard',

  // Employees endpoints
  EMPLOYEES: {
    LIST: '/api/employees',
    DETAIL: (id: string | number) => `/api/employees/${id}`,
    STATUSES: '/api/employees/statuses',
    IMPORT: '/api/employees/import',
  },

  // Departments endpoints
  DEPARTMENTS: {
    LIST: '/api/departments',
    DETAIL: (id: string | number) => `/api/departments/${id}`,
  },

  // Branches endpoints
  BRANCHES: {
    LIST: '/api/branches',
    DETAIL: (id: string | number) => `/api/branches/${id}`,
  },
} as const;

/**
 * Helper function to build query strings
 */
export const buildQueryParams = (
  params: Record<string, string | number | boolean | undefined>
) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};
