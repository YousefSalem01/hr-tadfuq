export const endpoints = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  dashboard: '/api/dashboard',
  employees: {
    list: '/api/employees',
    statuses: '/api/employees/statuses',
    import: '/api/employees/import',
  },
  departments: '/api/departments',
} as const;
