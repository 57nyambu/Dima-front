import { useState } from 'react';
import axios from 'axios';
import "../../assets/styles/forgot-pass.css";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('https://your-backend-api.com/auth/request-password-reset/', {
        email,
      });
      setMessage(res.data?.detail || 'Check your email for reset instructions.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong.');
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        <h2>Forgot Your Password?</h2>
        <p className="subtitle">Enter your email to receive a reset link</p>
        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Link</button>
        </form>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;