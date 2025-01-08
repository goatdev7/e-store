import { GetServerSideProps } from "next";
import { createApolloClient } from "../src/app/services/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { motion } from "framer-motion";

const GET_PRODUCTS = gql`
  query {
    getProducts {
      id
      name
      description
      price
    }
  }
`;

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface HomeProps {
    products: Product[];
}

export default function Home({ products }: HomeProps) {
    const featuredProduct = products.length > 0 ? products[3] : null;

    return (
        <div className="min-h-screen min-w-full bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-800 dark:via-gray-900 dark:to-black transition-colors duration-500 flex flex-col">
            <div className="w-full">
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="min-h-screen flex items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                >
                    <div className="container mx-auto">
                        <h1 className="text-5xl font-extrabold mb-4">Welcome to E-Store</h1>
                        <p className="text-lg mb-6">
                            Your one-stop shop for the latest and greatest in electronics.
                        </p>
                        {featuredProduct && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">
                                    Top Deal: {featuredProduct.name}
                                </h2>
                                <p className="text-md italic text-white/90">
                                    {featuredProduct.description}
                                </p>
                                <p className="text-xl font-semibold mt-2">
                                    ${featuredProduct.price.toFixed(2)}
                                </p>
                            </div>
                        )}
                        <Link
                            href="#products"
                            className="bg-white text-black px-4 py-3 rounded-full font-semibold hover:bg-gray-300 inline-block mt-4"
                        >
                            Shop Now
                        </Link>
                    </div>
                </motion.section>

                {/* Products Section */}
                <motion.section
                    id="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="min-h-screen flex items-center justify-center bg-gray-50 py-20"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl  font-bold mb-6 text-center text-gray-800">Featured Products</h2>
                        {products.length === 0 ? (
                            <p className="text-gray-700 text-center">No products available right now.</p>
                        ) : (
                            <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-6">
                                {products.slice(0, 3).map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <h3 className="text-xl text-gray-800 font-semibold mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 mb-2">{product.description}</p>
                                        <p className="font-bold text-indigo-600">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Testimonials Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-20"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center text-white">What Our Customers Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    "E-Store has the best selection of gadgets. The customer service is amazing!"
                                </p>
                                <h3 className="mt-6 text-gray-800 font-bold">- John D.</h3>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    "I love my new 4K TV. The shopping experience was smooth and hassle-free."
                                </p>
                                <h3 className="mt-6 text-gray-800 font-bold">- Sarah K.</h3>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    "Fast delivery, great prices, and top-notch products. Highly recommend!"
                                </p>
                                <h3 className="mt-6 text-gray-800 font-bold">- Mike P.</h3>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const client = createApolloClient();
    const { data } = await client.query({ query: GET_PRODUCTS });
    return {
        props: {
            products: data.getProducts,
        },
    };
};