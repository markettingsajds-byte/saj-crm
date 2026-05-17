import { useMemo, useState } from 'react';
import {
  Building2,
  Download,
  FileText,
  MapPin,
  MinusCircle,
  Plus,
  PlusCircle,
  QrCode,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import '../styles/BranchMaster.css';

const initialBranches = [
  {
    branchCode: 'SAJ-HO-001',
    branchName: 'Sri Arul Jothi Head Office',
    shortName: 'SAJ HO',
    branchType: 'Head Office',
    addressLine1: 'No. 14, Surveyor Street',
    addressLine2: 'Near Collector Office',
    area: 'Town Centre',
    city: 'Madurai',
    district: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    pinCode: '625001',
    mobile: '9876543210',
    alternateMobile: '9123456789',
    landline: '0452-2551234',
    email: 'headoffice@sajsurvey.com',
    website: 'www.sajsurvey.com',
    managerName: 'Admin User',
    designation: 'Branch Manager',
    managerContact: '9999999999',
    managerEmail: 'admin@gmail.com',
    gstNo: '33ABCDE1234F1Z5',
    panNo: 'ABCDE1234F',
    registrationNo: 'REG-SAJ-2026-001',
    licenseNo: 'SUR-LIC-001',
    latitude: '9.9252',
    longitude: '78.1198',
    mapLink: 'https://maps.google.com',
    geoCapture: 'Captured',
    workingHours: '09:00 AM - 06:00 PM',
    workingDays: 'Monday - Saturday',
    openingDate: '2026-01-01',
    status: 'Active',
    bankName: 'State Bank of India',
    accountNumber: '123456789012',
    ifscCode: 'SBIN0001234',
    upiId: 'sajsurvey@sbi',
    assignedEmployees: 'Admin User, Agent User, Regular User',
    userAccess: 'Admin, Agent, User',
    rolePermissions: 'Full branch operations',
    reportingManager: 'Admin User',
    equipmentAssigned: 'DGPS Kit, Total Station, Drone, Tripod Set',
    dgpsAvailability: 'Available',
    totalStationCount: 4,
    droneAvailability: 'Available',
    vehicleDetails: 'TN-59-AB-1234 Bolero',
    fieldTeamCount: 8,
  },
  {
    branchCode: 'SAJ-SO-002',
    branchName: 'Chennai Site Office',
    shortName: 'CHN SO',
    branchType: 'Site Office',
    addressLine1: 'Plot 22, Survey Layout',
    addressLine2: 'OMR Road',
    area: 'Thoraipakkam',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    pinCode: '600097',
    mobile: '9876500111',
    alternateMobile: '9876500222',
    landline: '044-42001234',
    email: 'chennai@sajsurvey.com',
    website: 'www.sajsurvey.com/chennai',
    managerName: 'Agent User',
    designation: 'Site Manager',
    managerContact: '6666666666',
    managerEmail: 'agent@example.com',
    gstNo: '33ABCDE1234F2Z4',
    panNo: 'ABCDE1234F',
    registrationNo: 'REG-SAJ-2026-002',
    licenseNo: 'SUR-LIC-002',
    latitude: '12.9352',
    longitude: '80.2315',
    mapLink: 'https://maps.google.com',
    geoCapture: 'Pending',
    workingHours: '08:30 AM - 05:30 PM',
    workingDays: 'Monday - Saturday',
    openingDate: '2026-03-15',
    status: 'Active',
    bankName: 'HDFC Bank',
    accountNumber: '50200012345678',
    ifscCode: 'HDFC0001234',
    upiId: 'sajchennai@hdfc',
    assignedEmployees: 'Agent User',
    userAccess: 'Agent',
    rolePermissions: 'Site operations only',
    reportingManager: 'Admin User',
    equipmentAssigned: 'Total Station, Level Machine',
    dgpsAvailability: 'Not Available',
    totalStationCount: 2,
    droneAvailability: 'Not Available',
    vehicleDetails: 'TN-01-CD-5678 Bike',
    fieldTeamCount: 4,
  },
];

const emptyBranch = {
  branchCode: '',
  branchName: '',
  shortName: '',
  branchType: 'Site Office',
  addressLine1: '',
  addressLine2: '',
  area: '',
  city: '',
  district: '',
  state: 'Tamil Nadu',
  country: 'India',
  pinCode: '',
  mobile: '',
  alternateMobile: '',
  landline: '',
  email: '',
  website: '',
  managerName: '',
  designation: '',
  managerContact: '',
  managerEmail: '',
  gstNo: '',
  panNo: '',
  registrationNo: '',
  licenseNo: '',
  latitude: '',
  longitude: '',
  mapLink: '',
  geoCapture: 'Pending',
  workingHours: '',
  workingDays: '',
  workingPeriods: {
    Monday: [{ start: '09:00 AM', end: '06:00 PM' }],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
  openingDate: '',
  status: 'Active',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  upiId: '',
  assignedEmployees: '',
  userAccess: '',
  rolePermissions: '',
  reportingManager: '',
  equipmentAssigned: '',
  dgpsAvailability: 'Available',
  totalStationCount: 0,
  droneAvailability: 'Not Available',
  vehicleDetails: '',
  fieldTeamCount: 0,
};

const fieldSections = [
  {
    title: 'Basic Branch Information',
    fields: [
      ['branchCode', 'Branch ID / Code'],
      ['branchName', 'Branch Name'],
      ['shortName', 'Short Name'],
      ['branchType', 'Branch Type', 'select', ['Head Office', 'Regional Office', 'Site Office', 'Franchise']],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['addressLine1', 'Address Line 1'],
      ['addressLine2', 'Address Line 2'],
      ['area', 'Area / Locality'],
      ['city', 'City'],
      ['district', 'District'],
      ['state', 'State'],
      ['country', 'Country'],
      ['pinCode', 'PIN Code'],
    ],
  },
  {
    title: 'Contact Information',
    fields: [
      ['mobile', 'Mobile Number'],
      ['alternateMobile', 'Alternate Mobile'],
      ['landline', 'Landline Number'],
      ['email', 'Email ID', 'email'],
      ['website', 'Website'],
    ],
  },
  {
    title: 'Branch Incharge Details',
    fields: [
      ['managerName', 'Branch Manager Name'],
      ['designation', 'Designation'],
      ['managerContact', 'Contact Number'],
      ['managerEmail', 'Email', 'email'],
    ],
  },
  {
    title: 'Business Registration Details',
    fields: [
      ['gstNo', 'GST Number'],
      ['panNo', 'PAN Number'],
      ['registrationNo', 'Registration Number'],
      ['licenseNo', 'License Number'],
    ],
  },
  {
    title: 'Location & Mapping',
    fields: [
      ['latitude', 'Latitude'],
      ['longitude', 'Longitude'],
      ['mapLink', 'Google Map Link'],
      ['geoCapture', 'Geo Location Capture', 'select', ['Captured', 'Pending']],
    ],
  },
  {
    title: 'Operational Details',
    fields: [
      ['openingDate', 'Branch Opening Date', 'date'],
      ['status', 'Active / Inactive Status', 'select', ['Active', 'Inactive']],
    ],
  },
  {
    title: 'Financial Details',
    fields: [
      ['bankName', 'Bank Name'],
      ['accountNumber', 'Account Number'],
      ['ifscCode', 'IFSC Code'],
      ['upiId', 'UPI ID'],
    ],
  },
  {
    title: 'Employee & User Mapping',
    fields: [
      ['assignedEmployees', 'Assigned Employees'],
      ['userAccess', 'User Access Control'],
      ['rolePermissions', 'Role Permissions'],
      ['reportingManager', 'Reporting Manager'],
    ],
  },
  {
    title: 'Survey Company Specific Fields',
    fields: [
      ['equipmentAssigned', 'Survey Equipment Assigned'],
      ['dgpsAvailability', 'DGPS Availability', 'select', ['Available', 'Not Available']],
      ['totalStationCount', 'Total Station Count', 'number'],
      ['droneAvailability', 'Drone Availability', 'select', ['Available', 'Not Available']],
      ['vehicleDetails', 'Vehicle Details'],
      ['fieldTeamCount', 'Field Team Count', 'number'],
    ],
  },
];

export default function BranchMaster() {
  const [branches, setBranches] = useState(initialBranches);
  const [formData, setFormData] = useState(emptyBranch);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [timePicker, setTimePicker] = useState(null);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setFormData(emptyBranch);
    setTimePicker(null);
  };

  const filteredBranches = useMemo(() => {
    const query = search.toLowerCase();
    return branches.filter((branch) => {
      const matchesSearch =
        branch.branchName.toLowerCase().includes(query) ||
        branch.branchCode.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query) ||
        branch.managerName.toLowerCase().includes(query);
      const matchesType = !typeFilter || branch.branchType === typeFilter;
      const matchesStatus = !statusFilter || branch.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [branches, search, typeFilter, statusFilter]);

  const activeCount = branches.filter((branch) => branch.status === 'Active').length;
  const totalTeams = branches.reduce((sum, branch) => sum + Number(branch.fieldTeamCount || 0), 0);
  const totalStations = branches.reduce((sum, branch) => sum + Number(branch.totalStationCount || 0), 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePeriodChange = (day, index, key, value) => {
    setFormData((current) => {
      const periods = current.workingPeriods[day].map((period, periodIndex) =>
        periodIndex === index ? { ...period, [key]: value } : period
      );
      return {
        ...current,
        workingPeriods: { ...current.workingPeriods, [day]: periods },
      };
    });
  };

  const openTimePicker = (day, index, key, value) => {
    const safeValue = String(value || '09:00 AM').trim();
    const [timePart = '09:00', meridiem = 'AM'] = safeValue.split(' ');
    const [hourRaw = '09', minuteRaw = '00'] = timePart.split(':');
    const hour = String(Number(hourRaw) || 12).padStart(2, '0');
    const minute = String(minuteRaw || '00').padStart(2, '0');
    setTimePicker({
      day,
      index,
      key,
      hour,
      minute,
      meridiem,
      mode: 'hour',
    });
  };

  const getClockFaceValues = () => {
    if (!timePicker) return [];
    if (timePicker.mode === 'minute') {
      return Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
    }
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  };

  const getClockHandRotation = () => {
    if (!timePicker) return 180;
    if (timePicker.mode === 'minute') {
      const minute = Number(timePicker.minute) || 0;
      return ((minute / 5) % 12) * 30 + 180;
    }
    const hour = Number(timePicker.hour) % 12;
    return hour * 30 + 180;
  };

  const applyTimePicker = () => {
    if (!timePicker) return;
    const hour = String(timePicker.hour).padStart(2, '0');
    const minute = String(timePicker.minute).padStart(2, '0');
    handlePeriodChange(
      timePicker.day,
      timePicker.index,
      timePicker.key,
      `${hour}:${minute} ${timePicker.meridiem}`
    );
    setTimePicker(null);
  };

  const addPeriod = (day) => {
    setFormData((current) => ({
      ...current,
      workingPeriods: {
        ...current.workingPeriods,
        [day]: [...current.workingPeriods[day], { start: '09:00 AM', end: '06:00 PM' }],
      },
    }));
  };

  const removePeriod = (day, index) => {
    setFormData((current) => ({
      ...current,
      workingPeriods: {
        ...current.workingPeriods,
        [day]: current.workingPeriods[day].filter((_, periodIndex) => periodIndex !== index),
      },
    }));
  };

  const buildWorkingSchedule = (workingPeriods) => {
    const activeDays = Object.entries(workingPeriods)
      .filter(([, periods]) => periods.length > 0)
      .map(([day]) => day);
    const workingHours = Object.entries(workingPeriods)
      .filter(([, periods]) => periods.length > 0)
      .map(([day, periods]) => `${day}: ${periods.map((period) => `${period.start} - ${period.end}`).join(', ')}`)
      .join(' | ');

    return { workingDays: activeDays.join(', '), workingHours };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const schedule = buildWorkingSchedule(formData.workingPeriods);
    setBranches((current) => [{ ...formData, ...schedule }, ...current]);
    setFormData(emptyBranch);
    closeModal();
  };

  return (
    <div className="page-content branch-page">
      <div className="branch-header">
        <div>
          <p className="branch-kicker">Master Setup</p>
          <h1>Branch Master</h1>
        </div>
        <div className="branch-actions">
          <button className="branch-add-btn" type="button" onClick={() => setIsAddModalOpen(true)}><Plus size={17} /> Add Branch</button>
          <button className="branch-tool-btn" type="button"><Download size={17} /> Export Excel</button>
          <button className="branch-tool-btn" type="button"><FileText size={17} /> Export PDF</button>
          <button className="branch-tool-btn" type="button"><QrCode size={17} /> QR Code</button>
        </div>
      </div>

      <div className="branch-stats">
        <div className="branch-stat"><Building2 size={22} /><strong>{branches.length}</strong><span>Total Branches</span></div>
        <div className="branch-stat"><SlidersHorizontal size={22} /><strong>{activeCount}</strong><span>Active Branches</span></div>
        <div className="branch-stat"><MapPin size={22} /><strong>{totalTeams}</strong><span>Field Team Count</span></div>
        <div className="branch-stat"><Building2 size={22} /><strong>{totalStations}</strong><span>Total Stations</span></div>
      </div>

      {isAddModalOpen && (
        <div className="branch-add-panel">
          <div className="branch-add-panel-header">
            <div>
              <p className="branch-kicker">Master Setup</p>
              <h2>Add New Branch</h2>
            </div>
            <button type="button" className="branch-modal-close" onClick={closeModal}>Cancel</button>
          </div>
          <form className="branch-form" onSubmit={handleSubmit}>
              <div className="branch-form-title">
                <h2>Branch Details</h2>
                <button className="branch-submit" type="submit"><Plus size={17} /> Save Branch</button>
              </div>

              {fieldSections.map((section) => (
                <section className="branch-form-section" key={section.title}>
                  <h3>{section.title}</h3>
                  <div className="branch-field-grid">
                    {section.fields.map(([name, label, type = 'text', options]) => (
                      <label key={name}>
                        <span>{label}</span>
                        {type === 'select' ? (
                          <select name={name} value={formData[name]} onChange={handleChange}>
                            {options.map((option) => <option key={option} value={option}>{option}</option>)}
                          </select>
                        ) : (
                          <input name={name} type={type} value={formData[name]} onChange={handleChange} />
                        )}
                      </label>
                    ))}
                  </div>
                  {section.title === 'Operational Details' && (
                    <div className="period-editor">
                      <div className="period-editor-header">
                        <div>
                          <strong>Edit periods</strong>
                          <span>Time zone: India Standard Time (UTC+05:30)</span>
                        </div>
                      </div>
                      <div className="period-week-tabs">
                        {Object.keys(formData.workingPeriods).map((day) => (
                          <span key={day} className={formData.workingPeriods[day].length ? 'active' : ''}>
                            {day.slice(0, 1)}
                          </span>
                        ))}
                      </div>
                      <div className="period-day-list">
                        {Object.entries(formData.workingPeriods).map(([day, periods]) => (
                          <div className="period-day-row" key={day}>
                            <div className="period-day-name">{day}</div>
                            <div className="period-ranges">
                              {periods.length === 0 ? (
                                <span className="period-closed">Closed</span>
                              ) : (
                                periods.map((period, index) => (
                                  <div className="period-range" key={`${day}-${index}`}>
                                    <input
                                      type="text"
                                      value={period.start}
                                      onClick={() => openTimePicker(day, index, 'start', period.start)}
                                      onChange={(event) => handlePeriodChange(day, index, 'start', event.target.value)}
                                      placeholder="09:00 AM"
                                    />
                                    <span>-</span>
                                    <input
                                      type="text"
                                      value={period.end}
                                      onClick={() => openTimePicker(day, index, 'end', period.end)}
                                      onChange={(event) => handlePeriodChange(day, index, 'end', event.target.value)}
                                      placeholder="06:00 PM"
                                    />
                                    <button type="button" className="period-icon-btn" onClick={() => removePeriod(day, index)} title="Remove period">
                                      <MinusCircle size={16} />
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>
                            <button type="button" className="period-icon-btn add" onClick={() => addPeriod(day)} title="Add period">
                              <PlusCircle size={17} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="period-footer">
                        <span>{buildWorkingSchedule(formData.workingPeriods).workingDays || 'No working days selected'}</span>
                      </div>
                      {timePicker && (
                        <div className="clock-popover">
                          <div className="clock-title">Select Time</div>
                          <div className="clock-display">
                            <button
                              type="button"
                              className={`clock-time-box ${timePicker.mode === 'hour' ? 'active' : ''}`}
                              onClick={() => setTimePicker((current) => ({ ...current, mode: 'hour' }))}
                            >
                              {timePicker.hour}
                            </button>
                            <span className="clock-separator">:</span>
                            <button
                              type="button"
                              className={`clock-time-box ${timePicker.mode === 'minute' ? 'active' : ''}`}
                              onClick={() => setTimePicker((current) => ({ ...current, mode: 'minute' }))}
                            >
                              {timePicker.minute}
                            </button>
                            <div className="clock-meridiem-stack">
                              {['AM', 'PM'].map((meridiem) => (
                                <button
                                  key={meridiem}
                                  type="button"
                                  className={timePicker.meridiem === meridiem ? 'active' : ''}
                                  onClick={() => setTimePicker((current) => ({ ...current, meridiem }))}
                                >
                                  {meridiem}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="clock-face">
                            {getClockFaceValues().map((label, index) => (
                              <button
                                key={label}
                                type="button"
                                className={String(timePicker[timePicker.mode]) === String(label) ? 'active' : ''}
                                style={{
                                  transform: `rotate(${index * 30}deg) translate(0, -132px) rotate(-${index * 30}deg)`,
                                }}
                                onClick={() => setTimePicker((current) => ({ ...current, [current.mode]: String(label) }))}
                              >
                                {label}
                              </button>
                            ))}
                            <div className="clock-hand" style={{ transform: `rotate(${getClockHandRotation()}deg)` }}></div>
                          </div>
                          <div className="clock-controls">
                            <div className="minute-options">
                              {['00', '15', '30', '45'].map((minute) => (
                                <button
                                  key={minute}
                                  type="button"
                                  className={timePicker.minute === minute ? 'active' : ''}
                                  onClick={() => setTimePicker((current) => ({ ...current, minute }))}
                                >
                                  :{minute}
                                </button>
                              ))}
                            </div>
                            <div className="clock-actions">
                              <button type="button" className="clock-keyboard">▦</button>
                              <span></span>
                              <button type="button" onClick={() => setTimePicker(null)}>Cancel</button>
                              <button type="button" onClick={applyTimePicker}>OK</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </form>
          </div>
      )}

      <section className="branch-list-section">
        <div className="branch-list-header">
          <h2>Branch List</h2>
          <div className="branch-filters">
            <div className="branch-search">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search branch, city, manager..." />
            </div>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="">All Types</option>
              <option value="Head Office">Head Office</option>
              <option value="Regional Office">Regional Office</option>
              <option value="Site Office">Site Office</option>
              <option value="Franchise">Franchise</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="branch-table-wrap">
          <table className="branch-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Branch Code</th>
                <th>Branch Name</th>
                <th>Type</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Manager</th>
                <th>GST No</th>
                <th>DGPS</th>
                <th>Drone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch, index) => (
                <tr key={`${branch.branchCode}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{branch.branchCode}</td>
                  <td>
                    <strong>{branch.branchName}</strong>
                    <span>{branch.shortName}</span>
                  </td>
                  <td>{branch.branchType}</td>
                  <td>{branch.city}</td>
                  <td>{branch.mobile}</td>
                  <td>{branch.managerName}</td>
                  <td>{branch.gstNo}</td>
                  <td>{branch.dgpsAvailability}</td>
                  <td>{branch.droneAvailability}</td>
                  <td><span className={`branch-status ${branch.status.toLowerCase()}`}>{branch.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
