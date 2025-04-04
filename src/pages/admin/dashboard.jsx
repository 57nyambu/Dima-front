import React from 'react';
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

const AdminDashboard = () => {
  // Sample metrics data (replace with your actual data)
  const metrics = [
    { title: "Total Orders", value: "1,245", change: "+12%", icon: "📦" },
    { title: "Total Revenue", value: "$52,389", change: "+8%", icon: "💰" },
    { title: "Active Users", value: "3,721", change: "+15%", icon: "👥" },
    { title: "Products", value: "482", change: "+3%", icon: "🏷️" }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Dima Admin</h1>
          <div className="header-user">
            <span className="welcome-text">Welcome, Admin</span>
            <div className="user-avatar">A</div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li className="nav-item active">
                <Link to="/admin" className="nav-link">
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/products" className="nav-link">
                  <span className="nav-icon">🏷️</span>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/orders" className="nav-link">
                  <span className="nav-icon">📦</span>
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  <span className="nav-icon">👥</span>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/analytics" className="nav-link">
                  <span className="nav-icon">📈</span>
                  Analytics
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/settings" className="nav-link">
                  <span className="nav-icon">⚙️</span>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-heading">
            <h2 className="page-title">Dashboard Overview</h2>
            <p className="page-subtitle">Welcome to your Dima ecommerce admin panel</p>
          </div>
          
          {/* Metrics Cards */}
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-content">
                  <div className="metric-info">
                    <p className="metric-title">{metric.title}</p>
                    <p className="metric-value">{metric.value}</p>
                    <p className="metric-change">{metric.change} this month</p>
                  </div>
                  <div className="metric-icon">{metric.icon}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Activity Section */}
          <div className="dashboard-card activity-card">
            <h3 className="card-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-content">
                  <div>
                    <p className="activity-title">New order #38292</p>
                    <p className="activity-desc">John Doe purchased 3 items</p>
                  </div>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-content">
                  <div>
                    <p className="activity-title">Product stock alert</p>
                    <p className="activity-desc">Wireless Headphones is low on stock (2 remaining)</p>
                  </div>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-content">
                  <div>
                    <p className="activity-title">New customer registered</p>
                    <p className="activity-desc">Sarah Johnson created an account</p>
                  </div>
                  <span className="activity-time">Yesterday</span>
                </div>
              </div>
            </div>
            <div className="view-all">
              <Link to="/admin/activity" className="view-link">View all activity →</Link>
            </div>
          </div>
          
          {/* Bottom Grid */}
          <div className="bottom-grid">
            {/* Quick Actions */}
            <div className="dashboard-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/admin/products/new" className="action-button primary">
                  Add Product
                </Link>
                <Link to="/admin/users/new" className="action-button secondary">
                  Add User
                </Link>
                <Link to="/admin/orders" className="action-button outlined">
                  Process Orders
                </Link>
                <Link to="/admin/reports" className="action-button outlined">
                  Generate Report
                </Link>
              </div>
            </div>
            
            {/* Sales Summary */}
            <div className="dashboard-card">
              <h3 className="card-title">Sales Summary</h3>
              <div className="sales-summary">
                <div className="sales-row">
                  <span className="sales-period">Today</span>
                  <span className="sales-amount">$1,249</span>
                </div>
                <div className="sales-row">
                  <span className="sales-period">This Week</span>
                  <span className="sales-amount">$8,754</span>
                </div>
                <div className="sales-row">
                  <span className="sales-period">This Month</span>
                  <span className="sales-amount">$32,189</span>
                </div>
                <div className="view-all">
                  <Link to="/admin/analytics" className="view-link">View detailed report →</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;