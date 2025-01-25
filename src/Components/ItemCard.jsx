import React from "react";

const ItemCard = ({ item, onAddToCart, onViewDetails }) => {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.Name} />
      <h3>{item.Name}</h3>
      <p>{item.Desc}</p>
      <p>${item.Price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
      <button onClick={() => onViewDetails(item)}>View Details</button>
    </div>
  );
};

export default ItemCard;
