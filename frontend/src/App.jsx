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
import DepartmentMaster from './pages/DepartmentMaster';
import EmployeeMaster from './pages/EmployeeMaster';
import DesignationMaster from './pages/DesignationMaster';
import VehicleMaintenanceMaster from './pages/VehicleMaintenanceMaster';
import FlowTemplates from './pages/FlowTemplates';
import Payments from './pages/Payments';
import LeaveRequests from './pages/LeaveRequests';
import LeaveBalance from './pages/LeaveBalance';
import FormTemplate from './pages/FormTemplate';
import NotificationTemplate from './pages/NotificationTemplate';
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
            <Route path="/master/departments" element={<DepartmentMaster />} />
            <Route path="/master/employees" element={<EmployeeMaster />} />
            <Route path="/master/designations" element={<DesignationMaster />} />
            <Route path="/master/vehicle-maintenance" element={<VehicleMaintenanceMaster />} />
            <Route path="/flow-templates" element={<FlowTemplates />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/leaves" element={<LeaveRequests />} />
            <Route path="/leave-balance" element={<LeaveBalance />} />
            <Route path="/form-template" element={<FormTemplate />} />
            <Route path="/notification-template" element={<NotificationTemplate />} />
            <Route path="/rbac-access" element={<RBACAccess />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

