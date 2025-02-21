import { AuthContext } from "@/app/context/authContext";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "@/app/services/product";
import Router from "next/router";


export default function AdminProductsPage() {
    const { token, role } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imageUrl: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const [buttonText, setButtonText] = useState("Delete Product");
    const [buttonColor, setButtonColor] = useState("bg-indigo-600");
    const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT);
    const [updateProduct, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PRODUCT);
    const [deleteProduct, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_PRODUCT);


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
    // Handle file input separately
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    // Function to upload image using your Next.js API endpoint
    const uploadImage = async (): Promise<string> => {
        console.log("file is: ", file);
        if (!file) return "";
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            setUploading(true);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            return data.url; // Assuming /api/upload returns { url: <image URL>, ... }
        } catch (err) {
            console.error("Error uploading image:", err);
            return "";
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let imageUrl = formData.imageUrl;
        if (file) {
            imageUrl = await uploadImage();
            setFormData((prev) => ({ ...prev, imageUrl }));
        }
        try {
            await addProduct({
                variables: { product: { ...formData, imageUrl } },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            });
            Router.push("/products");
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };
    const handleDelete = async (e: React.FormEvent) => {

    };


    return (
        <div className="min-h-screen min-w-screen text-black bg-standard py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin - Manage Products</h1>
            <div className="container mx-auto flex flex-wrap px-4 justify-between py-6">
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
                    <div className="mb-6">
                        <label className="block font-medium mb-1">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {uploading && <p className="text-sm text-gray-600">Uploading image...</p>}
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
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-sm">
                    <h2 className="text-xl font-semibold mb-4">Update The Product</h2>
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
                    <div className="mb-6">
                        <label className="block font-medium mb-1">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {uploading && <p className="text-sm text-gray-600">Uploading image...</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {updateLoading ? "Updating..." : "Update Product"}
                    </button>
                    {updateError && <p className="text-red-600 mt-4">Error: {updateError.message}</p>}
                </form>
            </div>


                
            <div className="mb-6 px-4">

                <button
                    onClick={() => {
                        setDeleteActive(!deleteActive);
                        if (buttonText === "Delete Product" ){
                            setButtonColor("bg-gray-200");
                            setButtonText("Cancel");
                        }   
                        else{
                            setButtonText("Delete Product");
                            setButtonColor("bg-indigo-600");
                        }
                    }}
                    className ={`${buttonColor} text-white rounded hover:bg-indigo-700 py-2 px-4 rounded`} 
                           
                    >
                    {buttonText}
                </button>
            </div>
            

            {deleteActive && (
                <div className="mb-6 px-6">
                    <form onSubmit={handleDelete} className="bg-white p-6 rounded shadow-md max-w-sm">
                        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Name*</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border rounded px-3 py-2"
                                value={formData.name}
                                // onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">ProductId</label>
                            <input
                                type="text"
                                name="description"
                                className="w-full border rounded px-3 py-2"
                                value={formData.description}
                                // onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {deleteLoading ? "Deleting..." : "Delete Product"}
                        </button>
                        {deleteError && <p className="text-red-600 mt-4">Error: {deleteError.message}</p>}
                    </form>
                </div>

            )}
        </div>


    );
}