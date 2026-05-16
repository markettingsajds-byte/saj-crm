import React from 'react';

const designations = [
  { name: 'Junior Computer Operator', description: 'Project typing' },
  { name: 'Senior Computer Operator', description: 'Project typing' },
  { name: 'Junior Accounts', description: 'Help senior accounts' },
  { name: 'Senior Accountant', description: 'Manages all accounts' },
  { name: 'Assistant Surveyor', description: 'Assist surveyor and machine operators' },
  { name: 'Junior Draughtsman', description: 'Draughtsman' },
];

export default function DesignationMaster() {
  return (
    <div className="page-content master-page">
      <div className="page-header">
        <div>
          <h1>Designation Master</h1>
          <p>Add and edit employee designations used across the system.</p>
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
              <th>Designation Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((designation, index) => (
              <tr key={designation.name}>
                <td>{index + 1}</td>
                <td>{designation.name}</td>
                <td>{designation.description}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
