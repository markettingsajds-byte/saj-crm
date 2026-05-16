import React from 'react';

const payments = [
  { id: 'PRJT567', project: '065_NEW_EM04_2627_12_05_SOKK74_60PR_NIL_MOHANRAJ', status: 'Pending', amount: '₹6,000.00', due: '14-05-2026' },
  { id: 'PRJT566', project: '067_EX-10_EM03_2627_13_05_SOKK01', status: 'Pending', amount: '₹6,000.00', due: '14-05-2026' },
  { id: 'PRJT565', project: '68-NEW-ES04-14-05-2026', status: 'Pending', amount: '₹6,000.00', due: '14-05-2026' },
  { id: 'PRJT564', project: 'drawing', status: 'Completed', amount: '₹0', due: '14-05-2026' },
  { id: 'PRJT563', project: 'JOB NO-66-KODIYAMPALAYAM', status: 'Completed', amount: '₹0', due: '13-05-2026' },
];

export default function Payments() {
  return (
    <div className="page-content payments-page">
      <div className="page-header">
        <div>
          <h1>Payments</h1>
          <p>Overview of total revenue, pending payments, and collection status.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="info-card">
          <span>Total Revenue</span>
          <strong>₹7,35,321.00</strong>
        </div>
        <div className="info-card">
          <span>Total Pending Payment</span>
          <strong>₹34,54,821.00</strong>
        </div>
        <div className="info-card">
          <span>To Be Collected From</span>
          <strong>397</strong>
        </div>
      </div>

      <div className="page-table-wrap payments-table-wrap">
        <table className="page-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Project Value</th>
              <th>Balance Payment</th>
              <th>Project ID</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((row) => (
              <tr key={row.id}>
                <td>{row.project}</td>
                <td>₹6,000.00</td>
                <td>{row.amount}</td>
                <td>{row.id}</td>
                <td>{row.due}</td>
                <td><span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
