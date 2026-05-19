import { useState, forwardRef } from 'react';
import { Heart } from 'lucide-react';

export const WishlistButton = forwardRef(({
  initialIsWishlisted = false,
  productId,
  onStatusChange,
  onError,
  className = '',
  onClick,
  ...props
}, ref) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWishlist = async (event) => {
    // Forward the original click handler if passed from props
    if (onClick) onClick(event);
    if (isLoading) return;

    setIsLoading(true);
    const targetStatus = !isWishlisted;

    try {
      // Mock API endpoint trigger — replace with your actual API fetch logic
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.95 ? reject(new Error('Network Timeout')) : resolve(true);
        }, 500);
      });

      setIsWishlisted(targetStatus);
      if (onStatusChange) onStatusChange(productId, targetStatus);
    } catch (err) {
      const standardError = err instanceof Error ? err : new Error('Failed to update wishlist state');
      if (onError) onError(standardError);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = [
    'wishlist-btn',
    isWishlisted ? 'is-active' : '',
    isLoading ? 'is-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      onClick={handleToggleWishlist}
      disabled={isLoading || props.disabled}
      className={buttonClasses}
      aria-pressed={isWishlisted}
      aria-live="polite"
    >
      <div className="wishlist-btn__icon-wrapper">
        <Heart 
          className="wishlist-btn__icon" 
          size={18} 
          aria-hidden="true"
        />
      </div>
      <span className="wishlist-btn__text">
        {isLoading ? 'Saving...' : isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
      </span>
    </button>
  );
});

WishlistButton.displayName = 'WishlistButton';
export default WishlistButton;
