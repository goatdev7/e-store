import { GetServerSideProps } from "next";
import Link from "next/link";
import { createApolloClient } from "@/app/services/client";
import jwt from "jsonwebtoken";
import { AuthContext } from "@/app/context/authContext";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT, GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from "@/app/services/product";
import Router from "next/router";
import { parse } from "cookie";

interface AdminProductsPageProps {
    isAdmin: boolean;
}

export default function AdminProductsPage({ isAdmin }: AdminProductsPageProps) {
    const { token, role } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 1,
    });

    const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            const existingData: any = cache.readQuery({ query: GET_PRODUCTS });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: [...(existingData.getProducts || []), addProduct],
                },
            });
        },
    });



    if (role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-700">Access Denied.</p>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "price" || e.target.name === "quantity"
            ? Number(e.target.value)
            : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProduct({ variables: { product: formData } });
        Router.push("/products");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Admin - Manage Products</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-sm">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border rounded px-3 py-2"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="w-full border rounded px-3 py-2"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            className="w-full border rounded px-3 py-2"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-medium mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="w-full border rounded px-3 py-2"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                    {error && <p className="text-red-600 mt-4">Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
}