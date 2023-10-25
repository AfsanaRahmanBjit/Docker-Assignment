import React from "react";
import "./cart.style.scss"

function Cart({ cartItems, onRemoveFromCart }) {

    const handleRemoveClick = (item) => {
        onRemoveFromCart(item);
      };
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title}
              <button  className="remove-button-style" onClick={(e) => {e.stopPropagation(); handleRemoveClick(item); alert("Do you want to remove the item from your cart?");}}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;