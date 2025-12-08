import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Employees from '../Pages/Employees';
import Attendance from '../Pages/Attendance';
import Leaves from '../Pages/Leaves';
import Payroll from '../Pages/Payroll';
import Advance from '../Pages/Advance';
import Documents from '../Pages/Documents';
import Departments from '../Pages/Departments';
import Users from '../Pages/Users';
import ActivityLog from '../Pages/ActivityLog';
import NotFound from '../components/NotFound/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/advance" element={<Advance />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/users" element={<Users />} />
                <Route path="/activity-log" element={<ActivityLog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRouter;

