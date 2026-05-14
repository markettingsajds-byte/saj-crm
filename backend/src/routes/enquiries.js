const express = require("express");
const router = express.Router();

const statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
const priorities = ['low', 'medium', 'high'];
const sources = ['Direct', 'Website', 'Referral', 'Phone', 'Social Media', 'Email'];
const serviceTypes = ['Residential Survey', 'Commercial Survey', 'Industrial Survey', 'Property Valuation', 'Consultation'];
const assignees = ['agent@example.com', 'user@example.com', 'admin@gmail.com'];
const firstNames = ['Rajesh', 'Priya', 'Arjun', 'Meena', 'Karthik', 'Divya', 'Suresh', 'Anitha', 'Vikram', 'Lakshmi'];
const lastNames = ['Kumar', 'Singh', 'Patel', 'Raman', 'Nair', 'Iyer', 'Reddy', 'Sharma', 'Das', 'Mohan'];

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function daysFromNow(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function generateDummyEnquiries(count = 100) {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const status = statuses[index % statuses.length];
    const priority = priorities[index % priorities.length];
    const source = sources[index % sources.length];
    const serviceType = serviceTypes[index % serviceTypes.length];
    const createdAt = daysAgo(100 - index);
    const updatedAt = daysAgo((100 - index) % 21);
    const projectValue = 35000 + ((index % 20) + 1) * 18500;

    return {
      id,
      customerName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
      phone: `9${String(800000000 + id * 13729).slice(0, 9)}`,
      serviceType,
      projectValue,
      status,
      priority,
      source,
      assignedTo: assignees[index % assignees.length],
      leadScore: 45 + (index % 55),
      probability: status === 'converted' ? 100 : status === 'qualified' ? 70 : status === 'contacted' ? 45 : status === 'lost' ? 0 : 20,
      description: `${serviceType} enquiry from ${source}. Follow up required for site details and quotation.`,
      createdAt,
      updatedAt,
      followUpDate: daysFromNow((index % 14) + 1),
      notes: [
        {
          text: status === 'new' ? 'Lead captured and awaiting first contact' : 'Customer interaction recorded',
          timestamp: updatedAt,
          by: 'system',
        },
      ],
      activity: [
        { type: 'created', timestamp: createdAt, by: 'system' },
        { type: status, timestamp: updatedAt, by: assignees[index % assignees.length] },
      ],
    };
  });
}

const enquiries = generateDummyEnquiries(100);

let nextId = enquiries.length + 1;

router.get("/stats", (req, res) => {
  const openLeads = enquiries.filter((e) => !['converted', 'lost'].includes(e.status));
  const overdueFollowUps = enquiries.filter(
    (e) => !['converted', 'lost'].includes(e.status) && new Date(e.followUpDate) < new Date()
  ).length;
  const bySource = sources.map((source) => ({
    source,
    count: enquiries.filter((e) => e.source === source).length,
  }));

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    contacted: enquiries.filter((e) => e.status === 'contacted').length,
    qualified: enquiries.filter((e) => e.status === 'qualified').length,
    converted: enquiries.filter((e) => e.status === 'converted').length,
    lost: enquiries.filter((e) => e.status === 'lost').length,
    highPriority: enquiries.filter((e) => e.priority === 'high').length,
    totalValue: enquiries.reduce((sum, e) => sum + e.projectValue, 0),
    openLeads: openLeads.length,
    overdueFollowUps,
    conversionRate: enquiries.length ? Math.round((enquiries.filter((e) => e.status === 'converted').length / enquiries.length) * 100) : 0,
    bySource,
  };
  res.json(stats);
});

