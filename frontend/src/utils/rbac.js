import api from '../services/api';

const DEFAULT_RBAC = {
  roles: {
    superadmin: { label: 'Super Admin', scope: 'all', modules: ['*'] },
    admin: { label: 'Admin', scope: 'all', modules: ['Dashboard','Master Setup','Customer Master','Enquiries','Projects','My Tasks','Payments','Leave Manage','Attendance','RBAC Access Details'] },
    branchadmin: { label: 'Branch Admin', scope: 'branch', modules: ['*'] },
    branchmanager: { label: 'Branch Manager', scope: 'branch', modules: ['Dashboard','Enquiries','Projects','My Tasks','Attendance','Leave Manage'] },
    agent: { label: 'Agent', scope: 'branch', modules: ['Dashboard','Enquiries','My Tasks','Customer Master'] },
    user: { label: 'User', scope: 'branch', modules: ['Dashboard','My Tasks','Projects','Customer Master'] },
  },
  branches: ['Head Office','Chennai Site Office','Madurai Site Office'],
};

export async function loadRBAC() {
  // Try server first
  try {
    const res = await api.get('/auth/rbac');
    if (res?.data) return res.data;
  } catch (e) {
    // ignore
  }
  try {
    const raw = localStorage.getItem('rbac_config');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_RBAC;
}

export async function saveRBAC(conf) {
  // Try server
  try {
    await api.post('/auth/rbac', conf);
    return true;
  } catch (e) {
    // fallback to local
    try {
      localStorage.setItem('rbac_config', JSON.stringify(conf));
      return true;
    } catch (err) {
      return false;
    }
  }
}

export function roleHasModule(roleConf, module) {
  if (!roleConf || !roleConf.modules) return false;
  if (roleConf.modules.includes('*')) return true;
  return roleConf.modules.includes(module);
}

export async function userHasAccess(user, module, branch) {
  const conf = await loadRBAC();
  if (!user) return false;
  const r = (user.role || '').toLowerCase();
  const roleConf = conf.roles[r];
  if (!roleConf) return false;
  if (r === 'superadmin') return true;
  // Check module permission
  if (!roleHasModule(roleConf, module)) return false;
  // Check branch scope
  if (roleConf.scope === 'all') return true;
  if (roleConf.scope === 'branch') {
    const allowed = roleConf.allowedBranches || [];
    if (allowed.length === 0) {
      return !!branch && branch === user.branch;
    }
    if (allowed.includes('all')) return true;
    return !!branch && allowed.includes(branch);
  }
  return false;
}
