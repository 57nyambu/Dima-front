import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../context/authContext"; // Import useAuth
import "../../assets/styles/login.css"; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get login function from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState({ text: "", isSuccess: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError("");
    if (statusMessage.text) setStatusMessage({ text: "", isSuccess: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("https://dima-backend.onrender.com/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store tokens and role in local storage
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("role", data.role);

        // Use login function from context to set user
        login(data.access_token, data.role);
        
        // Show success message
        setStatusMessage({ text: data.message || "Login successful", isSuccess: true });
        
        // Redirect to the intended page or homepage after a short delay
        setTimeout(() => {
          const from = location.state?.from?.pathname || "/";
          navigate(from);  // Redirect to the intended page
        }, 1500);
      } else {
        // Show error message
        setStatusMessage({ 
          text: data.message || "Invalid email or password", 
          isSuccess: false 
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatusMessage({ 
        text: "An error occurred during login. Please try again.", 
        isSuccess: false 
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      
      {/* Status message display */}
      {statusMessage.text && (
        <div className={`status-message ${statusMessage.isSuccess ? "success" : "error"}`}>
          {statusMessage.text}
        </div>
      )}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="login-button">Login</button>
        
        <p className="login-forgot">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        
        <p className="login-signup">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;