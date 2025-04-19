import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ text: "", isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    if (statusMessage.text) setStatusMessage({ text: "", isSuccess: false });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("https://dima-backend.onrender.com/api/auth/register/", {
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
          setStatusMessage({ text: "Account created successfully!", isSuccess: true });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setStatusMessage({ 
            text: data.message || "Registration failed. Please try again", 
            isSuccess: false 
          });
          if (data.errors) {
            setErrors(data.errors);
          }
        }
      } catch (error) {
        setStatusMessage({ 
          text: "An error occurred. Please try again later", 
          isSuccess: false 
        });
      }
    } else {
      setErrors(formErrors);
    }
    setIsLoading(false);
  };
  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Replace with your Google OAuth implementation
    window.location.href = "https://dima-backend.onrender.com/api/auth/google";
  };

  return (
    <div className="signup-container">
      {/* Left Panel - Value Proposition */}
      <div className="signup-brand-panel">
        <div className="signup-brand-content">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-icon">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="brand-name">DIMA</h1>
          </div>
          
          <h3 className="signup-brand-title">Your Marketplace Awaits</h3>
          <div className="value-propositions">
            <div className="value-item">
              <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 7h-4a4 4 0 00-4 4v1m8 0h-4a4 4 0 01-4-4V7a4 4 0 014-4h4a4 4 0 014 4v5a4 4 0 01-4 4z"/>
              </svg>
              <p>Buy from thousands of verified sellers</p>
            </div>
            <div className="value-item">
              <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p>Sell products with zero upfront costs</p>
            </div>
            <div className="value-item">
              <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <p>Dropshipping supported with automated fulfillment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="signup-form-panel">
        <div className="signup-form-container">
          <div className="signup-header">
            <h2 className="signup-title">Create Account</h2>
          </div>

          {statusMessage.text && (
            <div className={`signup-status-message ${statusMessage.isSuccess ? "success" : "error"}`}>
              {statusMessage.text}
            </div>
          )}

          <button 
            type="button" 
            className="google-signin-button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
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
                placeholder="email@example.com"
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder=""
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder=""
              />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="signup-button"
            >
              {isLoading ? (
                <>
                  <svg className="signup-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="login-prompt">
              <p>
                Already have an account?{" "}
                <a href="/login" className="login-link">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;