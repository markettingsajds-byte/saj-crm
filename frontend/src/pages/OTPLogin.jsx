import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OTPLogin() {
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await requestOtp(identifier);
      setMessage(res?.message || 'OTP sent to your number/email');
      setStep('verify');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await verifyOtp(identifier, otp);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>OTP Login</h1>
        <p>Enter your email or phone number to receive a one-time code.</p>

        <form onSubmit={step === 'request' ? handleRequest : handleVerify} className="auth-form">
          <label>
            Email or Phone
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@example.com or 9999999999"
              required
            />
          </label>

          {step === 'verify' && (
            <label>
              OTP Code
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                required
              />
            </label>
          )}

          {message && <div className="auth-message">{message}</div>}
          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing…' : step === 'request' ? 'Send OTP' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
