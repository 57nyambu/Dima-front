import { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout details:", formData);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Shipping Address" onChange={handleChange} required />
        <select name="paymentMethod" onChange={handleChange}>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="mpesa">M-Pesa</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
