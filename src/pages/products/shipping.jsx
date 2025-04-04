import React from 'react';
import "../../assets/styles/checkout.css";

const ShippingForm = ({ formData, handleChange, nextStep }) => {
  const handleContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleContinue} className="checkout-form">
      <h2>Shipping Information</h2>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="checkout-buttons">
        <button type="submit">Continue to Payment</button>
      </div>
    </form>
  );
};

export default ShippingForm;