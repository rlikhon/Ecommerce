import React from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem("cart")) || []);
        
    const addToCart = (product, size = null) => {    
        let updateCart = [ ...cartData ];

        // If cart is empty, add the first item
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

            // If cart is not empty, check if the item already exists
            setCartData(updateCart);
            localStorage.setItem("cart", JSON.stringify(updateCart));            
        }
    };
    
    return (
        <CartContext.Provider value={{ addToCart }}>
            {children}
        </CartContext.Provider>
    );
};