import { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password updated:", formData);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" name="oldPassword" placeholder="Old Password" onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
