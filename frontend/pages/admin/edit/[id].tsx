import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/app/components/AdminLayout';
import { useQuery, useMutation } from '@apollo/client';

import { GET_PRODUCT, UPDATE_PRODUCT } from '@/app/services/product';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        imageUrl: ''
    });

    const { data, loading } = useQuery(GET_PRODUCT, {
        variables: { id },
        skip: !id,
        onCompleted: (data) => {
            setProduct(data.getProduct);
        }
    });


    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['name', 'description', 'price', 'quantity', 'imageUrl'] as const;
        const emptyFields = requiredFields.filter(field => !product[field]);
        
        // Create an object with only the allowed fields for ProductInput
        const updatedFields = {
            name: String(product.name),
            description: String(product.description),
            price: parseFloat(String(product.price)),
            quantity: parseInt(String(product.quantity)),
            imageUrl: String(product.imageUrl)
        };

        if (emptyFields.length > 0) {
            const proceed = window.confirm(
                `The following fields are empty: ${emptyFields.join(', ')}. Do you want to proceed?`
            );
            if (!proceed) {
                router.push('/admin/products');
                return;
            } 
        }

        try {
            const response = await updateProduct({
            
                variables: { 
                    id,
                    product: updatedFields // Now only includes the fields defined in ProductInput
                },
            });

            if (!response.data) {
                throw new Error('No data returned from update');
            }

            router.push('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
            window.alert('Failed to update product. Please try again.');
            return;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setImageUrl(data.url);
            setProduct(prev => ({
                ...prev,
                imageUrl: data.url
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"

                        />
                    </div>

                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows={4}

                        />
                    </div>

                    <div>
                        <label className="block mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"

                        />
                    </div>

                    <div>
                        <label className="block mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"

                        />
                    </div>

                    <div>
                        <label className="block mb-2">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border rounded"
                        />
                        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                        {imageUrl && (
                            <div className="mt-2">
                                <img src={imageUrl} alt="Preview" className="w-40 h-40 object-cover" />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
