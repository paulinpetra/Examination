"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Wonton, Dip, Drink, Menu, Receipt } from "@/types/types";

const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-B2mWxADrthdHqd22";

// Define item types for cart items
type CartItem = Wonton | Dip | Drink;

// Define CartContext types
type CartContextType = {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
  cartTotal: number;
  submitOrder: () => Promise<Receipt | null>;
};

// Create CartContext with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate total price of cart items
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // Add item to cart
  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const removeItemFromCart = (item: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  // Clear the cart
  const clearCart = () => setCart([]);

  // Submit order to API
  const submitOrder = async (): Promise<Receipt | null> => {
    try {
      const itemIds = cart.map((item) => item.id);
      const response = await fetch(`${BASE_URL}/ppmm/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ items: itemIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const receipt: Receipt = await response.json();
      clearCart(); // Clear cart after successful submission
      return receipt;
    } catch (error) {
      console.error("Error submitting order:", error);
      return null;
    }
  };

  // Value to be provided by context
  const value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    cartTotal,
    submitOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
