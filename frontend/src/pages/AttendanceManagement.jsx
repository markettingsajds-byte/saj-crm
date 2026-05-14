import { AlertCircle, CheckCircle2, Clock3, UsersRound } from 'lucide-react';
import '../styles/Attendance.css';

const attendanceRows = [
  { employee: 'Admin User', role: 'Admin', present: 24, late: 1, absent: 0, overtime: '12h' },
  { employee: 'Agent User', role: 'Agent', present: 22, late: 2, absent: 1, overtime: '7h' },
  { employee: 'Regular User', role: 'User', present: 23, late: 0, absent: 2, overtime: '3h' },
  { employee: 'Customer User', role: 'Customer', present: 0, late: 0, absent: 0, overtime: '0h' },
];

export default function AttendanceManagement() {
  return (
    <div className="page-content attendance-page">
      <div className="attendance-header">
        <div>
          <p className="attendance-kicker">Monthly overview</p>
          <h1>Attendance Management</h1>
        </div>
      </div>

      <div className="attendance-stats">
        <div className="attendance-stat"><UsersRound size={22} /><strong>3</strong><span>Active Staff</span></div>
        <div className="attendance-stat"><CheckCircle2 size={22} /><strong>69</strong><span>Present Days</span></div>
        <div className="attendance-stat"><Clock3 size={22} /><strong>3</strong><span>Late Marks</span></div>
        <div className="attendance-stat"><AlertCircle size={22} /><strong>3</strong><span>Absences</span></div>
      </div>

      <section className="attendance-section">
        <h2>Employee Attendance Register</h2>
        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Present</th>
                <th>Late</th>
                <th>Absent</th>
                <th>Overtime</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRows.map((row) => (
                <tr key={row.employee}>
                  <td>{row.employee}</td>
                  <td>{row.role}</td>
                  <td>{row.present}</td>
                  <td>{row.late}</td>
                  <td>{row.absent}</td>
                  <td>{row.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
