import React from "react";

const ViewCart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.Name} - ${item.Price}</p>
              <button onClick={() => onRemoveFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCart;
