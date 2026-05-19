import { useState, forwardRef } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

export const AddToCartButton = forwardRef(({
  productId,
  onSuccess,
  onError,
  className = '',
  onClick,
  ...props
}, ref) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (event) => {
    // Forward native onClick triggers if provided via props
    if (onClick) onClick(event);
    if (isLoading || isAdded) return;

    setIsLoading(true);

    try {
      // Simulate real async API database mutation / state validation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.95 ? reject(new Error('Cart updates failed')) : resolve(true);
        }, 600);
      });

      setIsAdded(true);
      if (onSuccess) onSuccess(productId);

      // Auto-reset validation lock screen UI notice state back to standard after 2.5s
      setTimeout(() => {
        setIsAdded(false);
      }, 2500);

    } catch (err) {
      const standardError = err instanceof Error ? err : new Error('Network addition failed');
      if (onError) onError(standardError);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = [
    'cart-btn',
    isAdded ? 'is-success' : '',
    isLoading ? 'is-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      onClick={handleAddToCart}
      disabled={isLoading || isAdded || props.disabled}
      className={buttonClasses}
      aria-live="polite"
    >
      {isAdded ? (
        <>
          <Check className="cart-btn__icon" size={18} aria-hidden="true" />
          <span className="cart-btn__text">Added!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="cart-btn__icon" size={18} aria-hidden="true" />
          <span className="cart-btn__text">
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </span>
        </>
      )}
    </button>
  );
});

AddToCartButton.displayName = 'AddToCartButton';
export default AddToCartButton;
