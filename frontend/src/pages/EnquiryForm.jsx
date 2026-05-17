import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft } from 'lucide-react';
import '../styles/EnquiryForm.css';

export default function EnquiryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceType: '',
    projectValue: '',
    status: 'new',
    priority: 'medium',
    source: 'Direct',
    description: '',
  });

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
  const priorities = ['low', 'medium', 'high'];
  const sources = ['Direc1t', 'Website', 'Referral', 'Phone', 'Social Media', 'Email'];
  const serviceTypes = ['Residential Survey', 'Commercial Survey', 'Industrial Survey', 'Property Valuation', 'Consultation'];

  useEffect(() => {
    if (isEdit) {
      fetchEnquiry();
    }
  }, [id]);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/enquiries/${id}`);
      setFormData({
        customerName: res.data.customerName,
        email: res.data.email,
        phone: res.data.phone,
        serviceType: res.data.serviceType,
        projectValue: res.data.projectValue,
        status: res.data.status,
        priority: res.data.priority,
        source: res.data.source,
        description: res.data.description,
      });
      setError(null);
    } catch (err) {
      setError('Failed to load enquiry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isEdit) {
        await api.put(`/enquiries/${id}`, formData);
        navigate(`/enquiries/${id}`);
      } else {
        const res = await api.post('/enquiries', formData);
        navigate(`/enquiries/${res.data.id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save enquiry');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading enquiry...</div>;

  return (
    <div className="page-content enquiry-form">
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate(isEdit ? `/enquiries/${id}` : '/enquiries')}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>{isEdit ? 'Edit Enquiry' : 'New Enquiry'}</h1>
      </div>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <h2>Customer Information</h2>
          
          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Enquiry Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType">Service Type *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select Service Type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="projectValue">Project Value (₹)</label>
              <input
                type="number"
                id="projectValue"
                name="projectValue"
                value={formData.projectValue}
                onChange={handleChange}
                placeholder="100000"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the enquiry..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Status & Priority</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="source">Source *</label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
              >
                {sources.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(isEdit ? `/enquiries/${id}` : '/enquiries')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Enquiry' : 'Create Enquiry'}
          </button>
        </div>
      </form>
    </div>
  );
}
