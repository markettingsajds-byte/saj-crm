import React from 'react';

const leaveRequests = [
  { employee: 'JAYAKUMAR', type: 'casual_leave', from: '07/05/2026', to: '08/05/2026', days: 2, reason: 'Going to hospital', status: 'Pending', requested: '05/05/2026' },
  { employee: 'MURALIDHARAN.K', type: 'casual_leave', from: '13/05/2026', to: '15/05/2026', days: 3, reason: 'Hometown', status: 'Pending', requested: '06/05/2026' },
  { employee: 'PRATHAP.B', type: 'earned_leave', from: '17/05/2026', to: '17/05/2026', days: 1, reason: 'Leave', status: 'Pending', requested: '16/05/2026' },
];

export default function LeaveRequests() {
  return (
    <div className="page-content leave-page">
      <div className="page-header">
        <div>
          <h1>Leave Requests</h1>
          <p>Approve or reject pending employee leave submissions.</p>
        </div>
      </div>

      <div className="page-table-wrap">
        <table className="page-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Total Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={`${request.employee}-${index}`}>
                <td>{index + 1}</td>
                <td>{request.employee}</td>
                <td>{request.type}</td>
                <td>{request.from}</td>
                <td>{request.to}</td>
                <td>{request.days}</td>
                <td>{request.reason}</td>
                <td><span className={`status-pill ${request.status.toLowerCase()}`}>{request.status}</span></td>
                <td>{request.requested}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
