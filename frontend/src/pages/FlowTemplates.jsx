import React from 'react';

const templates = [
  { title: 'Land site - ITBOOMI', created: '10-04-2026' },
  { title: 'LAND REVIEW - ITBOOMI', created: '10-04-2026' },
  { title: 'WORKING DATA + CUSTOMER DATA', created: '07-04-2026' },
  { title: 'EMO2 - REPEAT - COLOUR AND SHOE MARKING', created: '13-03-2026' },
  { title: 'WAP - PAYMENT COLLECTION (MARKING)', created: '13-03-2026' },
  { title: 'Es04', created: '13-03-2026' },
];

export default function FlowTemplates() {
  return (
    <div className="page-content template-page">
      <div className="page-header">
        <div>
          <h1>Flow Templates</h1>
          <p>Manage process templates and workflow blueprints.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary">Add New</button>
        </div>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <article className="template-card" key={template.title}>
            <div className="template-card-title">{template.title}</div>
            <p>Created on {template.created}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
