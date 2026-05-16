import React from 'react';

const leaveBalances = [
  { employee: 'ANANTH', casual: 2, sick: 0, earned: 0, used: 0, available: 2, status: 'Approved', requested: '08/05/2026' },
  { employee: 'Manikandan', casual: 2, sick: 0, earned: 0, used: 0, available: 2, status: 'Approved', requested: '17/04/2026' },
  { employee: 'PRATHAP B', casual: 3, sick: 0, earned: 0, used: 0, available: 3, status: 'Approved', requested: '21/04/2026' },
  { employee: 'MURALIDHARAN.K', casual: 3, sick: 0, earned: 0, used: 0, available: 3, status: 'Approved', requested: '08/04/2026' },
  { employee: 'JAYAKUMAR', casual: 2, sick: 0, earned: 0, used: 0, available: 2, status: 'Approved', requested: '01/04/2026' },
];

export default function LeaveBalance() {
  return (
    <div className="page-content leave-page">
      <div className="page-header">
        <div>
          <h1>Completed Leave Requests</h1>
          <p>Review all approved and completed leave entries.</p>
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
              <th>Requested</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveBalances.map((row, index) => (
              <tr key={`${row.employee}-${index}`}>
                <td>{index + 1}</td>
                <td>{row.employee}</td>
                <td>casual_leave</td>
                <td>09/05/2026</td>
                <td>09/05/2026</td>
                <td>1</td>
                <td>Going to hospital</td>
                <td>08/05/2026</td>
                <td><span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
