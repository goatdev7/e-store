import { GetServerSideProps } from "next";
import Link from "next/link";
import Rate  from 'antd/lib/rate';
import { GET_PRODUCT } from "@/app/services/product";
import { createApolloClient } from "@/app/services/client";
import { useCart } from "@/app/context/cartContext";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import PopupText from "@/app/components/popupText";
import Router from "next/router";
import Image from "next/image";
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface ProductDetailPageProps {
    product: Product | null;
}


export default function ProductDetailPage({ product }: ProductDetailPageProps) {
    const [PopupVisible, setPopupVisible] = useState(false);
    const [popUpMessage, setPopupMsg] = useState("Please login to add to cart");
    const { addToCart } = useCart();
    const { role, token } = useContext(AuthContext);
    const reviews = [{
        "id":product?.id ,"author":"John Doe","rating":3,"comment":"Great product! Would recommend","date":"2021-09-01T00:00:00.000Z"},
        {"id":product?.id ,"author":"John Doe","rating":3,"comment":"Great product! Would recommend","date":"2021-09-01T00:00:00.000Z"},
        {"id":product?.id ,"author":"Jane Doe","rating":6,"comment":"Great product! Would recommend Great product! Would recommend","date":"2021-09-01T00:00:00.000Z"},
        {"id":product?.id ,"author":"Jane Doe","rating":6,"comment":"Great product! Would recommend Great product! Would recommend Would recommend Would recommend Would recommend Would recommend","date":"2021-09-01T00:00:00.000Z"}];

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
        else {
            addToCart(product.id, 1);
            setPopupMsg("Product added to cart");
            setPopupVisible(true);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <Link href="/products" className="text-black hover:text-indigo-600 hover:no-underline mb-4 inline-block">
                &larr; Browse Products

            </Link>
            <div className="flex container flex-wrap bg-white px-4">
                <div className="bg-white rounded p-6">
                    <h1 className="text-3xl text-gray-500 font-bold mb-4">{product.name}</h1>
                    {product.imageUrl && (
                        <Image src={product.imageUrl} alt={product.name} width={200} height={200} priority />
                    )}
                    <p className="text-gray-500 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-700">
                        ${product.price.toFixed(2)}
                    </p>

                </div>
                <div className="bd-white rounded p-6">
                    {/* <h4 className="text-xl font-semibold mb-4">Reviews</h4> */}
                    <h1 className="text-3xl text-gray-500 font-bold mb-4">Reviews</h1>
                    {reviews && reviews.length > 0 ? (
                        <div className="">
                            {reviews.map((review: any) => (
                                <div key={review.id} className="p-4 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{review.author}</span>
                                        <div className="flex space-x-1">
                                            <Rate disabled defaultValue={review.rating} />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-600">{review.comment}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No current reviews.</p>
                    )}
                    
                </div>
                

            </div>
            {role !== "admin" && (
                        <button onClick={handleAddToCart} className="mt-6 bg-indigo-600 text-white py-2 px-4 text-center rounded hover:bg-indigo-700">
                            Add to Cart
                        </button>
                    )}

            <PopupText
                message={popUpMessage}
                visible={PopupVisible}
                onClose={() => {
                    setPopupVisible(false);
                    setTimeout(() => {
                        Router.push("/auth/login");
                    }, 200);
                }
                }
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