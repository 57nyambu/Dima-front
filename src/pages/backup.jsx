import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="35585471023-lem7jj5sl850jrh6gplhruvq52d359nj.apps.googleusercontent.com">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

import { useGoogleOAuth } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../context/authContext";
import "../../assets/styles/login.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const TestGoogleContext = () => {
  try {
    const context = useGoogleOAuth();
    console.log("Google OAuth Context:", context); // Should not throw an error
    return null;
  } catch (error) {
    console.error("Google OAuth Context Error:", error);
    return <p>Error: GoogleOAuthProvider is not accessible.</p>;
  }
};

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
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatusMessage({
        text: "An error occurred during login. Please try again.",
        isSuccess: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    setIsLoading(true);
    const id_token = credentialResponse.credential;

    try {
      const response = await axios.post("http://localhost:8000/api/auth/google-login/", {
        id_token,
      });

      const { access_token, refresh_token, role } = response.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("role", role);

      login(access_token, role);

      setStatusMessage({ text: "Google login successful!", isSuccess: true });

      setTimeout(() => {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }, 1500);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setStatusMessage({
        text: "An error occurred during Google Sign-In. Please try again.",
        isSuccess: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <TestGoogleContext />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => {
          setStatusMessage({
            text: "Google Sign-In failed. Please try again.",
            isSuccess: false,
          });
        }}
      />
      {error && <p className="error">{error}</p>}
      {statusMessage.text && (
        <p className={statusMessage.isSuccess ? "success" : "error"}>
          {statusMessage.text}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
