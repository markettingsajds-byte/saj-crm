import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const dummyAccounts = [
  {
    email: 'admin@gmail.com',
    password: '123456',
    token: 'dummy-admin-token',
    user: { id: 'admin-1', name: 'Admin User', email: 'admin@gmail.com', role: 'admin' },
  },
  {
    email: 'user@example.com',
    password: 'user123',
    token: 'dummy-user-token',
    user: { id: 'user-1', name: 'Basic User', email: 'user@example.com', role: 'user' },
  },
];

const dummyOtpUsers = [
  {
    identifier: '9999999999',
    token: 'dummy-otp-token',
    user: { id: 'otp-1', name: 'OTP User', email: 'otpuser@example.com', phone: '9999999999', role: 'user' },
  },
  {
    identifier: 'testuser@gmail.com',
    token: 'dummy-google-token',
    user: { id: 'google-1', name: 'Google User', email: 'testuser@gmail.com', role: 'user' },
  },
];

function getDummyAccount(email, password) {
  return dummyAccounts.find((item) => item.email === email && item.password === password);
}

function getDummyOtpUser(identifier) {
  return dummyOtpUsers.find((item) => item.identifier === identifier);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const saveUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      saveUser(res.data);
      return res.data;
    } catch (err) {
      const fallback = getDummyAccount(email, password);
      if (fallback) {
        saveUser(fallback);
        return fallback;
      }
      throw err;
    }
  };

  const signup = async (email, password, fullName) => {
    const res = await api.post('/auth/signup', { email, password, fullName });
    saveUser(res.data);
    return res.data;
  };

  const requestOtp = async (identifier) => {
    try {
      const res = await api.post('/auth/otp/request', { identifier });
      return res.data;
    } catch (err) {
      if (getDummyOtpUser(identifier)) {
        return { message: 'Dummy OTP sent. Use code 123456.' };
      }
      throw err;
    }
  };

  const verifyOtp = async (identifier, code) => {
    try {
      const res = await api.post('/auth/otp/verify', { identifier, code });
      saveUser(res.data);
      return res.data;
    } catch (err) {
      const userRecord = getDummyOtpUser(identifier);
      if (userRecord && code === '123456') {
        saveUser({ token: userRecord.token, user: userRecord.user });
        return { token: userRecord.token, user: userRecord.user };
      }
      throw err;
    }
  };

  const loginWithGoogleDummy = async (email) => {
    const userRecord = getDummyOtpUser(email) || {
      token: 'dummy-google-token',
      user: { id: 'google-2', name: 'Google User', email, role: 'user' },
    };
    saveUser(userRecord);
    return userRecord;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        requestOtp,
        verifyOtp,
        loginWithGoogleDummy,
        logout,
        isAuthenticated,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
