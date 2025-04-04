import React from 'react';
import "../../assets/styles/about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <div className="about-header">
          <div className="header-content">
            <h1 className="about-title">About Dima</h1>
            <p className="about-subtitle">Complete E-commerce & Marketplace Solution</p>
          </div>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2 className="section-title">Our Platform</h2>
            <p className="section-text">
              Dima is a versatile e-commerce ecosystem designed for both direct selling and multi-vendor 
              marketplace operations. Our platform empowers businesses to sell products and services directly 
              while also enabling third-party sellers to list their offerings in a unified marketplace.
            </p>
            <p className="section-text">
              With integrated dropshipping capabilities, inventory management tools, and comprehensive vendor 
              support, Dima creates opportunities for businesses of all sizes to connect with customers globally.
            </p>
          </div>
          
          <div className="about-section feature-section">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon store-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Multi-vendor Marketplace</h3>
                  <p className="feature-details">Commission-based selling, vendor management, unified checkout</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon dropship-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Dropshipping Integration</h3>
                  <p className="feature-details">Supplier connections, automated fulfillment, inventory sync</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon payment-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Payment Processing</h3>
                  <p className="feature-details">Multiple gateways, split payments, automated disbursements</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon analytics-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Advanced Analytics</h3>
                  <p className="feature-details">Sales reports, vendor performance, customer insights</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon marketing-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Marketing Suite</h3>
                  <p className="feature-details">SEO tools, affiliate programs, promotional campaigns</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon mobile-icon"></div>
                <div className="feature-content">
                  <h3 className="feature-title">Mobile Commerce</h3>
                  <p className="feature-details">Responsive design, native apps, push notifications</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-section audience-section">
            <h2 className="section-title">Who We Serve</h2>
            <div className="audience-grid">
              <div className="audience-item">
                <h3 className="audience-title">Retailers</h3>
                <p className="audience-text">
                  Create your dedicated online store with complete brand control, inventory management, 
                  and customer relationship tools.
                </p>
              </div>
              
              <div className="audience-item">
                <h3 className="audience-title">Marketplace Sellers</h3>
                <p className="audience-text">
                  Join our ecosystem as a third-party vendor to access our established customer base 
                  with minimal setup and overhead costs.
                </p>
              </div>
              
              <div className="audience-item">
                <h3 className="audience-title">Dropshippers</h3>
                <p className="audience-text">
                  Connect with suppliers, list products without inventory investment, and automate 
                  order fulfillment through our integrated network.
                </p>
              </div>
              
              <div className="audience-item">
                <h3 className="audience-title">Service Providers</h3>
                <p className="audience-text">
                  Offer bookings, appointments, and service packages with customizable scheduling 
                  and service management tools.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-section cta-section">
            <h2 className="section-title">Get Started Today</h2>
            <p className="section-text">
              Whether you're launching a new business, expanding your existing operation, or looking to join 
              our marketplace as a seller, Dima provides the tools and support you need to succeed in the 
              competitive e-commerce landscape.
            </p>
            <div className="cta-buttons">
              <a href="/pricing" className="cta-button primary-button">
                Explore Plans
              </a>
              <a href="/marketplace" className="cta-button secondary-button">
                Join Marketplace
              </a>
              <a href="/demo" className="cta-button secondary-button">
                Request Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;