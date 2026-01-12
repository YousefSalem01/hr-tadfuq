export const endpoints = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  dashboard: '/api/dashboard',
  employees: '/api/employees',
} as const;
