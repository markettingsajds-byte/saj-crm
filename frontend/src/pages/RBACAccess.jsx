import { Check, KeyRound, Lock, ShieldCheck, UsersRound, Plus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import '../styles/RBACAccess.css';
import { loadRBAC, saveRBAC } from '../utils/rbac';

const MODULES = [
  'Dashboard',
  'Master Setup',
  'Customer Master',
  'Enquiries',
  'Projects',
  'My Tasks',
  'Payments',
  'Leave Manage',
  'Attendance',
  'RBAC Access Details',
];

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
  const [conf, setConf] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await loadRBAC();
      if (mounted) setConf(data);
    })();
    return () => { mounted = false; };
  }, []);

  function toggleModule(roleKey, module) {
    setConf((prev) => {
      const next = { ...prev, roles: { ...prev.roles } };
      const role = { ...next.roles[roleKey] };
      const modules = new Set(role.modules || []);
      if (modules.has(module)) modules.delete(module); else modules.add(module);
      role.modules = Array.from(modules);
      next.roles[roleKey] = role;
      return next;
    });
  }

  function setRoleScope(roleKey, scope) {
    setConf((prev) => {
      const next = { ...prev, roles: { ...prev.roles } };
      next.roles[roleKey] = { ...next.roles[roleKey], scope };
      return next;
    });
  }

  function setAllowedBranches(roleKey, csv) {
    const arr = csv.split(',').map(s => s.trim()).filter(Boolean);
    setConf((prev) => {
      const next = { ...prev, roles: { ...prev.roles } };
      next.roles[roleKey] = { ...next.roles[roleKey], allowedBranches: arr };
      return next;
    });
  }

  function addRole() {
    if (!newRoleName) return;
    const key = newRoleName.toLowerCase().replace(/\s+/g, '-');
    setConf((prev) => ({
      ...prev,
      roles: { ...prev.roles, [key]: { label: newRoleName, scope: 'branch', modules: [] } },
    }));
    setNewRoleName('');
  }

  function save() {
    setStatus('Saving...');
    (async () => {
      const ok = await saveRBAC(conf);
      if (ok) {
        setStatus('Saved');
        const fresh = await loadRBAC();
        setConf(fresh);
        setEditing(false);
        setTimeout(() => setStatus(''), 1500);
      } else {
        setStatus('Save failed');
      }
    })();
  }

  const roleKeys = conf ? Object.keys(conf.roles || {}) : [];

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
            <strong>{roleKeys.length} Roles</strong>
            <span>{conf ? roleKeys.map(k => conf.roles[k].label).join(', ') : ''}</span>
          </div>
        </div>
        <div className="rbac-summary-item">
          <KeyRound size={20} />
          <div>
            <strong>Editable</strong>
            <span>Define roles, modules and branch scopes; saved to localStorage</span>
          </div>
        </div>
      </div>

      <section className="rbac-section">
        <h2>Role Configuration</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <input value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="New role name" />
          <button className="btn-primary" onClick={addRole}><Plus size={14} /> Add Role</button>
          <button className="btn-primary" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit Roles'}</button>
          <button className="btn-primary" onClick={save}><Save size={14} /> Save</button>
          <div style={{ marginLeft: 12, alignSelf: 'center' }}>{status}</div>
        </div>

        <div className="role-grid">
          {roleKeys.map((rk) => {
            const role = conf.roles[rk];
            return (
              <article className="role-card" key={rk}>
                <div className="role-card-top">
                  <span className={`role-badge role-${rk}`}>{role.label}</span>
                  <strong>{role.scope === 'all' ? 'Global access' : role.scope === 'branch' ? 'Branch-scoped' : role.scope}</strong>
                </div>
                <div style={{ marginTop: 8 }}>
                  <label>Scope:</label>
                  <select value={role.scope} disabled={!editing} onChange={e => setRoleScope(rk, e.target.value)}>
                    <option value="all">All branches (global)</option>
                    <option value="branch">Specific branch(es)</option>
                  </select>
                </div>
                {role.scope === 'branch' && (
                  <div style={{ marginTop: 8 }}>
                    <label>Allowed branches (comma separated):</label>
                    <input disabled={!editing} value={(role.allowedBranches || []).join(', ')} onChange={e => setAllowedBranches(rk, e.target.value)} placeholder="Head Office, Chennai Site Office" />
                  </div>
                )}
                <div style={{ marginTop: 8 }}>
                  <label>Modules:</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                    {MODULES.map((m) => (
                      <label key={m} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <input disabled={!editing} type="checkbox" checked={(role.modules || []).includes(m) || (role.modules || []).includes('*')} onChange={() => toggleModule(rk, m)} />
                        <span style={{ fontSize: 13 }}>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
