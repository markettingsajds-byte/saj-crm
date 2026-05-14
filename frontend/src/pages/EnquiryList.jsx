import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Search, Filter, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import '../styles/EnquiryList.css';

export default function EnquiryList() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
  const priorities = ['low', 'medium', 'high'];

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter, priorityFilter, page]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
      });
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);

      const res = await api.get(`/enquiries?${params.toString()}`);
      setEnquiries(res.data.data);
      setTotalResults(res.data.total);
      setError(null);
    } catch (err) {
      setError('Failed to load enquiries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.delete(`/enquiries/${id}`);
        fetchEnquiries();
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
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

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="page-content enquiry-list">
      <div className="list-header">
        <h1>Enquiries & Leads</h1>
        <button className="btn-primary" onClick={() => navigate('/enquiries/new')}>
          <Plus size={18} /> New Enquiry
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Priority</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading ? (
        <div className="loading">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="empty-state">
          <p>No enquiries found</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td className="name-col">{enquiry.customerName}</td>
                    <td>
                      <div className="contact-info">
                        <p>{enquiry.email}</p>
                        <p>{enquiry.phone}</p>
                      </div>
                    </td>
                    <td>{enquiry.serviceType}</td>
                    <td className="value-col">₹{(enquiry.projectValue / 100000).toFixed(1)}L</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(enquiry.status) }}>
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge priority-${enquiry.priority}`}>
                        {enquiry.priority.charAt(0).toUpperCase() + enquiry.priority.slice(1)}
                      </span>
                    </td>
                    <td>{enquiry.assignedTo || '-'}</td>
                    <td>{formatDate(enquiry.updatedAt)}</td>
                    <td className="actions-col">
                      <button
                        className="icon-btn view"
                        onClick={() => navigate(`/enquiries/${enquiry.id}`)}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="icon-btn edit"
                        onClick={() => navigate(`/enquiries/${enquiry.id}/edit`)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDelete(enquiry.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </button>
            <span>{page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
