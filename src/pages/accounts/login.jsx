import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../context/authContext";
import "../../assets/styles/login.css"; // Import the styles


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState({ text: "", isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (statusMessage.text) setStatusMessage({ text: "", isSuccess: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

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
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("role", data.role);

        login(data.access_token, data.role);
        
        setStatusMessage({ text: data.message || "Login successful", isSuccess: true });
        
        setTimeout(() => {
          const from = location.state?.from?.pathname || "/";
          navigate(from);
        }, 1500);
      } else {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Replace with your Google OAuth implementation
    window.location.href = "https://dima-backend.onrender.com/api/auth/google";
  };

  return (
    <div className="login-container">
      {/* Left Panel - Brand Section */}
      <div className="login-brand-panel">
        <div className="login-brand-content">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-icon">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="brand-name">DIMA</h1>
          </div>
          
          <h2 className="login-brand-title">Welcome Back</h2>
          <p className="login-brand-description">
            Sign in to access your account and continue your shopping experience.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-form-panel">
        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-title">Sign In</h2>
          </div>

          {statusMessage.text && (
            <div className={`login-status-message ${statusMessage.isSuccess ? "success" : "error"}`}>
              {statusMessage.text}
            </div>
          )}

          <button 
            type="button" 
            className="google-signin-button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="form-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <>
                  <svg className="login-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in..
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="signup-prompt">
              <p>
                Don't have an account? {" "}
                <a href="/signup" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;