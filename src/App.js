import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ItemCard from "./Components/ItemCard";
import ItemDetailsModal from "./Components/ItemDetailsModal";
import ViewCart from "./Components/ViewCart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalItem, setModalItem] = useState(null);

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

  // Add item to the cart, allowing duplicates
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Add the item to the cart
  };

  // Remove a specific item from the cart
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      // Remove only the first matching instance of the item in the cart
      const indexToRemove = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (indexToRemove !== -1) {
        return [
          ...prevCart.slice(0, indexToRemove),
          ...prevCart.slice(indexToRemove + 1)
        ]; // Return the updated cart excluding the item at indexToRemove
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

  return (
    <div className="app">
      <Header cartCount={cart.length} />
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
      <ViewCart cartItems={cart} onRemoveFromCart={removeFromCart} />
    </div>
  );
};

export default App;
