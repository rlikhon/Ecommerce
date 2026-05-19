import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

export default function SimpleAddToCartButton() {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    // Reset back to original state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`cart-btn ${isAdded ? 'is-success' : ''}`}
    >
      {isAdded ? (
        <>
          <Check className="cart-btn__icon" size={18} />
          <span className="cart-btn__text">Added!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="cart-btn__icon" size={18} />
          <span className="cart-btn__text">Add to Cart</span>
        </>
      )}
    </button>
  );
}
