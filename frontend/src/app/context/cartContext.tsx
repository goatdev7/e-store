// creating cart context

import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CART, ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART } from "../services/cart";

interface CartItem {
    product: {
        id: string,
        name: string,
        description: string,
        price: number,
        quantity: number,
    }
    quantity: number,
};

interface CartType {
    id: string,
    items: CartItem[],
};

interface CartContextProps {
    cart: CartType | null,
    addToCart: (productId: string, quantity: number) => Promise<void>,
    updateCartItem: (productId: string, quantity: number) => Promise<void>,
    removeFromCart: (productId: string) => Promise<void>,
};

export const CartContext = createContext<CartContextProps>({
    cart: null,
    addToCart: async () => { },
    updateCartItem: async () => { },
    removeFromCart: async () => { },
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartType | null>(null);
    // getting the data
    const { data, loading, error } = useQuery(GET_CART, {
        fetchPolicy: "cache-and-network", // change it to network-only if cache is not updating
        onCompleted: (data) => {
            if (data?.getCart) {
                setCart(data.getCart);
            }
        },
    });

    // all the mutations
    const [addToCartMutation] = useMutation(ADD_TO_CART);
    const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM);
    const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);


    // adding to cart
    const addToCart = async (productId: string, quantity: number) => {
        const { data } = await addToCartMutation({
            variables: { productId, quantity },
        })
        if (data?.addToCart) {
            setCart(data.addToCart); // updating the cart
        }
    }

    // removing from cart
    const removeFromCart = async (productId: string) => {
        const { data } = await removeFromCartMutation({
            variables: { productId },
        });
        if (data?.removeFromCart) {
            setCart(data.removeFromCart);
        }
    }

    // updating the cart item
    const updateCartItem = async (productId: string, quantity: number) => {
        const { data } = await updateCartItemMutation({
            variables: { productId, quantity },
        });
        if (data?.updateFromCart) {
            setCart(data.updateFromCart);
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateCartItem,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
};

// for usage across the app
export const useCart = ()=> useContext(CartContext);