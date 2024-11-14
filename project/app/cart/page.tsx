"use client";
import { useState } from "react";
import { Wonton, Dip, Drink } from "@/types/types";
import { useCart } from "@/cartContext";
import { postOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CartPage: React.FC = () => {
  const { cart, cartTotal } = useCart();
  const router = useRouter();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePlaceOrder = async () => {
    console.log("handlePlaceOrder called");

    try {
      // Extract just the item IDs from the cart
      const itemIds = cart.map((item: Wonton | Dip | Drink) => item.id);

      console.log("Item IDs to be sent:", itemIds);

      // Send the item IDs to the API
      await postOrder(itemIds); // We are ignoring the result for this version

      // No need to handle success or failure in terms of UI anymore, just show the pop-up
    } catch (error) {
      console.error("Error placing order:", error);
      // We won't show any error message, just show the pop-up as if it worked
    }

    // Always show the popup after trying to place the order
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="p-4 bg-light-gray min-h-screen">
      {/* Cart Items List */}
      <ul className="space-y-4">
        {cart.map((item: Wonton | Dip | Drink) => (
          <li
            key={item.id}
            className="bg-white text-black rounded-lg p-4 uppercase"
          >
            <div className="flex justify-between">
              <span className="flex-1">{item.name}</span>
              <span className="flex-1 text-right relative">
                <span className="relative z-10">{item.price} SEK</span>
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Total Price */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-black">TOTALT</span>
        <span className="text-lg font-bold text-black">{cartTotal} SEK</span>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-coal text-white p-3 rounded text-xl font-semibold hover:bg-blue-600"
      >
        TAKE MY MONEY!
      </button>

      {/* Full-Screen Popup (acts like a new page) */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-clay text-snow flex flex-col items-center justify-center z-50">
          <div className="text-center p-10 max-w-lg w-full">
            <Image
              src="/assets/boxtop.png"
              alt="boxtop"
              width={500}
              height={500}
            />
            <h2 className="text-4xl font-bold mb-6">DINA WONTON TILLAGAS!</h2>
            <p className="text-xl mb-6">ETA 5 MIN</p>
            <p className="text-xs">#4KJWDSD2</p>
            <button className="mt-6 w-full bg-clay text-white border-2 border-white p-3 rounded text-xl font-semibold">
              SE KVITTO
            </button>
            <button className="mt-6 w-full bg-coal text-white p-3 rounded text-xl font-semibold">
              GÖR EN NY BESTÄLLNING
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
