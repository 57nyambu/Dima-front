import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import { useState } from "react";
import "../../assets/styles/landing.css";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Sample featured products data - diversified for general e-commerce
  const featuredProducts = [
    { id: 1, name: "Smart 4K TV", price: 499.99, image: "/api/placeholder/250/200" },
    { id: 2, name: "Modern Coffee Table", price: 199.99, image: "/api/placeholder/250/200" },
    { id: 3, name: "Wireless Headphones", price: 89.99, image: "/api/placeholder/250/200" },
    { id: 4, name: "Kitchen Blender Set", price: 69.99, image: "/api/placeholder/250/200" }
  ];

  // Sample categories for general e-commerce
  const categories = [
    { id: 1, name: "Electronics", image: "/api/placeholder/150/150" },
    { id: 2, name: "Home & Kitchen", image: "/api/placeholder/150/150" },
    { id: 3, name: "Fashion", image: "/api/placeholder/150/150" },
    { id: 4, name: "Sports & Outdoors", image: "/api/placeholder/150/150" },
    { id: 5, name: "Beauty & Personal Care", image: "/api/placeholder/150/150" },
    { id: 6, name: "Toys & Games", image: "/api/placeholder/150/150" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Everything You Need, All in One Place</h1>
          <p>Discover amazing products with great prices and fast delivery</p>
          <div className="hero-buttons">
            <Link to="/products" className="primary-button">Shop Now</Link>
            <Link to="/deals" className="secondary-button">Today's Deals</Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <button className="product-button">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/products" className="view-all-link">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link to={`/category/${category.id}`} key={category.id} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Dima</h2>
              <p>At Dima, we believe shopping should be easy, enjoyable, and accessible to everyone. Founded in 2015, our mission is to provide a wide range of high-quality products across all categories, from electronics and home goods to fashion and more.</p>
              <p>We work directly with trusted manufacturers and suppliers to bring you the best products at competitive prices, with fast shipping and excellent customer service for a seamless shopping experience.</p>
              <Link to="/about" className="about-link">Learn More About Us</Link>
            </div>
            <div className="about-image">
              <img src="/api/placeholder/400/300" alt="About Dima" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: support@dima.com</p>
              <p>Phone: +254740-620-057</p>
              <p>Address: 68921, Upperhill, Nairobi</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/deals">Today's Deals</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Customer Service</h3>
              <ul>
                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                <li><Link to="/returns">Returns & Refunds</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <p>Subscribe to receive updates on new products and exclusive offers.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Dima E-commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;