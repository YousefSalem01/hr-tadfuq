import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './views/Pages/Login';
import Dashboard from './views/Pages/Dashboard';
import Employees from './views/Pages/Employees';
import Attendance from './views/Pages/Attendance';
import Leaves from './views/Pages/Leaves';
import Payroll from './views/Pages/Payroll';
import Advance from './views/Pages/Advance';
import Documents from './views/Pages/Documents';
import Departments from './views/Pages/Departments';
import Users from './views/Pages/Users';
import ActivityLog from './views/Pages/ActivityLog';

function App() {
  return (
    <Router>
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
                </Routes>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

