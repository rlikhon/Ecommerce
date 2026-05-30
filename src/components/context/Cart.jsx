import React, { createContext, useState, useMemo, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        const localCart = localStorage.getItem("cart");
        return localCart ? JSON.parse(localCart) : [];
    });

    // Automatically sync localStorage when data changes safely
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartData));
    }, [cartData]);

    const addToCart = (product, size = null) => {
        let updateCart = [ ...cartData ];
        if(cartData.length === 0){            
            updateCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 1000000).toString()}`,
                product_id: product.id,
                size: size,
                title: product.title,
                image_url: product.image_url,
                price: product.price,
                qty: 1,                
            });            
        } else {
            if(size != null){                
                const isProductExists = updateCart.find(p => p.product_id === product.id && p.size === size);
                if(isProductExists){
                    updateCart = updateCart.map(item =>
                        (item.product_id == product.id && item.size == size) ? { ...item, qty: item.qty + 1 } : item
                    );
                } else {
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 1000000).toString()}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        image_url: product.image_url,
                        price: product.price,
                        qty: 1,
                    });
                }
            } else {
                const isProductExists = updateCart.find(p => p.product_id === product.id);
                if(isProductExists){
                    updateCart = updateCart.map(item =>
                        (item.product_id == product.id) ? { ...item, qty: item.qty + 1 } : item
                    );
                } else {
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 1000000).toString()}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        image_url: product.image_url,
                        price: product.price,
                        qty: 1,
                    });
                }
            }
        }
        setCartData(updateCart);
    };

    const updateQuantity = (id, quantity) => {
        setCartData(prev => prev.map(item => item.id == id ? { ...item, qty: quantity } : item));
    };

    const removeFromCart = (id) => {
        setCartData(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCartData([]);
    };

    const getTotalCartQty = () => {
        if(cartData){
            return cartData.reduce((sum, item) => sum + item.qty, 0);
        } else {
            return 0;
        }
    };


    // =========================================================================
    // ✅ THE O(N) MEMOIZED PERFORMANCE FIX: Caches mathematical totals 
    // Calculations only run when cartData actually mutates, dropping load to 0ms
    // =========================================================================
    const cartTotals = useMemo(() => {
        // High-performance single-pass array reduction mapping
        const subTotalValue = cartData.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
        const totalDiscount = 0;
        const shippingValue = subTotalValue > 0 ? 0 : 0; // Adjust logic condition for free shipping thresholds here
        const grandTotalValue = subTotalValue - totalDiscount + shippingValue;

        return {
            subTotal: subTotalValue.toFixed(2),
            totalDiscount: totalDiscount.toFixed(2),
            shipping: shippingValue.toFixed(2),
            grandTotal: grandTotalValue.toFixed(2)
        };
    }, [cartData]);

    return (
        <CartContext.Provider 
            value={{ 
                cartData, 
                setCartData, 
                addToCart, 
                updateQuantity, 
                removeFromCart,
                clearCart,
                getTotalCartQty,
                // ✅ Pass static memoized data metrics values instead of raw functions
                subTotal: cartTotals.subTotal,
                shipping: cartTotals.shipping,
                totalDiscount: cartTotals.totalDiscount,
                grandTotal: cartTotals.grandTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
