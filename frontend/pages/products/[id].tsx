import { GetServerSideProps } from "next";
import Link from "next/link";
import { GET_PRODUCT } from "@/app/services/product";
import { createApolloClient } from "@/app/services/client";
import { useCart } from "@/app/context/cartContext";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import PopupText from "@/app/components/popupText";

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
    const [ PopupVisible, setPopupVisible ] = useState(false);
    const [popUpMessage, setPopupMsg ] = useState("Please login to add to cart");
    const { addToCart } = useCart();
    const { token } = useContext(AuthContext);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Product not found.</p>
            </div>
        );
    }

    const handleAddToCart = async () => {
        // Add to cart logic
        if (!token) {
            setPopupVisible(true);
        }
        else{
            addToCart(product.id, 1);
            setPopupMsg("Product added to cart");
            setPopupVisible(true);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <Link href="/products" className="text-indigo-600 hover:underline mb-4 inline-block">
                    &larr; Back to Products

                </Link>
                <div className="bg-white rounded shadow p-6">
                    <h1 className="text-3xl text-gray-500 font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-500 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-700">
                        ${product.price.toFixed(2)}
                    </p>
                    <button onClick={handleAddToCart} className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                        Add to Cart
                    </button>
                </div>
            </div>
            <PopupText
            message={popUpMessage}
            visible={PopupVisible}
            onClose={() => setPopupVisible(false)}
            >
            </PopupText>
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