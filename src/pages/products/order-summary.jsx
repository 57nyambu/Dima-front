import React from 'react';
import "../../assets/styles/checkout.css";

const OrderSummary = ({ cartItems, subtotal, shipping, tax, total }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      
      <div className="summary-items">
        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <div className="item-info">
              <div className="item-quantity">{item.quantity}x</div>
              <div className="item-name">{item.name}</div>
            </div>
            <div className="item-price">KES {(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      <div className="summary-totals">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>KES {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <span>KES {shipping.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Tax</span>
          <span>KES {tax.toFixed(2)}</span>
        </div>
        <div className="summary-line total">
          <span>Total</span>
          <span>KES {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;