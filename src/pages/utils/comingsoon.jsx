// ComingSoon.jsx
import React from 'react';
import '../../assets/styles/ComingSoon.css';

const ComingSoon = () => {
    return (
      <div className="coming-soon-page">
        <div className="background-pattern"></div>
        
        <main className="main-content">
          <div className="feature-announcement">
            <div className="announcement-content">
              <h2>This Experience is<br /><span className="highlight">Coming Soon</span></h2>
              <p className="feature-description">We're crafting something amazing for our Kenyan shoppers. This feature will be available shortly.</p>
              <p className="thank-you">Thank you for your patience as we perfect your shopping experience.</p>
              
              <div className="cta-buttons">
                <button className="cta-button primary">Notify Me</button>
                <button className="cta-button secondary">Return to Homepage</button>
              </div>
            </div>
            
            <div className="decorative-element">
              <div className="circle"></div>
              <div className="shopping-illustration">
                <i className="fas fa-shopping-bag"></i>
              </div>
            </div>
          </div>
          
          <div className="features-preview">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Fast Checkout</h3>
              <p>Complete purchases in seconds with our streamlined payment process</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck-fast"></i>
              </div>
              <h3>Express Delivery</h3>
              <p>Same-day delivery across major cities in Kenya</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-halved"></i>
              </div>
              <h3>Secure Shopping</h3>
              <p>Encrypted transactions and buyer protection on all purchases</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tag"></i>
              </div>
              <h3>Exclusive Deals</h3>
              <p>Member-only discounts and early access to sales</p>
            </div>
          </div>
        </main>
        
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-tagline">
              <span>Kenya's Premier Shopping Experience</span>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            </div>
            
            <div className="copyright">
              <p>&copy; 2025 Dima. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default ComingSoon;