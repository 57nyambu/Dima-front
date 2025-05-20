import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Import AuthProvider
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedroute"; // Import ProtectedRoute

// General Pages
import Landing from "./pages/general/landing";
import Home from "./pages/general/home";
import About from "./pages/general/about";
import Contact from "./pages/general/contact";
import ComingSoon from "./pages/utils/comingsoon"; // Import ComingSoon component

// Authentication Pages
import Login from "./pages/accounts/login";
import Signup from "./pages/accounts/signup";
import ForgotPassword from "./pages/accounts/forgot-password";

// Product Pages
import Products from "./pages/products/products";
import ProductCategoryForm from "./pages/products/prodcateg";
import ProductDetailPage from "./pages/products/product-detail";
import SearchResults from "./pages/products/searchresults";
import Cart from "./pages/products/cart";
import Checkout from "./pages/products/checkout";
import OrderSummary from "./pages/products/order-summary";
import PaymentForm from "./pages/products/paymentform";
import ShippingForm from "./pages/products/shipping";

// User Account Pages (Protected)
import AccountDashboard from "./pages/accounts/accounts";
import Dashboard from "./pages/accounts/dashboard";
import Orders from "./pages/accounts/orders";
import Wishlist from "./pages/accounts/wishlist";
import Profile from "./pages/accounts/profile";
import ChangePassword from "./pages/accounts/changepassword";

// Admin Pages (Protected)
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminUsers from "./pages/admin/users";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/:uid/:token" element={<ChangePassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-category" element={<ProductCategoryForm />} />
          <Route path="/shipping" element={<ShippingForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/products/checkout" element={<Checkout />} />
          <Route path="/products/payment" element={<PaymentForm />} />
          <Route path="/products/shipping" element={<ShippingForm />} />
          <Route path="/products/order-summary" element={<OrderSummary />} />

          {/* User Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account-settings" element={<AccountDashboard />} />
            <Route path="/accounts/dashboard" element={<Dashboard />} />
            <Route path="/accounts/orders" element={<Orders />} />
            <Route path="/accounts/wishlist" element={<Wishlist />} />
            <Route path="/accounts/profile" element={<Profile />} />
            <Route path="/accounts/changepassword" element={<ChangePassword />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
