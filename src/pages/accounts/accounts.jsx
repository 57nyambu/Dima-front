import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/accounts.css";

function AccountDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "David",
    lastName: "Kamau",
    email: "david.kamau@gmail.com",
    phone: "0712 345 678"
  });
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(personalInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalInfo(formData);
    setEditMode(false);
    // Here you would typically send this data to your backend
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <h2>My Account</h2>
        <ul className="sidebar-menu">
          <li 
            className={activeTab === "profile" ? "active" : ""} 
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li 
            className={activeTab === "orders" ? "active" : ""} 
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li 
            className={activeTab === "addresses" ? "active" : ""} 
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </li>
          <li 
            className={activeTab === "payment" ? "active" : ""} 
            onClick={() => setActiveTab("payment")}
          >
            Payment Methods
          </li>
          <li 
            className={activeTab === "security" ? "active" : ""} 
            onClick={() => setActiveTab("security")}
          >
            Security
          </li>
          <li className="logout-option" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      <div className="account-content">
        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              {!editMode ? (
                <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
              ) : null}
            </div>
            
            {!editMode ? (
              <div className="profile-info">
                <div className="info-group">
                  <p className="info-label">Name</p>
                  <p className="info-value">{personalInfo.firstName} {personalInfo.lastName}</p>
                </div>
                <div className="info-group">
                  <p className="info-label">Email</p>
                  <p className="info-value">{personalInfo.email}</p>
                </div>
                <div className="info-group">
                  <p className="info-label">Phone</p>
                  <p className="info-value">{personalInfo.phone}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07xx xxx xxx"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="section-divider"></div>
            
            <div className="password-section">
              <h3>Password</h3>
              <p>
                <Link to="/forgot-password" className="change-password-link">
                  Change your password
                </Link>
              </p>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-section">
            <h3>Your Orders</h3>
            <div className="order-filters">
              <button className="filter-btn active">All Orders</button>
              <button className="filter-btn">Pending</button>
              <button className="filter-btn">Shipped</button>
              <button className="filter-btn">Delivered</button>
            </div>
            <div className="orders-list">
              <div className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-number">Order #1234</span>
                    <span className="order-date">Placed on April 2, 2025</span>
                  </div>
                  <span className="order-status delivered">Delivered</span>
                </div>
                <div className="order-items">
                  <div className="order-item">
                    <div className="item-image"></div>
                    <div className="item-details">
                      <p className="item-name">Maasai Beaded Bracelet</p>
                      <p className="item-price">KSh 1,299</p>
                      <p className="item-qty">Qty: 1</p>
                    </div>
                  </div>
                </div>
                <div className="order-actions">
                  <button className="secondary-btn">Track Order</button>
                  <button className="secondary-btn">View Details</button>
                </div>
              </div>
              
              <div className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-number">Order #1198</span>
                    <span className="order-date">Placed on March 25, 2025</span>
                  </div>
                  <span className="order-status shipped">Shipped</span>
                </div>
                <div className="order-items">
                  <div className="order-item">
                    <div className="item-image"></div>
                    <div className="item-details">
                      <p className="item-name">Kikoy Beach Towel</p>
                      <p className="item-price">KSh 850</p>
                      <p className="item-qty">Qty: 2</p>
                    </div>
                  </div>
                </div>
                <div className="order-actions">
                  <button className="secondary-btn">Track Order</button>
                  <button className="secondary-btn">View Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="addresses-section">
            <div className="section-header">
              <h3>Your Addresses</h3>
              <button className="primary-btn">Add New Address</button>
            </div>
            <div className="addresses-list">
              <div className="address-card">
                <div className="address-tag">Default</div>
                <h4>Home</h4>
                <p>David Kamau</p>
                <p>Block C, Apartment 4B</p>
                <p>Lavington Green Estate</p>
                <p>Nairobi, 00100</p>
                <p>Kenya</p>
                <p>Phone: 0712 345 678</p>
                <div className="address-actions">
                  <button className="text-btn">Edit</button>
                  <button className="text-btn">Remove</button>
                </div>
              </div>
              <div className="address-card">
                <h4>Work</h4>
                <p>David Kamau</p>
                <p>Westlands Business Center</p>
                <p>3rd Floor, Suite 305</p>
                <p>Nairobi, 00200</p>
                <p>Kenya</p>
                <p>Phone: 0723 456 789</p>
                <div className="address-actions">
                  <button className="text-btn">Edit</button>
                  <button className="text-btn">Remove</button>
                  <button className="text-btn">Set as Default</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="payment-section">
            <div className="section-header">
              <h3>Payment Methods</h3>
              <button className="primary-btn">Add Payment Method</button>
            </div>
            <div className="payment-methods-list">
              <div className="payment-card">
                <div className="payment-tag">Default</div>
                <div className="card-type visa"></div>
                <p className="card-number">**** **** **** 4567</p>
                <p className="card-expiry">Expires 05/26</p>
                <p className="card-name">David Kamau</p>
                <div className="payment-actions">
                  <button className="text-btn">Edit</button>
                  <button className="text-btn">Remove</button>
                </div>
              </div>
              <div className="payment-card">
                <div className="card-type mpesa"></div>
                <p className="card-number">M-PESA</p>
                <p className="card-expiry">0712 345 678</p>
                <p className="card-name">David Kamau</p>
                <div className="payment-actions">
                  <button className="text-btn">Edit</button>
                  <button className="text-btn">Remove</button>
                  <button className="text-btn">Set as Default</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="security-section">
            <h3>Account Security</h3>
            
            <div className="security-option">
              <div className="security-text">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="security-option">
              <div className="security-text">
                <h4>SMS Notifications</h4>
                <p>Receive SMS alerts for orders and account activity</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="security-divider"></div>
            
            <div className="security-actions">
              <button className="danger-btn">Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDashboard;