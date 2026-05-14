import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, BarChart3, List, KanbanSquare, Users, ArrowDown, ArrowUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/Enquiries.css';

const demoNames = ['Shiva Kumar', 'Aditi Sharma', 'Karan Patel', 'Priya Singh', 'Ravi Verma', 'Sneha Joshi', 'Manish Gupta', 'Neha Reddy', 'Amit Shah', 'Sangeeta Rao'];
const demoStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
const demoPriorities = ['low', 'medium', 'high'];
const demoSources = ['Direct', 'Website', 'Referral', 'Phone', 'Social Media', 'Email'];
const demoServiceTypes = ['Residential Survey', 'Commercial Survey', 'Industrial Survey', 'Property Valuation', 'Consultation'];
const demoAssignees = ['agent@example.com', 'user@example.com', 'admin@gmail.com'];

const generateDummyEnquiries = () => {
  return Array.from({ length: 100 }, (_, idx) => {
    const index = idx + 1;
    const name = demoNames[idx % demoNames.length];
    const [firstName] = name.split(' ');
    const email = `${firstName.toLowerCase()}${index}@example.com`;
    const phone = `9${String(700000000 + (idx * 1234567) % 300000000).padStart(9, '0')}`;
    const serviceType = demoServiceTypes[idx % demoServiceTypes.length];
    const source = demoSources[idx % demoSources.length];
    const status = demoStatuses[idx % demoStatuses.length];
    const priority = demoPriorities[idx % demoPriorities.length];
    const assignedTo = demoAssignees[idx % demoAssignees.length];
    const projectValue = 50000 + (idx % 15) * 75000;
    const leadScore = 30 + (idx % 70);
    const updatedAt = new Date(Date.now() - idx * 86400000).toISOString();

    return {
      id: `DUMMY-${1000 + idx}`,
      customerName: name,
      email,
      phone,
      serviceType,
      source,
      status,
      priority,
      assignedTo,
      projectValue,
      leadScore,
      updatedAt,
      notes: ['Imported enquiry for testing'],
    };
  });
};

