import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { slug: "product-a", name: "Product A", price: 100, quantity: 1 },
    { slug: "product-b", name: "Product B", price: 50, quantity: 2 },
  ]);

  const handleRemove = (slug) => {
    setCartItems(cartItems.filter((item) => item.slug !== slug));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.slug}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleRemove(item.slug)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>
        <strong>
          Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </strong>
      </p>
      {cartItems.length > 0 && <Link to="/checkout">Proceed to Checkout</Link>}
    </div>
  );
};

export default Cart;
