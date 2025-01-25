import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ItemCard from "./Components/ItemCard";
import ItemDetailsModal from "./Components/ItemDetailsModal";
import ViewCart from "./Components/ViewCart";
import { FaShoppingCart } from 'react-icons/fa'; // For the cart icon

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [cartVisible, setCartVisible] = useState(false); // State to toggle cart visibility

  // Fetch products from the API
  useEffect(() => {
    fetch("https://interview.gdev.gosbfy.com/api/collections/Products/records")
      .then((response) => response.json())
      .then((data) => {
        const formattedProducts = data.items.map((item) => ({
          ...item,
          imageUrl: `https://interview.gdev.gosbfy.com/api/files/${item.collectionId}/${item.id}/${item.image}`,
        }));
        setProducts(formattedProducts);
      });
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (indexToRemove !== -1) {
        return [
          ...prevCart.slice(0, indexToRemove),
          ...prevCart.slice(indexToRemove + 1)
        ];
      }
      return prevCart;
    });
  };

  const viewItemDetails = (item) => {
    setModalItem(item);
  };

  const closeModal = () => {
    setModalItem(null);
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible); // Toggle the cart visibility
  };

  return (
    <div className="app">
      <Header cartCount={cart.length} />
      
      <div className="cart-icon" onClick={toggleCart}>
        <FaShoppingCart size={30} />
      </div>
      
      <div className="product-list">
        {products.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAddToCart={addToCart}
            onViewDetails={viewItemDetails}
          />
        ))}
      </div>
      
      {modalItem && <ItemDetailsModal item={modalItem} onClose={closeModal} />}
      
      {cartVisible && <ViewCart cartItems={cart} onRemoveFromCart={removeFromCart} />}
    </div>
  );
};

export default App;
