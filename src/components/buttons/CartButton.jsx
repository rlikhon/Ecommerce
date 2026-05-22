import React from "react";
import { Minus, Plus } from "lucide-react";

// Pass the individual item record and state management tracks down from parent views as props
const CartButton = ({ item, cartData, setCartData }) => {
  
  // Decrement handler function block
  const handleDecrement = () => {
    if (item.qty <= 1) return; // Defensive boundary exit trigger safeguard
    
    const updatedCart = cartData.map((p) =>
      p.id === item.id ? { ...p, qty: p.qty - 1 } : p
    );
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increment handler function block
  const handleIncrement = () => {
    const updatedCart = cartData.map((p) =>
      p.id === item.id ? { ...p, qty: p.qty + 1 } : p
    );
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-qty-control-wrapper d-inline-flex align-items-center">
      
      {/* ➖ Decrement Button Control Unit */}
      <button
        type="button"
        className="btn-qty-action"
        disabled={item.qty <= 1}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>

      {/* 🔢 Numeric Value Unit */}
      <input
        type="number"
        
        value={item.qty}
        readOnly
        className="qty-display-input text-center form-control-sm shadow-none"
        style={{ width: "45px" }}
      />

      {/* ➕ Increment Button Control Unit */}
      <button
        type="button"
        className="btn-qty-action"
        onClick={handleIncrement}
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>

    </div>
  );
};

export default CartButton;
