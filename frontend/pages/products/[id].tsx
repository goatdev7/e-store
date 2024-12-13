import { GetServerSideProps } from "next";
import Link from "next/link";
import { GET_PRODUCT } from "@/app/services/product";
import { createApolloClient } from "@/app/services/client";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface ProductDetailPageProps {
    product: Product | null;
}


export default function ProductDetailPage({ product }: ProductDetailPageProps) {
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <Link href="/products" className="text-indigo-600 hover:underline mb-4 inline-block">
                    &larr; Back to Products

                </Link>
                <div className="bg-white rounded shadow p-6">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-700">
                        ${product.price.toFixed(2)}
                    </p>
                    <button className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );

};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const client = createApolloClient();
    const { data } = await client.query({
        query: GET_PRODUCT,
        variables: { id },
    });

    return {
        props: {
            product: data.getProduct
        },
    };
};