import React, { useContext } from "react";
import { useCart } from "@/app/context/cartContext";
import { AuthContext } from "@/app/context/authContext";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  quantity: number;
}


export default function CartPage() {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600">Please login to view your cart items.</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Link href="/products">
          <div className="text-center p-8 text-gray-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600">Start shopping to add items to your cart.</p>
          </div>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    try {
      if (newQuantity >= 1) {
        await updateCartItem(productId, newQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 text-dark">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="mt-1">{cart.items.length} items in your cart</p>
          </div>

          <div className="divide-y divide-gray-200">
            {cart.items.map((item: CartItem) => (
              <div key={item.product.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-1">
                      {item.product.name}
                    </h2>
                    <p className="text-lg font-medium text-blue-600">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-sm mt-1">
                      Stock: {item.product.quantity} available
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      {item.quantity > 1 ? (
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle size={20} />
                        </button>) : null
                      }

                      <input
                        type="number"
                        id={`quantity-${item.product.id}`}
                        className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={item.quantity}
                        min={1}
                        max={item.product.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, Number(e.target.value))}
                      />

                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={item.quantity >= item.product.quantity}
                      >
                        <PlusCircle size={20} />
                      </button>
                    </div>

                    <div className="text-lg font-semibold text-gray-800 min-w-[100px] text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Subtotal</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}