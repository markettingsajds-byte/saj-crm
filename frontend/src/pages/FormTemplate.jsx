import React from 'react';

const templates = [
  { name: 'Itboomi Kamal testing FORM 1', created: '04-05-2026' },
  { name: 'LAND DESCRIPTION - ITBOOMI', created: '10-04-2026' },
  { name: 'Test-itboomi', created: '10-04-2026' },
  { name: 'Opening Balance Template', created: '23-03-2026' },
  { name: 'DGPS Day Rent Govt Surveyor Only - 2500', created: '23-03-2026' },
  { name: 'WAP - TS MARKING FILE', created: '05-03-2026' },
];

export default function FormTemplate() {
  return (
    <div className="page-content template-page">
      <div className="page-header">
        <div>
          <h1>Form Template</h1>
          <p>Create and manage reusable form templates for field captures.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary">Add New</button>
        </div>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <article className="template-card" key={template.name}>
            <div className="template-card-title">{template.name}</div>
            <p>Created on {template.created}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