export default function Enquiries() {
  const [view, setView] = useState('dashboard');
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [pipelineLeads, setPipelineLeads] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceType: '',
    projectValue: '',
    status: 'new',
    priority: 'medium',
    source: 'Direct',
    assignedTo: 'agent@example.com',
    leadScore: 50,
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const rowsPerPage = 20;

  const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
  const priorities = ['low', 'medium', 'high'];
  const sources = ['Direct', 'Website', 'Referral', 'Phone', 'Social Media', 'Email'];
  const serviceTypes = ['Residential Survey', 'Commercial Survey', 'Industrial Survey', 'Property Valuation', 'Consultation'];
  const assignees = ['agent@example.com', 'user@example.com', 'admin@gmail.com'];

  const isSampleOnly = true;
  const [dummyEnquiries, setDummyEnquiries] = useState(generateDummyEnquiries);

  const filterDummyEnquiries = (entries) => {
    return entries.filter((enquiry) => {
      const searchValue = search.toLowerCase();
      const matchesSearch = !search || [
        enquiry.customerName,
        enquiry.email,
        enquiry.phone,
        enquiry.serviceType,
        enquiry.source,
        enquiry.assignedTo,
      ].some((field) => field?.toLowerCase().includes(searchValue));

      return (
        matchesSearch &&
        (!statusFilter || enquiry.status === statusFilter) &&
        (!priorityFilter || enquiry.priority === priorityFilter) &&
        (!sourceFilter || enquiry.source === sourceFilter)
      );
    });
  };

  const sortDummyEnquiries = (entries) => {
    return [...entries].sort((a, b) => {
      const getValue = (item, field) => {
        if (field === 'updatedAt') return new Date(item.updatedAt).getTime();
        if (typeof item[field] === 'number') return item[field];
        return String(item[field] || '').toLowerCase();
      };

      const valueA = getValue(a, sortBy);
      const valueB = getValue(b, sortBy);

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (view === 'list') {
      fetchEnquiries();
    }
    if (view === 'pipeline') {
      fetchPipeline();
    }
  }, [search, statusFilter, priorityFilter, sourceFilter, sortBy, sortOrder, page, view]);

  const fetchDashboard = () => {
    setLoading(true);
    const demoStats = dummyEnquiries.reduce(
      (acc, enquiry) => {
        acc.total += 1;
        acc.totalValue += enquiry.projectValue || 0;
        acc[enquiry.status] += 1;
        if (enquiry.priority === 'high') acc.highPriority += 1;
        return acc;
      },
      { total: 0, totalValue: 0, new: 0, contacted: 0, qualified: 0, converted: 0, lost: 0, highPriority: 0 }
    );
    demoStats.conversionRate = demoStats.total ? Math.round((demoStats.converted / demoStats.total) * 100) : 0;
    setStats(demoStats);
    setError(null);
    setLoading(false);
  };

  const fetchEnquiries = () => {
    setLoading(true);
    const filtered = filterDummyEnquiries(dummyEnquiries);
    const sorted = sortDummyEnquiries(filtered);
    setEnquiries(sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage));
    setTotalResults(sorted.length);
    setError(null);
    setLoading(false);
  };

  const fetchPipeline = () => {
    setLoading(true);
    const filtered = filterDummyEnquiries(dummyEnquiries);
    const sorted = sortDummyEnquiries(filtered);
    setPipelineLeads(sorted.slice(0, 100));
    setError(null);
    setLoading(false);
  };

  const fetchEnquiryDetail = (id) => {
    const enquiry = dummyEnquiries.find((item) => item.id === id);
    if (!enquiry) {
      alert('Enquiry not found');
      return;
    }
    setSelectedEnquiry(enquiry);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    const updated = {
      ...selectedEnquiry,
      notes: [...(selectedEnquiry.notes || []), newNote.trim()],
    };
    setNewNote('');
    setSelectedEnquiry(updated);
    setDummyEnquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedEnquiry) return;
    const updated = {
      ...selectedEnquiry,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    setSelectedEnquiry(updated);
    setDummyEnquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    fetchDashboard();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      projectValue: Number(formData.projectValue) || 0,
      leadScore: Number(formData.leadScore) || 0,
      updatedAt: new Date().toISOString(),
      notes: formData.notes || ['Imported enquiry for testing'],
    };

    if (editingId) {
      const updated = { ...updatedData, id: editingId };
      setDummyEnquiries((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      setEditingId(null);
      setSelectedEnquiry(updated);
    } else {
      const newEntry = {
        ...updatedData,
        id: `DUMMY-${Date.now()}`,
      };
      setDummyEnquiries((prev) => [newEntry, ...prev]);
      setSelectedEnquiry(newEntry);
    }

    setShowForm(false);
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      serviceType: '',
      projectValue: '',
      status: 'new',
      priority: 'medium',
      source: 'Direct',
      assignedTo: 'agent@example.com',
      leadScore: 50,
      description: '',
    });
    fetchDashboard();
    fetchEnquiries();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this enquiry?')) {
      setDummyEnquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
      fetchEnquiries();
      fetchDashboard();
    }
  };

  const handleEdit = (enquiry) => {
    setFormData(enquiry);
    setEditingId(enquiry.id);
    setShowForm(true);
    setView('form');
  };

  const getStatusColor = (status) => {
    const colors = {
      new: '#ef4444',
      contacted: '#f97316',
      qualified: '#eab308',
      converted: '#22c55e',
      lost: '#6b7280',
    };
    return colors[status] || '#6b7280';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalPages = Math.ceil(totalResults / rowsPerPage);

  const resetForm = () => {
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      serviceType: '',
      projectValue: '',
      status: 'new',
      priority: 'medium',
      source: 'Direct',
      assignedTo: 'agent@example.com',
      leadScore: 50,
      description: '',
    });
  };

  const renderViewButtons = () => (
    <>
      <button className={`view-toggle ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')} title="Dashboard">
        <BarChart3 size={18} />
      </button>
      <button className={`view-toggle ${view === 'pipeline' ? 'active' : ''}`} onClick={() => setView('pipeline')} title="Pipeline">
        <KanbanSquare size={18} />
      </button>
      <button className={`view-toggle ${view === 'list' ? 'active' : ''}`} onClick={() => { setView('list'); setPage(1); }} title="List View">
        <List size={18} />
      </button>
    </>
  );

  const renderHeaderTitle = (title = 'Enquiry & Lead Management') => (
    <div className="enquiry-title-row">
      <h1>{title}</h1>
    </div>
  );

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  };

  const renderTableHeader = (label, field) => {
    const isActive = sortBy === field;
    const nextOrder = isActive && sortOrder === 'asc' ? 'desc' : 'asc';
    const SortIcon = isActive && sortOrder === 'asc' ? ArrowUp : ArrowDown;

    return (
      <span className="table-header-sort">
        <span>{label}</span>
        <button
          className={`table-sort-btn ${isActive ? 'active' : ''}`}
          onClick={() => handleSort(field, nextOrder)}
          title={`${label} ${nextOrder}`}
          type="button"
        >
          <SortIcon size={13} />
        </button>
      </span>
    );
  };

  const renderLeadForm = () => (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h2>{editingId ? 'Edit Enquiry' : 'New Enquiry'}</h2>
          <button className="close-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="inline-form">
          <div className="form-cols">
            <div>
              <label>Full Name *</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleFormChange} required />
            </div>
            <div>
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </div>
          </div>

          <div className="form-cols">
            <div>
              <label>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
            </div>
            <div>
              <label>Service Type</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleFormChange}>
                <option value="">Select</option>
                {serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="form-cols">
            <div>
              <label>Project Value</label>
              <input type="number" name="projectValue" value={formData.projectValue} onChange={handleFormChange} />
            </div>
            <div>
              <label>Source</label>
              <select name="source" value={formData.source} onChange={handleFormChange}>
                {sources.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-cols">
            <div>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleFormChange}>
                {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleFormChange}>
                {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div className="form-cols">
            <div>
              <label>Assigned To</label>
              <select name="assignedTo" value={formData.assignedTo || ''} onChange={handleFormChange}>
                {assignees.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label>Lead Score</label>
              <input type="number" name="leadScore" min="0" max="100" value={formData.leadScore || 0} onChange={handleFormChange} />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3"></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
            <button type="submit" className="btn-primary">Save Enquiry</button>
          </div>
        </form>
      </div>
    </div>
  );

  // Dashboard view
  if (view === 'dashboard') {
    const statusData = [
      { name: 'New', value: stats?.new || 0, fill: '#ef4444' },
      { name: 'Contacted', value: stats?.contacted || 0, fill: '#f97316' },
      { name: 'Qualified', value: stats?.qualified || 0, fill: '#eab308' },
      { name: 'Converted', value: stats?.converted || 0, fill: '#22c55e' },
      { name: 'Lost', value: stats?.lost || 0, fill: '#6b7280' },
    ];

    const pipelineData = [
      { stage: 'New', count: stats?.new || 0 },
      { stage: 'Contacted', count: stats?.contacted || 0 },
      { stage: 'Qualified', count: stats?.qualified || 0 },
      { stage: 'Converted', count: stats?.converted || 0 },
    ];

    return (
      <div className="page-content enquiry-unified">
        <div className="unified-header">
          {renderHeaderTitle()}
          <div className="header-actions">
            <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); setEditingId(null); }}>
              <Plus size={18} /> New Enquiry
            </button>
            {renderViewButtons()}
          </div>
        </div>

        {showForm && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="modal-header">
                <h2>{editingId ? 'Edit Enquiry' : 'New Enquiry'}</h2>
                <button className="close-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="inline-form">
                <div className="form-cols">
                  <div>
                    <label>Full Name *</label>
                    <input type="text" name="customerName" value={formData.customerName} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Service Type</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleFormChange}>
                      <option value="">Select</option>
                      {serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Project Value (₹)</label>
                    <input type="number" name="projectValue" value={formData.projectValue} onChange={handleFormChange} />
                  </div>
                  <div>
                    <label>Source</label>
                    <select name="source" value={formData.source} onChange={handleFormChange}>
                      {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleFormChange}>
                      {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleFormChange}>
                      {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Assigned To</label>
                    <select name="assignedTo" value={formData.assignedTo || ''} onChange={handleFormChange}>
                      {assignees.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Lead Score</label>
                    <input type="number" name="leadScore" min="0" max="100" value={formData.leadScore || 0} onChange={handleFormChange} />
                  </div>
                </div>

                <div>
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3"></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                  <button type="submit" className="btn-primary">Save Enquiry</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading dashboard...</div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon total"><span>{stats?.total || 0}</span></div>
                <div className="stat-content">
                  <h3>Total Enquiries</h3>
                  <p>{stats?.total || 0}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon high"><span>{stats?.highPriority || 0}</span></div>
                <div className="stat-content">
                  <h3>High Priority</h3>
                  <p>{stats?.highPriority || 0}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon converted"><span>{stats?.converted || 0}</span></div>
                <div className="stat-content">
                  <h3>Conversion Rate</h3>
                  <p>{stats?.conversionRate || 0}%</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon value"><span>₹{(stats?.totalValue / 100000).toFixed(1)}L</span></div>
                <div className="stat-content">
                  <h3>Pipeline Value</h3>
                  <p>₹{(stats?.totalValue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-box">
                <h3>Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={70} fill="#8884d8" dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>Pipeline by Stage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (view === 'pipeline') {
    const pipelineColumns = statuses.map((status) => ({
      status,
      leads: pipelineLeads.filter((lead) => lead.status === status),
    }));

    return (
      <div className="page-content enquiry-unified">
        <div className="unified-header">
          {renderHeaderTitle('Lead Pipeline')}
          <div className="header-actions">
            <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); setEditingId(null); }}>
              <Plus size={18} /> New Lead
            </button>
            {renderViewButtons()}
          </div>
        </div>

        {showForm && renderLeadForm()}

        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search lead, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="filter-select">
            <option value="">All Priority</option>
            {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </select>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="filter-select">
            <option value="">All Sources</option>
            {sources.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading lead pipeline...</div>
        ) : (
          <div className="pipeline-board">
            {pipelineColumns.map((column) => (
              <section className="pipeline-column" key={column.status}>
                <div className="pipeline-column-header">
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(column.status) }}></span>
                  <h2>{column.status}</h2>
                  <strong>{column.leads.length}</strong>
                </div>
                <div className="pipeline-cards">
                  {column.leads.map((lead) => (
                    <article className="pipeline-card" key={lead.id}>
                      <div className="pipeline-card-title">
                        <strong>{lead.customerName}</strong>
                        <span className={`priority-badge priority-${lead.priority}`}>{lead.priority}</span>
                      </div>
                      <p>{lead.serviceType}</p>
                      <div className="pipeline-meta">
                        <span>{lead.source}</span>
                        <span>{(lead.projectValue / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="lead-score">
                        <span>Score {lead.leadScore || 0}</span>
                        <div><i style={{ width: `${lead.leadScore || 0}%` }}></i></div>
                      </div>
                      <div className="pipeline-owner">
                        <Users size={14} />
                        <span>{lead.assignedTo || 'Unassigned'}</span>
                      </div>
                      <button className="pipeline-open" onClick={() => fetchEnquiryDetail(lead.id)}>Open lead</button>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {selectedEnquiry && (
          <div className="detail-panel">
            <div className="detail-header">
              <h2>{selectedEnquiry.customerName}</h2>
              <button className="close-btn" onClick={() => setSelectedEnquiry(null)}><X size={20} /></button>
            </div>
            <div className="detail-body">
              <div className="detail-info">
                <div className="info-item"><label>Email</label><p>{selectedEnquiry.email}</p></div>
                <div className="info-item"><label>Phone</label><p>{selectedEnquiry.phone}</p></div>
                <div className="info-item"><label>Assigned To</label><p>{selectedEnquiry.assignedTo}</p></div>
                <div className="info-item"><label>Follow Up</label><p>{formatDate(selectedEnquiry.followUpDate)}</p></div>
                <div className="info-item">
                  <label>Status</label>
                  <select value={selectedEnquiry.status} onChange={(e) => handleStatusChange(e.target.value)}>
                    {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="detail-notes">
                <h3>Lead Notes</h3>
                <form onSubmit={handleAddNote} className="note-form">
                  <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add lead follow-up note..." rows="2"></textarea>
                  <button type="submit">Add Note</button>
                </form>
                <div className="notes-list">
                  {selectedEnquiry.notes?.map((note, idx) => (
                    <div key={idx} className="note-item">
                      <p>{note.text || note}</p>
                      <small>{note.timestamp ? formatDate(note.timestamp) : 'Imported note'}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List view
  if (view === 'list') {
    return (
      <div className="page-content enquiry-unified">
        <div className="unified-header">
          {renderHeaderTitle()}
          <div className="header-actions">
            <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); setEditingId(null); }}>
              <Plus size={18} /> New Enquiry
            </button>
            {renderViewButtons()}
          </div>
        </div>

        {showForm && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="modal-header">
                <h2>{editingId ? 'Edit Enquiry' : 'New Enquiry'}</h2>
                <button className="close-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="inline-form">
                <div className="form-cols">
                  <div>
                    <label>Full Name *</label>
                    <input type="text" name="customerName" value={formData.customerName} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Service Type</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleFormChange}>
                      <option value="">Select</option>
                      {serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Project Value (₹)</label>
                    <input type="number" name="projectValue" value={formData.projectValue} onChange={handleFormChange} />
                  </div>
                  <div>
                    <label>Source</label>
                    <select name="source" value={formData.source} onChange={handleFormChange}>
                      {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleFormChange}>
                      {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleFormChange}>
                      {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-cols">
                  <div>
                    <label>Assigned To</label>
                    <select name="assignedTo" value={formData.assignedTo || ''} onChange={handleFormChange}>
                      {assignees.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Lead Score</label>
                    <input type="number" name="leadScore" min="0" max="100" value={formData.leadScore || 0} onChange={handleFormChange} />
                  </div>
                </div>

                <div>
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3"></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                  <button type="submit" className="btn-primary">Save Enquiry</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="filter-select">
            <option value="">All Status</option>
            {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }} className="filter-select">
            <option value="">All Priority</option>
            {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </select>
          <select value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }} className="filter-select">
            <option value="">All Sources</option>
            {sources.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : enquiries.length === 0 ? (
          <div className="empty-state">No enquiries found</div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="enquiry-table">
                <thead>
                  <tr>
                    <th>{renderTableHeader('S.No', 'id')}</th>
                    <th>{renderTableHeader('Name', 'customerName')}</th>
                    <th>{renderTableHeader('Contact', 'email')}</th>
                    <th>{renderTableHeader('Service', 'serviceType')}</th>
                    <th>{renderTableHeader('Value', 'projectValue')}</th>
                    <th>{renderTableHeader('Status', 'status')}</th>
                    <th>{renderTableHeader('Priority', 'priority')}</th>
                    <th>{renderTableHeader('Owner', 'assignedTo')}</th>
                    <th>{renderTableHeader('Score', 'leadScore')}</th>
                    <th>{renderTableHeader('Updated', 'updatedAt')}</th>
                    <th>{renderTableHeader('Actions', 'id')}</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry, index) => (
                    <tr key={enquiry.id}>
                      <td data-label="S.No">{(page - 1) * rowsPerPage + index + 1}</td>
                      <td data-label="Name">{enquiry.customerName}</td>
                      <td data-label="Contact">{enquiry.email}</td>
                      <td data-label="Service">{enquiry.serviceType}</td>
                      <td data-label="Value">₹{(enquiry.projectValue / 100000).toFixed(1)}L</td>
                      <td data-label="Status"><span className="status-badge" style={{ backgroundColor: getStatusColor(enquiry.status) }}>{enquiry.status}</span></td>
                      <td data-label="Priority"><span className={`priority-badge priority-${enquiry.priority}`}>{enquiry.priority}</span></td>
                      <td data-label="Owner">{enquiry.assignedTo || 'Unassigned'}</td>
                      <td data-label="Score">{enquiry.leadScore || 0}</td>
                      <td data-label="Updated">{formatDate(enquiry.updatedAt)}</td>
                      <td data-label="Actions" className="actions">
                        <button className="icon-btn view" onClick={() => fetchEnquiryDetail(enquiry.id)} title="View"><Eye size={16} /></button>
                        <button className="icon-btn edit" onClick={() => handleEdit(enquiry)} title="Edit"><Edit2 size={16} /></button>
                        <button className="icon-btn delete" onClick={() => handleDelete(enquiry.id)} title="Delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
              <span>{page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          </>
        )}

        {selectedEnquiry && (
          <div className="detail-panel">
            <div className="detail-header">
              <h2>{selectedEnquiry.customerName}</h2>
              <button className="close-btn" onClick={() => setSelectedEnquiry(null)}><X size={20} /></button>
            </div>

            <div className="detail-body">
              <div className="detail-info">
                <div className="info-item">
                  <label>Email</label>
                  <p>{selectedEnquiry.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <p>{selectedEnquiry.phone}</p>
                </div>
                <div className="info-item">
                  <label>Service</label>
                  <p>{selectedEnquiry.serviceType}</p>
                </div>
                <div className="info-item">
                  <label>Value</label>
                  <p>₹{(selectedEnquiry.projectValue / 100000).toFixed(2)}L</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <select value={selectedEnquiry.status} onChange={(e) => handleStatusChange(e.target.value)}>
                    {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className="detail-notes">
                <h3>Notes</h3>
                <form onSubmit={handleAddNote} className="note-form">
                  <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note..." rows="2"></textarea>
                  <button type="submit">Add Note</button>
                </form>
                <div className="notes-list">
                  {selectedEnquiry.notes && selectedEnquiry.notes.map((note, idx) => (
                    <div key={idx} className="note-item">
                      <p>{note.text || note}</p>
                      <small>{note.timestamp ? formatDate(note.timestamp) : 'Imported note'}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
