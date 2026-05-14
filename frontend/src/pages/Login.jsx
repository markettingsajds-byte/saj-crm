import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, requestOtp, verifyOtp, loginWithGoogleDummy, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('mobile');
  const [step, setStep] = useState('request');
  const [mobile, setMobile] = useState('9999999999');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const resetMobileFlow = () => {
    setStep('request');
    setOtp('');
    setMessage('');
    setError(null);
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      await requestOtp(mobile);
      setMessage('Dummy OTP sent: 123456');
      setStep('verify');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await verifyOtp(mobile, otp);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      await loginWithGoogleDummy('testuser@gmail.com');
      navigate('/');
    } catch (err) {
      setError('Unable to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p>Use mobile OTP or Google dummy login for frontend-only testing.</p>

        <div className="auth-switch">
          <button
            type="button"
            className={mode === 'mobile' ? 'active' : ''}
            onClick={() => {
              setMode('mobile');
              resetMobileFlow();
            }}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            className={mode === 'email' ? 'active' : ''}
            onClick={() => {
              setMode('email');
              setError(null);
              setMessage('');
            }}
          >
            Email Login
          </button>
        </div>

        {mode === 'mobile' ? (
          <form onSubmit={step === 'request' ? handleRequestOtp : handleVerifyOtp} className="auth-form">
            <label>
              Mobile number
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9999999999"
                required
              />
            </label>

            {step === 'verify' && (
              <label>
                OTP code
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

            {step === 'verify' && (
              <button
                type="button"
                className="auth-button secondary"
                onClick={() => setStep('request')}
              >
                Back to mobile number
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailLogin} className="auth-form">
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>

            {message && <div className="auth-message">{message}</div>}
            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        <div className="auth-divider">or</div>

        <button type="button" className="auth-button auth-google-button" disabled={loading} onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <div className="auth-help">
          <strong>Demo values:</strong>
          <ul>
            <li>Mobile: 9999999999</li>
            <li>OTP: 123456</li>
            <li>Google dummy email: testuser@gmail.com</li>
            <li>Email login: admin@gmail.com / 123456 or user@example.com / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
