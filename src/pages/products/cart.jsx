import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initial render
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <div className="item-image">Image</div>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">KES {item.price.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="item-actions">
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-subtotal">
                    KES {(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-btn" 
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total Amount:</span>
              <span className="total-amount">KES {calculateTotal().toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
              <Link
                to={{
                  pathname: "/checkout",
                }}
                state={{ cartItems }}
                className="checkout-btn"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
