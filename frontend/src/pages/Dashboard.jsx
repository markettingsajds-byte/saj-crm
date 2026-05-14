import React from 'react';

const stats = [
  { title: 'Total Leads', value: '1,248', change: '+12%' },
  { title: 'Open Enquiries', value: '76', change: '+5%' },
  { title: 'Active Projects', value: '14', change: '-2%' },
  { title: 'New Customers', value: '23', change: '+18%' },
];

const recentEnquiries = [
  { id: 'ENQ-1001', name: 'Shiva Kumar', source: 'Website', status: 'Open', assigned: 'Ramesh' },
  { id: 'ENQ-1002', name: 'Aditi Sharma', source: 'Phone', status: 'In Progress', assigned: 'Priya' },
  { id: 'ENQ-1003', name: 'Karan Patel', source: 'Google Ads', status: 'Closed', assigned: 'Vikram' },
  { id: 'ENQ-1004', name: 'Sangeeta Rao', source: 'Walk-in', status: 'Open', assigned: 'Amit' },
];

export default function Dashboard() {
  return (
    <div className="page-content dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to SAJ CRM. Here is your latest business overview.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {stats.map((item) => (
          <div className="dashboard-card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="dashboard-value">{item.value}</p>
            <span className="dashboard-change">{item.change}</span>
          </div>
        ))}
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Enquiries</h2>
          <p>Latest leads and follow-up status.</p>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Enquiry ID</th>
                <th>Customer</th>
                <th>Source</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.source}</td>
                  <td>{row.status}</td>
                  <td>{row.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
