import React from 'react';

const departments = [
  { code: 'DPT01', name: 'Admin', head: 'Sivasamy M', employees: 4, status: 'Active' },
  { code: 'DPT02', name: 'Survey', head: 'PAVITHRA J', employees: 8, status: 'Active' },
  { code: 'DPT03', name: 'Drawing', head: 'JAYAKUMAR', employees: 6, status: 'Active' },
  { code: 'DPT04', name: 'Tele Calling', head: 'DIVYASRI', employees: 3, status: 'Active' },
  { code: 'DPT05', name: 'Accounts', head: 'MANIKANDAN', employees: 5, status: 'Inactive' },
];

export default function DepartmentMaster() {
  return (
    <div className="page-content master-page">
      <div className="page-header">
        <div>
          <h1>Department Master</h1>
          <p>View and manage departments across the company.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary">Add New</button>
        </div>
      </div>

      <div className="page-table-wrap">
        <table className="page-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Department Code</th>
              <th>Department</th>
              <th>Department Head</th>
              <th>No. of Employees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.code}>
                <td>{index + 1}</td>
                <td>{dept.code}</td>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.employees}</td>
                <td><span className={`status-pill ${dept.status.toLowerCase()}`}>{dept.status}</span></td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
