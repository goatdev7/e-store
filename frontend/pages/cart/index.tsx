import React, { useContext } from "react";
import { useCart } from "@/app/context/cartContext";
import { AuthContext } from "@/app/context/authContext";


export default function cartPage() {
    const { cart, updateCartItem, removeFromCart } = useCart();
    const { role, token } = useContext(AuthContext);

    if (!cart && !token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700">Please Login to view Cart items.</p>
            </div>
        );
    }
    else if (!cart && token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700">No items in the cart.</p>
            </div>
        );
    }

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        await updateCartItem(productId, newQuantity);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                {cart?.items.length === 0 ? (
                    <p className="text-gray-600">No items in cart.</p>
                ) : (
                    <div className="space-y-4">
                        {cart?.items.map((item) => (
                            <div key={item.product.id} className="bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                <p className="text-gray-600">Price: ${item.product.price}</p>
                                <p className="text-gray-600">Available Stock: {item.product.quantity}</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <label htmlFor="quantity" className="font-medium">Quantity:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="border rounded w-20 px-2 py-1"
                                        value={item.quantity}
                                        min={1}
                                        max={item.product.quantity}
                                        onChange={(e) => handleQuantityChange(item.product.id, Number(e.target.value))}
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};