import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/checkout.css";
import OrderSummary from "./order-summary";
import PaymentForm from "./paymentform";
import ShippingForm from "./shipping";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Shipping information
    address: "",
    city: "",
    county: "",
    postalCode: "",
    country: "Kenya",
    
    // Billing information
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingCounty: "",
    billingPostalCode: "",
    billingCountry: "Kenya",
    
    // Payment information
    paymentMethod: "mpesa",
    mpesaNumber: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    
    // Additional
    notes: "",
    acceptTerms: false,
  });

  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (!cartData) {
      navigate("/cart");
      return;
    }
    try {
      setCart(JSON.parse(cartData));
    } catch (error) {
      console.error("Error parsing cart data:", error);
      navigate("/cart");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    if (name === "sameAsShipping" && checked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingCounty: prev.county,
        billingPostalCode: prev.postalCode,
        billingCountry: prev.country
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout details:", formData);

    // Clear cart and navigate to confirmation
    localStorage.removeItem("cartItems");
    setCart(null);
    setCurrentStep(4);
  };

  if (!cart) {
    return <div className="checkout-loading">Loading cart data...</div>;
  }

  const cartItems = cart.items || [
    { id: 1, name: "Product 1", price: 2999, quantity: 2 },
    { id: 2, name: "Product 2", price: 1999, quantity: 1 }
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 500; // Flat rate shipping in KES
  const tax = subtotal * 0.16; // 16% VAT in Kenya
  const total = subtotal + shipping + tax;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-progress">
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-name">Shipping</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-name">Payment</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-name">Review</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 4 ? "active" : ""}`}>
          <div className="step-number">4</div>
          <div className="step-name">Confirmation</div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-container">
          {currentStep === 1 && (
            <ShippingForm 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <PaymentForm 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep} 
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <div className="review-order">
              <h2>Review Your Order</h2>
              
              <div className="review-section">
                <h3>Shipping Information</h3>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.county} {formData.postalCode}</p>
                <p>{formData.country}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>
              
              <div className="review-section">
                <h3 className="section-title">Payment Method</h3>
                <div className={`payment-method-display ${formData.paymentMethod}`}>
                  {formData.paymentMethod === "mpesa" ? (
                    <div className="mpesa-details">
                      <div className="method-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#00B300">
                          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                        </svg>
                        <span>M-Pesa</span>
                      </div>
                      <div className="mpesa-number">
                        <span>Payment will be requested on:</span>
                        <span className="number">{formData.mpesaNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="method-header">
                      {formData.paymentMethod === "credit-card" ? (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A237E">
                            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                          </svg>
                          <span>Credit Card</span>
                        </>
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#003087">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                            10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-
                            .26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                          <span>PayPal</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="review-section">
                <h3>Order Summary</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="review-item">
                    <p>{item.name} x {item.quantity}</p>
                    <p>KES {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="order-totals">
                  <div className="total-line">
                    <span>Subtotal:</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span>Shipping:</span>
                    <span>KES {shipping.toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span>Tax:</span>
                    <span>KES {tax.toFixed(2)}</span>
                  </div>
                  <div className="total-line total">
                    <span>Total:</span>
                    <span>KES {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="terms-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a></span>
                </label>
              </div>
              
              <div className="checkout-buttons">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  Back to Payment
                </button>
                <button 
                  type="button" 
                  className="primary-button"
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="order-confirmation">
              <div className="confirmation-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e5ab5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>Order Confirmed!</h2>
              <p className="confirmation-message">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <p>Order #: {Math.floor(Math.random() * 10000000)}</p>
              <p>A confirmation email has been sent to {formData.email}</p>
              <div className="confirmation-buttons">
                <button onClick={() => navigate("/")} className="secondary-button">
                  Continue Shopping
                </button>
                <button onClick={() => navigate("/orders")} className="primary-button">
                  View My Orders
                </button>
              </div>
            </div>
          )}
        </div>
        
        {currentStep < 4 && (
          <OrderSummary 
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;