router.get("/", (req, res) => {
  const { status, priority, source, assignedTo, search, page = 1, limit = 10, sortBy = 'updatedAt', sortOrder = 'desc' } = req.query;

  let filtered = [...enquiries];

  if (status) {
    filtered = filtered.filter((e) => e.status === status);
  }
  if (priority) {
    filtered = filtered.filter((e) => e.priority === priority);
  }
  if (source) {
    filtered = filtered.filter((e) => e.source === source);
  }
  if (assignedTo) {
    filtered = filtered.filter((e) => e.assignedTo === assignedTo);
  }
  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.customerName.toLowerCase().includes(lowerSearch) ||
        e.email.toLowerCase().includes(lowerSearch) ||
        e.phone.includes(search)
    );
  }

  const sortFields = {
    id: (item) => item.id,
    customerName: (item) => item.customerName,
    email: (item) => item.email,
    serviceType: (item) => item.serviceType,
    projectValue: (item) => item.projectValue,
    status: (item) => item.status,
    priority: (item) => item.priority,
    assignedTo: (item) => item.assignedTo || '',
    leadScore: (item) => item.leadScore || 0,
    updatedAt: (item) => new Date(item.updatedAt).getTime(),
  };
  const getSortValue = sortFields[sortBy] || sortFields.updatedAt;

  filtered.sort((a, b) => {
    const first = getSortValue(a);
    const second = getSortValue(b);
    const direction = sortOrder === 'asc' ? 1 : -1;

    if (typeof first === 'number' && typeof second === 'number') {
      return (first - second) * direction;
    }

    return String(first).localeCompare(String(second)) * direction;
  });

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paged = filtered.slice(start, end);

  res.json({
    data: paged,
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
  });
});

router.post("/", (req, res) => {
  const { customerName, email, phone, serviceType, projectValue, status, priority, source, description, assignedTo, leadScore } = req.body;

  const newEnquiry = {
    id: nextId++,
    customerName,
    email,
    phone,
    serviceType,
    projectValue: parseInt(projectValue) || 0,
    status: status || 'new',
    priority: priority || 'medium',
    source: source || 'Direct',
    assignedTo: assignedTo || 'agent@example.com',
    leadScore: parseInt(leadScore) || 50,
    probability: status === 'qualified' ? 70 : status === 'converted' ? 100 : 20,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notes: [],
    activity: [{ type: 'created', timestamp: new Date(), by: 'system' }],
  };

  enquiries.push(newEnquiry);
  res.status(201).json(newEnquiry);
});

router.get("/:id", (req, res) => {
  const enquiry = enquiries.find((e) => e.id == req.params.id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }
  res.json(enquiry);
});

router.put("/:id", (req, res) => {
  const enquiry = enquiries.find((e) => e.id == req.params.id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  Object.assign(enquiry, req.body);
  enquiry.updatedAt = new Date();
  res.json(enquiry);
});

router.patch("/:id/status", (req, res) => {
  const enquiry = enquiries.find((e) => e.id == req.params.id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  const oldStatus = enquiry.status;
  enquiry.status = req.body.status;
  enquiry.updatedAt = new Date();

  if (!enquiry.activity) enquiry.activity = [];
  enquiry.activity.push({
    type: 'status_change',
    from: oldStatus,
    to: req.body.status,
    timestamp: new Date(),
    by: 'system',
  });

  res.json(enquiry);
});

router.patch("/:id/assign", (req, res) => {
  const enquiry = enquiries.find((e) => e.id == req.params.id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  enquiry.assignedTo = req.body.assignedTo;
  enquiry.updatedAt = new Date();

  if (!enquiry.activity) enquiry.activity = [];
  enquiry.activity.push({
    type: 'assigned',
    to: req.body.assignedTo,
    timestamp: new Date(),
    by: 'system',
  });

  res.json(enquiry);
});

router.post("/:id/notes", (req, res) => {
  const enquiry = enquiries.find((e) => e.id == req.params.id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  if (!enquiry.notes) enquiry.notes = [];
  enquiry.notes.push({
    text: req.body.text,
    timestamp: new Date(),
    by: 'system',
  });

  if (!enquiry.activity) enquiry.activity = [];
  enquiry.activity.push({
    type: 'note_added',
    timestamp: new Date(),
    by: 'system',
  });

  enquiry.updatedAt = new Date();
  res.json(enquiry);
});

router.delete("/:id", (req, res) => {
  const index = enquiries.findIndex((e) => e.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  const removed = enquiries.splice(index, 1);
  res.json(removed[0]);
});

module.exports = router;
