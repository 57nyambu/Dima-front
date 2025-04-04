import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../../assets/styles/signup.css"; // Import the styles

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ text: "", isSuccess: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    // Password validation
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    // Confirm password validation
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/auth/register/", {
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
          console.log("User registered successfully:", data);
          setStatusMessage({ text: data.message || "User created successfully", isSuccess: true });
          // Redirect to login page after a short delay
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          console.error("Registration failed:", data);
          setStatusMessage({ 
            text: data.message || "Invalid password or registration failed", 
            isSuccess: false 
          });
          if (data.errors) {
            setErrors(data.errors);
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setStatusMessage({ 
          text: "An error occurred during registration. Please try again.", 
          isSuccess: false 
        });
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      
      {/* Status message display */}
      {statusMessage.text && (
        <div className={`status-message ${statusMessage.isSuccess ? "success" : "error"}`}>
          {statusMessage.text}
        </div>
      )}
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="signup-input"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        
        <button type="submit" className="signup-button">Sign Up</button>
        
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;