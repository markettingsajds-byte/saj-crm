import { CalendarDays, Clock3, LogIn, LogOut, MapPin } from 'lucide-react';
import '../styles/Attendance.css';

const punchHistory = [
  { date: '13 May 2026', inTime: '09:08 AM', outTime: '06:12 PM', hours: '9h 04m', status: 'Present' },
  { date: '12 May 2026', inTime: '09:18 AM', outTime: '06:04 PM', hours: '8h 46m', status: 'Late' },
  { date: '11 May 2026', inTime: '09:02 AM', outTime: '06:01 PM', hours: '8h 59m', status: 'Present' },
];

export default function AttendancePunching() {
  return (
    <div className="page-content attendance-page">
      <div className="attendance-header">
        <div>
          <p className="attendance-kicker">Daily attendance</p>
          <h1>Attendance Punching</h1>
        </div>
        <div className="attendance-date">
          <CalendarDays size={18} />
          <span>13 May 2026</span>
        </div>
      </div>

      <div className="punch-panel">
        <div className="punch-clock">
          <Clock3 size={28} />
          <strong>09:08 AM</strong>
          <span>Current punch-in recorded</span>
        </div>
        <div className="punch-actions">
          <button className="attendance-btn primary"><LogIn size={18} /> Punch In</button>
          <button className="attendance-btn danger"><LogOut size={18} /> Punch Out</button>
        </div>
        <div className="punch-location">
          <MapPin size={18} />
          <span>Office location verified</span>
        </div>
      </div>

      <section className="attendance-section">
        <h2>Recent Punch History</h2>
        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Total Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {punchHistory.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.inTime}</td>
                  <td>{row.outTime}</td>
                  <td>{row.hours}</td>
                  <td><span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
