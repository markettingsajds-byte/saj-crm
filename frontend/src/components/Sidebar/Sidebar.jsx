import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Settings, GitBranch, MessageSquare,
  FolderKanban, ListChecks, CreditCard, CalendarCheck,
  Clock, ChevronDown, LogOut, ShieldCheck
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  {
    name: 'Master Setup', icon: Settings,
    submenu: [
      { name: 'Branch Master', href: '/master/branches' },
      { name: 'Department Master', href: '/master/departments' },
      { name: 'Customer Master', href: '/customers' },
      { name: 'Employee Master', href: '/master/employees' },
      { name: 'Designation Master', href: '/master/designations' },
      { name: 'Form Template', href: '/form-template' },
      { name: 'Notification Template', href: '/notification-template' },
    ]
  },
  { name: 'Flow Templates', icon: GitBranch, href: '/flow-templates' },
  { name: 'Enquires', icon: MessageSquare, href: '/enquiries' },
  { name: 'Projects', icon: FolderKanban, href: '/projects' },
  { name: 'My Tasks', icon: ListChecks, href: '/tasks' },
  { name: 'Payments', icon: CreditCard, href: '/payments' },
  {
    name: 'Leave Manage', icon: CalendarCheck,
    submenu: [
      { name: 'Leave Requests', href: '/leaves' },
      { name: 'Leave Balance', href: '/leave-balance' },
    ]
  },
  {
    name: 'Attendance', icon: Clock,
    submenu: [
      { name: 'Attendance Punching', href: '/attendance/punching' },
      { name: 'Attendance Management', href: '/attendance/management' },
      { name: 'Leave Manage', href: '/attendance/leave-manage' },
      { name: 'Payroll Calculations', href: '/attendance/payroll' },
    ]
  },
  { name: 'RBAC Access', icon: ShieldCheck, href: '/rbac-access' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="SAJ" className="sidebar-logo-img" />
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-title">SRI ARUL JOTHI</span>
          <span className="sidebar-logo-subtitle">Digital Surveyors</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.submenu) {
              const isActiveGroup = item.submenu.some((sub) => pathname === sub.href);
              const isOpen = openMenus[item.name] ?? isActiveGroup;
              return (
                <li key={item.name} className="sidebar-item-sub">
                  <button
                    className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                    <ChevronDown size={14} className={`sidebar-chevron ${isOpen ? 'rotated' : ''}`} />
                  </button>
                  <ul className={`sidebar-submenu ${isOpen ? 'show' : ''}`}>
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link to={sub.href} className={`sidebar-sublink ${pathname === sub.href ? 'active' : ''}`}>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.name}>
                <Link to={item.href} className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}>
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-link logout" onClick={logout}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
