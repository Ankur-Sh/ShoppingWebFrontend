import React from "react";

const ItemDetailsModal = ({ item, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{item.Name}</h3>
        <img src={item.imageUrl} alt={item.Name} />
        <p>{item.LongDesc}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
