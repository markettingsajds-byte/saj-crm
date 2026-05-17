import { useMemo, useState } from 'react';
import { Search, Plus, X, CalendarDays, Clock, Users } from 'lucide-react';
import '../styles/Followups.css';

const demoNames = ['Shiva Kumar', 'Aditi Sharma', 'Karan Patel', 'Priya Singh', 'Ravi Verma', 'Sneha Joshi', 'Manish Gupta', 'Neha Reddy'];
const serviceTypes = ['Residential Survey', 'Commercial Survey', 'Industrial Survey', 'Property Valuation', 'Consultation'];
const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
const assignees = ['agent@example.com', 'user@example.com', 'admin@gmail.com'];
const followupReasons = [
  'Site inspection required',
  'Client quotation needed',
  'Document review',
  'Price negotiation',
  'Site verification',
  'Report delivery',
  'Final confirmation',
  'Payment follow-up',
  'Additional information needed',
  'Proposal discussion',
];

function createFollowupData() {
  return Array.from({ length: 10 }, (_, idx) => {
    const leadIndex = idx % demoNames.length;
    const date = new Date(Date.now() + idx * 86400000 + (idx % 5) * 3600000);
    return {
      id: `FUP-${1000 + idx}`,
      customerName: demoNames[leadIndex],
      serviceType: serviceTypes[idx % serviceTypes.length],
      assignedTo: assignees[idx % assignees.length],
      status: statuses[idx % statuses.length],
      followUpAt: date.toISOString(),
      notes: `Follow up for ${serviceTypes[idx % serviceTypes.length]}`,
    };
  });
}

function formatFollowUpDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function Followups() {
  const [followups, setFollowups] = useState(createFollowupData);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalDate, setModalDate] = useState('');
  const [modalTime, setModalTime] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [showNextNote, setShowNextNote] = useState(false);

  const sortedFollowups = useMemo(() => {
    return [...followups]
      .filter((item) => {
        const query = search.toLowerCase();
        return (
          item.customerName.toLowerCase().includes(query) ||
          item.serviceType.toLowerCase().includes(query) ||
          item.assignedTo.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => new Date(a.followUpAt) - new Date(b.followUpAt));
  }, [followups, search]);

  const openModal = (item = null) => {
    if (item) {
      const date = new Date(item.followUpAt);
      setModalDate(date.toISOString().slice(0, 10));
      setModalTime(date.toTimeString().slice(0, 5));
      setModalNotes(item.notes || '');
    } else {
      const now = new Date();
      setModalDate(now.toISOString().slice(0, 10));
      setModalTime(now.toTimeString().slice(0, 5));
      setModalNotes('');
    }
    setModalItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalItem(null);
    setModalNotes('');
    setModalReason('');
    setShowNextNote(false);
  };

  const saveFollowup = (event) => {
    event.preventDefault();
    const followUpAt = `${modalDate}T${modalTime}:00`;

    if (modalItem) {
      setFollowups((prev) => prev.map((item) => (item.id === modalItem.id ? { ...item, followUpAt, notes: modalNotes } : item)));
    } else {
      const nextId = `FUP-${Date.now()}`;
      setFollowups((prev) => [
        ...prev,
        {
          id: nextId,
          customerName: 'New Lead',
          serviceType: serviceTypes[0],
          assignedTo: assignees[0],
          status: 'new',
          followUpAt,
          notes: modalNotes || 'Scheduled follow-up',
        },
      ]);
    }

    closeModal();
  };

  const upcomingCount = sortedFollowups.filter((item) => new Date(item.followUpAt) >= new Date()).length;

  return (
    <div className="page-content followup-page">
      <div className="unified-header">
        <div className="enquiry-title-row">
          <CalendarDays size={24} />
          <h1>Enquiry Followups</h1>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => openModal(null)}>
            <Plus size={18} /> Schedule Follow-up
          </button>
        </div>
      </div>

      <div className="followup-summary">
        <div>
          <h2>Upcoming follow-ups</h2>
          <p>{upcomingCount} follow-up{upcomingCount === 1 ? '' : 's'} scheduled</p>
        </div>
        <div className="followup-search">
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by lead, service, assignee or status" />
        </div>
      </div>

      <div className="followup-list">
        {sortedFollowups.map((item) => (
          <article key={item.id} className="followup-card">
            <div className="followup-card-top">
              <div>
                <strong>{item.customerName}</strong>
                <span>{item.serviceType}</span>
              </div>
              <span className={`status-chip status-${item.status}`}>{item.status}</span>
            </div>
            <div className="followup-details">
              <div>
                <small>Date & Time</small>
                <p>{formatFollowUpDate(item.followUpAt)}</p>
              </div>
              <div>
                <small>Assigned To</small>
                <p>{item.assignedTo}</p>
              </div>
              <div>
                <small>Notes</small>
                <p>{item.notes}</p>
              </div>
            </div>
            <div className="followup-actions">
              <button className="btn-secondary" onClick={() => openModal(item)}>
                <Clock size={16} /> Reschedule
              </button>
            </div>
          </article>
        ))}
      </div>

      {showModal && (
        <div className="form-modal-overlay">
          <div className="form-modal followup-modal">
            <div className="modal-header">
              <h2>{modalItem ? 'Reschedule Follow-up' : 'Schedule Follow-up'}</h2>
              <button className="close-btn" type="button" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveFollowup} className="inline-form followup-form">
              {modalItem && (
                <div className="frozen-section">
                  <h3>Previous Notes</h3>
                  <div className="frozen-notes">
                    <p>{modalItem.notes}</p>
                  </div>
                </div>
              )}

              <div className="form-cols">
                <div>
                  <label>Follow-up Date</label>
                  <input type="date" value={modalDate} onChange={(e) => setModalDate(e.target.value)} required />
                </div>
                <div>
                  <label>Follow-up Time</label>
                  <input type="time" value={modalTime} onChange={(e) => setModalTime(e.target.value)} required />
                </div>
              </div>

              {modalItem && !showNextNote && (
                <div className="next-followup-trigger">
                  <button type="button" className="btn-secondary-link" onClick={() => setShowNextNote(true)}>
                    + Schedule Next Follow-up
                  </button>
                </div>
              )}

              {showNextNote && (
                <div className="next-followup-section">
                  <h3>Next Follow-up Details</h3>
                  <div>
                    <label>Reason for Next Follow-up</label>
                    <select value={modalReason} onChange={(e) => setModalReason(e.target.value)} required>
                      <option value="">Select reason</option>
                      {followupReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Follow-up Note</label>
                    <textarea value={modalNotes} onChange={(e) => setModalNotes(e.target.value)} rows="3" placeholder="Add follow-up instructions or reminders" />
                  </div>
                </div>
              )}

              {!showNextNote && !modalItem && (
                <div>
                  <label>Notes</label>
                  <textarea value={modalNotes} onChange={(e) => setModalNotes(e.target.value)} rows="3" placeholder="Add follow-up instructions or reminders" />
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {modalItem ? 'Update Follow-up' : 'Save Follow-up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
