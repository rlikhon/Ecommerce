import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function SimpleWishListButton() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleWishlist}
      disabled={isLoading}
      aria-pressed={isWishlisted}
      className={`wishlist-btn ${isWishlisted ? 'is-active' : ''} ${isLoading ? 'is-loading' : ''}`}
    >
      <Heart 
        className="wishlist-btn__icon"
        size={18} 
      />
      <span className="wishlist-btn__text">
        {isLoading ? 'Saving...' : isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
      </span>
    </button>
  );
}
