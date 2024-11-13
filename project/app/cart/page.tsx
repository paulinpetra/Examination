"use client";

import { Wonton, Dip, Drink } from "@/types/types";
import { useCart } from "@/cartContext";

import { useRouter } from "next/navigation";

const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-B2mWxADrthdHqd22";
const TENANT_ID = "ppmm";

const CartPage: React.FC = () => {
  const { cart, cartTotal, submitOrder } = useCart();

  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      const itemIds = cart.map((item: Wonton | Dip | Drink) => item.id); // Use the union type
      const orderData = await postOrder("ppmm", itemIds);
      console.log("Order placed successfully:", orderData);
      // Optionally, redirect to an order confirmation page
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul>
        {cart.map((item: Wonton | Dip | Drink) => (
          <li key={item.id} className="py-2">
            {item.name} - {item.price} SEK
          </li>
        ))}
      </ul>

      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
