import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Edit2, Trash2, MessageSquare } from 'lucide-react';
import '../styles/EnquiryDetail.css';

export default function EnquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

  const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
  const agents = ['', 'agent@example.com', 'user@example.com', 'admin@gmail.com'];

  useEffect(() => {
    fetchEnquiry();
  }, [id]);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/enquiries/${id}`);
      setEnquiry(res.data);
      setNewStatus(res.data.status);
      setNewAssignee(res.data.assignedTo);
      setError(null);
    } catch (err) {
      setError('Failed to load enquiry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      await api.post(`/enquiries/${id}/notes`, { text: newNote });
      setNewNote('');
      fetchEnquiry();
    } catch (err) {
      alert('Failed to add note');
    }
  };

  const handleStatusChange = async () => {
    if (newStatus === enquiry.status) return;
    try {
      await api.patch(`/enquiries/${id}/status`, { status: newStatus });
      fetchEnquiry();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAssignChange = async () => {
    if (newAssignee === enquiry.assignedTo) return;
    try {
      await api.patch(`/enquiries/${id}/assign`, { assignedTo: newAssignee });
      fetchEnquiry();
    } catch (err) {
      alert('Failed to assign');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.delete(`/enquiries/${id}`);
        navigate('/enquiries');
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (loading) return <div className="loading">Loading enquiry...</div>;
  if (error) return <div className="error-box">{error}</div>;
  if (!enquiry) return <div className="error-box">Enquiry not found</div>;

  return (
    <div className="page-content enquiry-detail">
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/enquiries')}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>{enquiry.customerName}</h1>
        <div className="detail-actions">
          <button className="btn-secondary" onClick={() => navigate(`/enquiries/${id}/edit`)}>
            <Edit2 size={18} /> Edit
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card main-info">
          <h2>Contact Information</h2>
          <div className="info-group">
            <label>Email</label>
            <p>{enquiry.email}</p>
          </div>
          <div className="info-group">
            <label>Phone</label>
            <p>{enquiry.phone}</p>
          </div>
          <div className="info-group">
            <label>Service Type</label>
            <p>{enquiry.serviceType}</p>
          </div>
          <div className="info-group">
            <label>Project Value</label>
            <p>₹{(enquiry.projectValue / 100000).toFixed(2)}L</p>
          </div>
          <div className="info-group">
            <label>Source</label>
            <p>{enquiry.source}</p>
          </div>
          <div className="info-group">
            <label>Description</label>
            <p>{enquiry.description}</p>
          </div>
        </div>

        <div className="detail-card status-section">
          <h2>Status & Assignment</h2>
          
          <div className="status-control">
            <label>Current Status</label>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="status-select">
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            {newStatus !== enquiry.status && (
              <button className="btn-small" onClick={handleStatusChange}>
                Update Status
              </button>
            )}
            <div className="status-badge-display" style={{ backgroundColor: getStatusColor(enquiry.status) }}>
              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
            </div>
          </div>

          <div className="status-control">
            <label>Priority</label>
            <span className={`priority-badge priority-${enquiry.priority}`}>
              {enquiry.priority.charAt(0).toUpperCase() + enquiry.priority.slice(1)}
            </span>
          </div>

          <div className="status-control">
            <label>Assigned To</label>
            <select value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)} className="assign-select">
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent || 'Unassigned'}
                </option>
              ))}
            </select>
            {newAssignee !== enquiry.assignedTo && (
              <button className="btn-small" onClick={handleAssignChange}>
                Assign
              </button>
            )}
            {enquiry.assignedTo && <p className="assigned-info">{enquiry.assignedTo}</p>}
          </div>

          <div className="dates-info">
            <div className="date-item">
              <label>Created</label>
              <p>{formatDate(enquiry.createdAt)}</p>
            </div>
            <div className="date-item">
              <label>Follow-up</label>
              <p>{formatDate(enquiry.followUpDate)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-card notes-section">
        <h2><MessageSquare size={20} /> Notes & Activity</h2>

        <form onSubmit={handleAddNote} className="add-note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows="3"
          ></textarea>
          <button type="submit" className="btn-small">Add Note</button>
        </form>

        <div className="notes-list">
          {enquiry.notes && enquiry.notes.length > 0 ? (
            enquiry.notes.map((note, idx) => (
              <div key={idx} className="note-item">
                <div className="note-header">
                  <strong>{note.by}</strong>
                  <span className="note-time">{formatDate(note.timestamp)}</span>
                </div>
                <p>{note.text}</p>
              </div>
            ))
          ) : (
            <p className="empty-notes">No notes yet</p>
          )}
        </div>
      </div>

      <div className="detail-card activity-section">
        <h2>Activity Timeline</h2>
        <div className="activity-list">
          {enquiry.activity && enquiry.activity.length > 0 ? (
            enquiry.activity.map((act, idx) => (
              <div key={idx} className="activity-item">
                <span className="activity-type">{act.type}</span>
                <span className="activity-time">{formatDate(act.timestamp)}</span>
                {act.from && <span className="activity-detail">{act.from} → {act.to}</span>}
              </div>
            ))
          ) : (
            <p className="empty-activity">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
