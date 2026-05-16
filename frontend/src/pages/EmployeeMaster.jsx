import React from 'react';

const employees = [
  { id: 'EMP01', name: 'Sivasamy M', designation: 'Admin', department: 'Admin', branch: 'SAJ HO', status: 'Active' },
  { id: 'EMP02', name: 'PAVITHRA J', designation: 'Manager', department: 'Survey', branch: 'SAJ HO', status: 'Active' },
  { id: 'EMP03', name: 'JAYAKUMAR', designation: 'Surveyor', department: 'Survey', branch: 'Chennai Site Office', status: 'Inactive' },
  { id: 'EMP04', name: 'DIVYASRI', designation: 'Tele Calling', department: 'Tele Calling', branch: 'SAJ HO', status: 'Active' },
  { id: 'EMP05', name: 'MANIKANDAN', designation: 'Accounts', department: 'Accounts', branch: 'SAJ HO', status: 'Active' },
];

export default function EmployeeMaster() {
  return (
    <div className="page-content master-page">
      <div className="page-header">
        <div>
          <h1>Employee Master</h1>
          <p>Manage employee records and active status.</p>
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
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>{emp.branch}</td>
                <td><span className={`status-pill ${emp.status.toLowerCase()}`}>{emp.status}</span></td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
