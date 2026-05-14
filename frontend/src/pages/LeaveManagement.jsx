import { CalendarCheck, ClipboardList, Hourglass, PlaneTakeoff } from 'lucide-react';
import '../styles/Attendance.css';

const leaveBalances = [
  { employee: 'Admin User', casual: 8, sick: 6, earned: 12, used: 4, available: 22 },
  { employee: 'Agent User', casual: 5, sick: 4, earned: 8, used: 7, available: 17 },
  { employee: 'Regular User', casual: 7, sick: 6, earned: 10, used: 5, available: 23 },
];

const requests = [
  { employee: 'Agent User', type: 'Casual Leave', days: 2, from: '18 May 2026', status: 'Pending' },
  { employee: 'Regular User', type: 'Sick Leave', days: 1, from: '14 May 2026', status: 'Approved' },
];

export default function LeaveManagement() {
  return (
    <div className="page-content attendance-page">
      <div className="attendance-header">
        <div>
          <p className="attendance-kicker">Leave balances and approvals</p>
          <h1>Leave Management</h1>
        </div>
      </div>

      <div className="attendance-stats">
        <div className="attendance-stat"><PlaneTakeoff size={22} /><strong>62</strong><span>Total Available Days</span></div>
        <div className="attendance-stat"><CalendarCheck size={22} /><strong>16</strong><span>Used Leave Days</span></div>
        <div className="attendance-stat"><Hourglass size={22} /><strong>2</strong><span>Pending Requests</span></div>
        <div className="attendance-stat"><ClipboardList size={22} /><strong>3</strong><span>Leave Types</span></div>
      </div>

      <section className="attendance-section">
        <h2>Available Leave Days</h2>
        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Casual</th>
                <th>Sick</th>
                <th>Earned</th>
                <th>Used</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {leaveBalances.map((row) => (
                <tr key={row.employee}>
                  <td>{row.employee}</td>
                  <td>{row.casual}</td>
                  <td>{row.sick}</td>
                  <td>{row.earned}</td>
                  <td>{row.used}</td>
                  <td><strong>{row.available}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="attendance-section">
        <h2>Leave Requests</h2>
        <div className="request-list">
          {requests.map((request) => (
            <div className="request-item" key={`${request.employee}-${request.from}`}>
              <div>
                <strong>{request.employee}</strong>
                <span>{request.type} - {request.days} day(s) from {request.from}</span>
              </div>
              <span className={`status-pill ${request.status.toLowerCase()}`}>{request.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
