import { Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Projects from './pages/Projects';
import Customers from './pages/Customers';
import Tasks from './pages/Tasks';
import BranchMaster from './pages/BranchMaster';
import RBACAccess from './pages/RBACAccess';
import AttendancePunching from './pages/AttendancePunching';
import AttendanceManagement from './pages/AttendanceManagement';
import LeaveManagement from './pages/LeaveManagement';
import PayrollCalculations from './pages/PayrollCalculations';
import Login from './pages/Login';
import OTPLogin from './pages/OTPLogin';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPLogin />} />

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/master/branches" element={<BranchMaster />} />
            <Route path="/attendance" element={<Navigate to="/attendance/punching" replace />} />
            <Route path="/attendance/punching" element={<AttendancePunching />} />
            <Route path="/attendance/management" element={<AttendanceManagement />} />
            <Route path="/attendance/leaves" element={<LeaveManagement />} />
            <Route path="/attendance/leave-manage" element={<LeaveManagement />} />
            <Route path="/attendance/payroll" element={<PayrollCalculations />} />
            <Route path="/rbac-access" element={<RBACAccess />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

