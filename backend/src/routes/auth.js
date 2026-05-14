const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'saj_crm_secret';

const users = [
  {
    id: 1,
    fullName: 'Admin User',
    email: 'admin@gmail.com',
    phone: '9999999999',
    role: 'admin',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    id: 2,
    fullName: 'Regular User',
    email: 'user@example.com',
    phone: '8888888888',
    role: 'user',
    password: bcrypt.hashSync('user123', 10),
  },
  {
    id: 3,
    fullName: 'Customer User',
    email: 'customer@example.com',
    phone: '7777777777',
    role: 'customer',
    password: bcrypt.hashSync('customer123', 10),
  },
  {
    id: 4,
    fullName: 'Agent User',
    email: 'agent@example.com',
    phone: '6666666666',
    role: 'agent',
    password: bcrypt.hashSync('agent123', 10),
  },
];

const otpStore = {};

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((item) => item.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({ token: generateToken(user), user: sanitizeUser(user) });
});

router.post('/signup', async (req, res) => {
  const { email, password, fullName } = req.body;
  const existing = users.find((item) => item.email === email);

  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    role: 'user',
    phone: '',
    password: await bcrypt.hash(password, 10),
  };

  users.push(newUser);
  return res.json({ token: generateToken(newUser), user: sanitizeUser(newUser) });
});

router.post('/otp/request', (req, res) => {
  const { identifier } = req.body;
  const user = users.find((item) => item.email === identifier || item.phone === identifier);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[identifier] = code;

  return res.json({ message: 'OTP sent successfully', otp: code });
});

router.post('/otp/verify', (req, res) => {
  const { identifier, code } = req.body;
  const user = users.find((item) => item.email === identifier || item.phone === identifier);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!otpStore[identifier] || otpStore[identifier] !== code) {
    return res.status(401).json({ message: 'Invalid OTP code' });
  }

  delete otpStore[identifier];
  return res.json({ token: generateToken(user), user: sanitizeUser(user) });
});

module.exports = router;
