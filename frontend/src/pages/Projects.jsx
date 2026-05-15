import React from 'react';

const sampleProjects = [
  { id: 'PRJ-1001', name: 'City Center Survey', client: 'Ambika Developers', status: 'In Progress', stage: 'Execution', budget: '4.2 Cr', dueDate: '2026-08-15', lead: 'Rohan Mehta' },
  { id: 'PRJ-1002', name: 'North Park Villas', client: 'Greenfield Realty', status: 'Planning', stage: 'Proposal', budget: '3.5 Cr', dueDate: '2026-10-01', lead: 'Aditi Verma' },
  { id: 'PRJ-1003', name: 'Ocean View Complex', client: 'Harsh Constructions', status: 'Completed', stage: 'Closure', budget: '5.8 Cr', dueDate: '2026-04-30', lead: 'Priya Nair' },
  { id: 'PRJ-1004', name: 'Riverfront Towers', client: 'Sapphire Estates', status: 'In Progress', stage: 'Design', budget: '6.1 Cr', dueDate: '2026-09-20', lead: 'Manish Kapoor' },
  { id: 'PRJ-1005', name: 'Lakeview Residency', client: 'Nexa Homes', status: 'On Hold', stage: 'Approval', budget: '2.9 Cr', dueDate: '2026-11-12', lead: 'Shweta Rao' },
  { id: 'PRJ-1006', name: 'Tech Park Phase 2', client: 'Axis Infra', status: 'In Progress', stage: 'Execution', budget: '8.4 Cr', dueDate: '2027-01-05', lead: 'Vikram Singh' },
  { id: 'PRJ-1007', name: 'Sunshine Retail Mall', client: 'Panache Retail', status: 'Planning', stage: 'Scoping', budget: '7.0 Cr', dueDate: '2027-03-10', lead: 'Neha Joshi' },
  { id: 'PRJ-1008', name: 'Harmony Apartments', client: 'Lotus Group', status: 'Completed', stage: 'Final Review', budget: '3.2 Cr', dueDate: '2026-05-18', lead: 'Aman Patel' },
  { id: 'PRJ-1009', name: 'Cedar Heights', client: 'Sierra Realty', status: 'In Progress', stage: 'Construction', budget: '4.9 Cr', dueDate: '2026-12-02', lead: 'Riya Sharma' },
  { id: 'PRJ-1010', name: 'Pearl Residency', client: 'Opal Builders', status: 'Planning', stage: 'Feasibility', budget: '5.4 Cr', dueDate: '2027-02-14', lead: 'Suresh Nair' },
];

export default function Projects() {
  return (
    <div className="page-content projects-page">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Sample projects for frontend demo only.</p>
        </div>
      </div>

      <div className="projects-grid">
        {sampleProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-card-top">
              <h2>{project.name}</h2>
              <span className={`project-status status-${project.status.split(' ').join('-').toLowerCase()}`}>{project.status}</span>
            </div>
            <p className="project-client">Client: <strong>{project.client}</strong></p>
            <div className="project-meta-row">
              <div className="project-meta-item">
                <span>Stage</span>
                <strong>{project.stage}</strong>
              </div>
              <div className="project-meta-item">
                <span>Budget</span>
                <strong>{project.budget}</strong>
              </div>
            </div>
            <div className="project-meta-row">
              <div className="project-meta-item">
                <span>Due Date</span>
                <strong>{project.dueDate}</strong>
              </div>
              <div className="project-meta-item">
                <span>Lead</span>
                <strong>{project.lead}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
