import { Calculator, IndianRupee, MinusCircle, PlusCircle } from 'lucide-react';
import '../styles/Attendance.css';

const payrollRows = [
  { employee: 'Admin User', basic: 45000, present: 24, paidLeave: 2, unpaidLeave: 0, overtime: 2400, deductions: 0 },
  { employee: 'Agent User', basic: 30000, present: 22, paidLeave: 1, unpaidLeave: 2, overtime: 1400, deductions: 2308 },
  { employee: 'Regular User', basic: 26000, present: 23, paidLeave: 2, unpaidLeave: 1, overtime: 700, deductions: 1000 },
];

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function PayrollCalculations() {
  const totals = payrollRows.reduce(
    (acc, row) => {
      const net = row.basic + row.overtime - row.deductions;
      acc.gross += row.basic + row.overtime;
      acc.deductions += row.deductions;
      acc.net += net;
      return acc;
    },
    { gross: 0, deductions: 0, net: 0 }
  );

  return (
    <div className="page-content attendance-page">
      <div className="attendance-header">
        <div>
          <p className="attendance-kicker">Salary and leave deduction</p>
          <h1>Payroll Calculations</h1>
        </div>
      </div>

      <div className="attendance-stats">
        <div className="attendance-stat"><IndianRupee size={22} /><strong>{formatCurrency(totals.gross)}</strong><span>Gross Pay</span></div>
        <div className="attendance-stat"><MinusCircle size={22} /><strong>{formatCurrency(totals.deductions)}</strong><span>Leave Deductions</span></div>
        <div className="attendance-stat"><PlusCircle size={22} /><strong>{formatCurrency(4500)}</strong><span>Overtime Pay</span></div>
        <div className="attendance-stat"><Calculator size={22} /><strong>{formatCurrency(totals.net)}</strong><span>Net Payable</span></div>
      </div>

      <section className="attendance-section">
        <h2>Payroll Register</h2>
        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Basic Salary</th>
                <th>Present</th>
                <th>Paid Leave</th>
                <th>Unpaid Leave</th>
                <th>Overtime</th>
                <th>Deductions</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {payrollRows.map((row) => {
                const net = row.basic + row.overtime - row.deductions;
                return (
                  <tr key={row.employee}>
                    <td>{row.employee}</td>
                    <td>{formatCurrency(row.basic)}</td>
                    <td>{row.present}</td>
                    <td>{row.paidLeave}</td>
                    <td>{row.unpaidLeave}</td>
                    <td>{formatCurrency(row.overtime)}</td>
                    <td>{formatCurrency(row.deductions)}</td>
                    <td><strong>{formatCurrency(net)}</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
