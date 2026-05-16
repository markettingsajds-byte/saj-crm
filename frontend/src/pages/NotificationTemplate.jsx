import React from 'react';

const templates = [
  { name: 'sample-email-test-template', channel: 'email', status: 'Active', message: 'This is the sample test email ({{1}}).' },
  { name: 'Login-sample-template', channel: 'sms', status: 'Active', message: 'Your verification OTP is ({{var}}).' },
  { name: 'SMS Notification', channel: 'sms', status: 'Active', message: 'Notification message sample.' },
  { name: 'Updated template', channel: 'whatsapp', status: 'Active', message: 'A site visit for your ({{1}}) is created.' },
];

export default function NotificationTemplate() {
  return (
    <div className="page-content template-page">
      <div className="page-header">
        <div>
          <h1>Notification Template</h1>
          <p>Create and manage email, SMS, and WhatsApp templates.</p>
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
              <th>Template Name</th>
              <th>Channel</th>
              <th>Current Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template, index) => (
              <tr key={template.name}>
                <td>{index + 1}</td>
                <td>{template.name}</td>
                <td>{template.channel}</td>
                <td><span className={`status-pill ${template.status.toLowerCase()}`}>{template.status}</span></td>
                <td>{template.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
