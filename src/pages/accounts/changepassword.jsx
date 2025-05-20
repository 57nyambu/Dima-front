import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../assets/styles/password-reset.css";


function ChangePassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


const handleReset = async (e) => {
  e.preventDefault();
  if (password !== confirm) {
    setError("Passwords don't match")
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/auth/reset-password/', {
      uid,
      token,
      password,
    });

    setSuccess('Password changed successfully. Redirecting...');
    setTimeout(() => navigate('/login'), 3000);
  } catch (err) {
    setError(err.response?.data?.detail || 'Failed to reset password');
  }
};

return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset} className="reset-form">
        <input type="password" placeholder="New password" 
        value={password} required onChange={(e) => setConfirm(e.target.value)}
        />
        <input type="password" placeholder="Confirm password" 
        value={password} required onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p className="reset-message error">{error}</p>}
      {success && <p className="reset-message success">{success}</p>}
    </div>
  );
}

export default ChangePassword;
