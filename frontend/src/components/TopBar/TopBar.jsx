import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Bell, RefreshCw, Sun, Moon } from 'lucide-react';
import './TopBar.css';

const pageTitles = {
  '/': 'Dashboard',
  '/customers': 'Customer Master',
  '/projects': 'Projects',
  '/tasks': 'My Tasks',
  '/payments': 'Payments',
  '/enquiries': 'Enquires',
  '/flow-templates': 'Flow Templates',
  '/attendance': 'Attendance',
  '/attendance/punching': 'Attendance Punching',
  '/attendance/management': 'Attendance Management',
  '/attendance/leaves': 'Leave Management',
  '/attendance/leave-manage': 'Leave Manage',
  '/attendance/payroll': 'Payroll Calculations',
  '/rbac-access': 'RBAC Access Details',
  '/leaves': 'Leave Requests',
  '/master/branches': 'Branch Master',
  '/master/departments': 'Department Master',
  '/master/employees': 'Employee Master',
  '/master/designations': 'Designation Master',
  '/profile': 'My Profile',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const title = pageTitles[pathname] || 'Dashboard';

  const initials = (user?.fullName || 'U')
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        <button className="topbar-icon-btn" title="Toggle theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="topbar-icon-btn" title="Refresh" onClick={() => window.location.reload()}>
          <RefreshCw size={18} />
        </button>
        <button className="topbar-icon-btn" title="Notifications">
          <Bell size={18} />
        </button>
        <div className="topbar-user">
          <div className="topbar-avatar">{initials}</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">{user?.fullName || 'User'}</span>
            <span className="topbar-user-role">{user?.role || 'employee'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
