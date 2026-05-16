import React from 'react';

const vehicles = [
  {
    id: 'VH-001',
    vehicleNumber: 'TN-59 AB 1234',
    model: 'Bolero Camper',
    type: 'Jeep',
    branch: 'Head Office',
    assignedDriver: 'Raja K',
    status: 'Active',
    lastServiceDate: '2026-04-03',
    nextServiceDue: '2026-10-03',
    currentMileage: '54,800 km',
  },
  {
    id: 'VH-002',
    vehicleNumber: 'TN-01 CD 5678',
    model: 'Hero Splendor',
    type: 'Bike',
    branch: 'Chennai Site Office',
    assignedDriver: 'Vinoth S',
    status: 'Active',
    lastServiceDate: '2026-03-15',
    nextServiceDue: '2026-09-15',
    currentMileage: '18,200 km',
  },
  {
    id: 'VH-003',
    vehicleNumber: 'TN-45 EF 9012',
    model: 'Swift Dzire',
    type: 'Car',
    branch: 'Madurai Site Office',
    assignedDriver: 'Arun P',
    status: 'Inactive',
    lastServiceDate: '2026-01-22',
    nextServiceDue: '2026-07-22',
    currentMileage: '72,450 km',
  },
];

export default function VehicleMaintenanceMaster() {
  return (
    <div className="page-content master-page">
      <div className="page-header">
        <div>
          <h1>Vehicle Maintenance Master</h1>
          <p>Manage the company vehicle fleet and maintenance schedule.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary">Add New Vehicle</button>
        </div>
      </div>

      <div className="page-table-wrap">
        <table className="page-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Vehicle ID</th>
              <th>Vehicle Number</th>
              <th>Model</th>
              <th>Type</th>
              <th>Branch</th>
              <th>Driver</th>
              <th>Last Service</th>
              <th>Next Due</th>
              <th>Current Mileage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td>{index + 1}</td>
                <td>{vehicle.id}</td>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.branch}</td>
                <td>{vehicle.assignedDriver}</td>
                <td>{vehicle.lastServiceDate}</td>
                <td>{vehicle.nextServiceDue}</td>
                <td>{vehicle.currentMileage}</td>
                <td>
                  <span className={`status-pill ${vehicle.status.toLowerCase()}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
