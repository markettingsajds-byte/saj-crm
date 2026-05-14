import { Check, KeyRound, Lock, ShieldCheck, UsersRound } from 'lucide-react';
import '../styles/RBACAccess.css';

const roleAccounts = [
  {
    role: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    access: 'Full system access',
    scope: 'Dashboard, master setup, enquiries, projects, tasks, payments, leave, attendance, RBAC details',
  },
  {
    role: 'Agent',
    email: 'agent@example.com',
    password: 'agent123',
    access: 'Sales and enquiry operations',
    scope: 'Dashboard, enquiries, assigned tasks, customer follow-ups',
  },
  {
    role: 'User',
    email: 'user@example.com',
    password: 'user123',
    access: 'Internal staff access',
    scope: 'Dashboard, tasks, projects, customer information, attendance',
  },
  {
    role: 'Customer',
    email: 'customer@example.com',
    password: 'customer123',
    access: 'Customer portal access',
    scope: 'Dashboard, own projects, own tasks, own enquiries',
  },
];

const permissions = [
  { module: 'Dashboard', admin: true, agent: true, user: true, customer: true },
  { module: 'Master Setup', admin: true, agent: false, user: false, customer: false },
  { module: 'Customer Master', admin: true, agent: true, user: true, customer: false },
  { module: 'Enquiries', admin: true, agent: true, user: true, customer: true },
  { module: 'Projects', admin: true, agent: true, user: true, customer: true },
  { module: 'My Tasks', admin: true, agent: true, user: true, customer: true },
  { module: 'Payments', admin: true, agent: false, user: false, customer: true },
  { module: 'Leave Manage', admin: true, agent: true, user: true, customer: false },
  { module: 'Attendance', admin: true, agent: true, user: true, customer: false },
  { module: 'RBAC Access Details', admin: true, agent: false, user: false, customer: false },
];

const roles = ['admin', 'agent', 'user', 'customer'];

function PermissionMark({ allowed }) {
  return allowed ? (
    <span className="access-mark allow" title="Allowed">
      <Check size={16} />
    </span>
  ) : (
    <span className="access-mark deny" title="Restricted">
      <Lock size={14} />
    </span>
  );
}

export default function RBACAccess() {
  return (
    <div className="page-content rbac-page">
      <div className="rbac-header">
        <div>
          <p className="rbac-kicker">Role based access system</p>
          <h1>RBAC Access Details</h1>
        </div>
        <div className="rbac-header-icon">
          <ShieldCheck size={28} />
        </div>
      </div>

      <div className="rbac-summary">
        <div className="rbac-summary-item">
          <UsersRound size={20} />
          <div>
            <strong>4 Roles</strong>
            <span>Admin, Agent, User, Customer</span>
          </div>
        </div>
        <div className="rbac-summary-item">
          <KeyRound size={20} />
          <div>
            <strong>Demo Login Enabled</strong>
            <span>Use these accounts for local testing</span>
          </div>
        </div>
      </div>

      <section className="rbac-section">
        <h2>Login Details</h2>
        <div className="role-grid">
          {roleAccounts.map((account) => (
            <article className="role-card" key={account.role}>
              <div className="role-card-top">
                <span className={`role-badge role-${account.role.toLowerCase()}`}>{account.role}</span>
                <strong>{account.access}</strong>
              </div>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>{account.email}</dd>
                </div>
                <div>
                  <dt>Password</dt>
                  <dd>{account.password}</dd>
                </div>
                <div>
                  <dt>Access Scope</dt>
                  <dd>{account.scope}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="rbac-section">
        <h2>Permission Matrix</h2>
        <div className="rbac-table-wrap">
          <table className="rbac-table">
            <thead>
              <tr>
                <th>Module</th>
                {roles.map((role) => (
                  <th key={role}>{role}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((item) => (
                <tr key={item.module}>
                  <td>{item.module}</td>
                  {roles.map((role) => (
                    <td key={role}>
                      <PermissionMark allowed={item[role]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
