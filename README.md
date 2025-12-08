# HR Dashboard

A modern HR management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Key metrics including total employees, present today, pending leaves, and monthly payroll
- **Department Distribution**: Visual donut chart showing employee distribution across departments
- **Recent Activities**: Real-time feed of leave requests and their statuses
- **Employee Management**: Comprehensive employee table with edit and delete actions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library

## Project Structure

```
src/
  components/
    Sidebar.tsx          # Navigation sidebar
    Header.tsx           # Top header with search and profile
    MetricCard.tsx       # Reusable metric card component
    DepartmentChart.tsx  # Department distribution chart
    RecentActivities.tsx # Recent activities list
    EmployeesTable.tsx   # Employees table component
  App.tsx                # Main app component
  main.tsx               # Entry point
  index.css              # Global styles
```

## License

MIT

