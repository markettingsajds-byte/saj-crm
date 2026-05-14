import { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import '../styles/EnquiryDashboard.css';

export default function EnquiryDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/enquiries/stats');
      setStats(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  if (!stats) {
    return (
      <div className="page-content">
        <h1>Enquiry Dashboard</h1>
        <div className="error-box">{error || 'Unable to load statistics'}</div>
      </div>
    );
  }

  const statusData = [
    { name: 'New', value: stats.new, fill: '#ef4444' },
    { name: 'Contacted', value: stats.contacted, fill: '#f97316' },
    { name: 'Qualified', value: stats.qualified, fill: '#eab308' },
    { name: 'Converted', value: stats.converted, fill: '#22c55e' },
    { name: 'Lost', value: stats.lost, fill: '#6b7280' },
  ];

  const pipelineData = [
    { stage: 'New', count: stats.new, value: stats.new * 5000 },
    { stage: 'Contacted', count: stats.contacted, value: stats.contacted * 15000 },
    { stage: 'Qualified', count: stats.qualified, value: stats.qualified * 50000 },
    { stage: 'Converted', count: stats.converted, value: stats.converted * 100000 },
  ];

  return (
    <div className="page-content enquiry-dashboard">
      <div className="dashboard-header">
        <h1>Enquiry Management Dashboard</h1>
        <button className="btn-primary" onClick={() => window.location.href = '/enquiries/new'}>
          + New Enquiry
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Enquiries</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon high">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>High Priority</h3>
            <p className="stat-value">{stats.highPriority}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon converted">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Converted</h3>
            <p className="stat-value">{stats.converted}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon value">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Pipeline Value</h3>
            <p className="stat-value">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2>Lead Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Sales Pipeline by Stage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis yAxisId="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Value (₹)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Enquiries" />
              <Bar yAxisId="right" dataKey="value" fill="#10b981" name="Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="status-breakdown">
        <h2>Status Breakdown</h2>
        <div className="status-list">
          {statusData.map((status) => (
            <div key={status.name} className="status-item">
              <div className="status-label">
                <span className="status-dot" style={{ backgroundColor: status.fill }}></span>
                {status.name}
              </div>
              <span className="status-count">{status.value} enquiries</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
