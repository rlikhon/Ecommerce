import React from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    console.log('CartData', cartData);
        
    const addToCart = (product, size = null) => {    
        let updateCart = [ ...cartData ];

        // If cart is empty, add the first item
        if(cartData.length === 0){
            console.log("Cart is empty")
            
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
        } else {
            if(size != null){
                console.log(size)
                // Check if product and size both are exists
                const isProductExists = updateCart.find(p => 
                    p.product_id === product.id && p.size === size
                )
                
                // If product and size both are exists then increment the quantity
                if(isProductExists){
                    console.log("Product and size both are exists")
                    console.log(isProductExists)
                    // Update the product quantity if product and size both are exists
                    updateCart = updateCart.map(item =>
                    (item.product_id == product.id && item.size == size)
                    ? { ...item, qty: item.qty + 1 }
                    : item
                    )
                }else {
                    // Add new product if product and size both are not exists
                    console.log("Product and size both are not exists")
                    console.log(isProductExists)
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 1000000).toString()}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        image_url: product.image_url,
                        price: product.price,
                        qty: 1,
                    })
                }
                
            } else {
                // If size is null, check if the product exists
                const isProductExists = updateCart.find(p => p.product_id === product.id)

                // If product exists then increment the quantity
                if(isProductExists){
                    updateCart = updateCart.map(item =>
                    (item.product_id == product.id)
                    ? { ...item, qty: item.qty + 1 }
                    : item
                    )
                }else {
                    // Add new product if product is not exists
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 1000000).toString()}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        image_url: product.image_url,
                        price: product.price,
                        qty: 1,
                    })
                }
            }

            // Set the updated cart data
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