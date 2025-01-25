import React from "react";

const Header = ({ cartCount }) => {
  return (
    <header>
      <h1>Product Store</h1>
      <div className="cart">
        <span>Cart: {cartCount} items</span>
      </div>
    </header>
  );
};

export default Header;
