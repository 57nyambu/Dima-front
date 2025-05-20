import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/accounts.css";

function AccountDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      
      const data = await response.json();
      setPersonalInfo(data);
      setFormData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch('/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Fetch addresses data
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch('/api/user/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  // Fetch payment methods data
  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch('/api/user/payment-methods', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }
      
      const data = await response.json();
      setPaymentMethods(data);
    } catch (err) {
      console.error('Error fetching payment methods:', err);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    fetchProfileData();
    
    if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "addresses") {
      fetchAddresses();
    } else if (activeTab === "payment") {
      fetchPaymentMethods();
    }
  }, [activeTab]);

  // Automatically detect system theme and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.classList.toggle("dark-mode", savedTheme === "dark");
    } else {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDarkMode);
      document.body.classList.toggle("dark-mode", prefersDarkMode);
    }
  }, []);

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const updatedData = await response.json();
      setPersonalInfo(updatedData);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return <div className="account-container">Loading...</div>;
  }

  if (error) {
    return <div className="account-container">Error: {error}</div>;
  }

  if (!personalInfo) {
    return <div className="account-container">No user data found</div>;
  }

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
          <li 
            className={activeTab === "settings" ? "active" : ""} 
            onClick={() => setActiveTab("settings")}
          >
            Settings
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
                      value={formData.firstName || ''}
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
                      value={formData.lastName || ''}
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
                    value={formData.email || ''}
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
                    value={formData.phone || ''}
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
              {orders.length > 0 ? (
                orders.map(order => (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div>
                        <span className="order-number">Order #{order.orderNumber}</span>
                        <span className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div className="order-items">
                      {order.items.map(item => (
                        <div className="order-item" key={item.id}>
                          <div className="item-image"></div>
                          <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">KSh {item.price.toLocaleString()}</p>
                            <p className="item-qty">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-actions">
                      <button className="secondary-btn">Track Order</button>
                      <button className="secondary-btn">View Details</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders found</p>
              )}
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
              {addresses.length > 0 ? (
                addresses.map(address => (
                  <div className="address-card" key={address.id}>
                    {address.isDefault && <div className="address-tag">Default</div>}
                    <h4>{address.label}</h4>
                    <p>{personalInfo.firstName} {personalInfo.lastName}</p>
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>{address.city}, {address.postalCode}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phone || personalInfo.phone}</p>
                    <div className="address-actions">
                      <button className="text-btn">Edit</button>
                      <button className="text-btn">Remove</button>
                      {!address.isDefault && (
                        <button className="text-btn">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
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
              {paymentMethods.length > 0 ? (
                paymentMethods.map(method => (
                  <div className="payment-card" key={method.id}>
                    {method.isDefault && <div className="payment-tag">Default</div>}
                    <div className={`card-type ${method.type.toLowerCase()}`}></div>
                    <p className="card-number">
                      {method.type === 'M-PESA' ? 'M-PESA' : `**** **** **** ${method.last4}`}
                    </p>
                    {method.expiry && <p className="card-expiry">Expires {method.expiry}</p>}
                    <p className="card-name">{method.name || `${personalInfo.firstName} ${personalInfo.lastName}`}</p>
                    <div className="payment-actions">
                      <button className="text-btn">Edit</button>
                      <button className="text-btn">Remove</button>
                      {!method.isDefault && (
                        <button className="text-btn">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No payment methods found</p>
              )}
            </div>
          </div>
        )}

        {/* Other tabs (security, settings) remain the same */}
        {activeTab === "security" && (
          <div className="security-section">
            {/* ... existing security section code ... */}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            {/* ... existing settings section code ... */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDashboard;