import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <ul>
        <li><Link to="/account/orders">Order History</Link></li>
        <li><Link to="/account/wishlist">Wishlist</Link></li>
        <li><Link to="/account/profile">Profile</Link></li>
        <li><Link to="/account/changepassword">Change Password</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
