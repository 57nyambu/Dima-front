import React from 'react';
import "../../assets/styles/checkout.css";

const PaymentForm = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleContinue} className="checkout-form">
      <h2>Payment Information</h2>
      <div className="form-group">
        <label>Payment Method</label>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={formData.paymentMethod === "mpesa"}
              onChange={handleChange}
            />
            M-Pesa
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === "credit-card"}
              onChange={handleChange}
            />
            Credit Card
          </label>
        </div>
      </div>
      {formData.paymentMethod === "mpesa" && (
        <div className="form-group">
          <label>M-Pesa Number</label>
          <input
            type="tel"
            name="mpesaNumber"
            value={formData.mpesaNumber}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div className="checkout-buttons">
        <button type="button" onClick={prevStep}>
          Back to Shipping
        </button>
        <button type="submit">Continue to Review</button>
      </div>
    </form>
  );
};

export default PaymentForm;