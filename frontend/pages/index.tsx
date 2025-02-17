import { GetServerSideProps } from "next";
import { createApolloClient } from "../src/app/services/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


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
    const featuredProducts = products.slice(0, 7);

    return (
        <div className="min-h-screen min-w-full bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-800 dark:via-gray-900 dark:to-black transition-colors duration-500 flex flex-col">
            <div className="w-full">
                <div className="container mx-auto">
                    <h1 className="text-5xl flex justify-center font-extrabold mb-4">Welcome to an AI-Powered E-Store</h1>
                    <p className="text-lg mb-6">
                        Your one-stop shop for the latest and greatest in electronics powered by AI.
                    </p>
                    {/* Top Featured Products Section */}
                    <motion.section
                        id="products"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="flex items-center justify-center bg-gray-50 py-20"
                    >
                        <div className="flex items-center justify-center">
                            <div className="container mx-auto px-4">
                                <h2 className="text-3xl font-bold mb-6 text-center">Top Featured Products</h2>
                                {featuredProducts.length === 0 ? (
                                    <p className="text-gray-700 text-center">No products available right now.</p>
                                ) : (
                                    <Grid container spacing={5} justifyContent="center">
                                        {featuredProducts.map((product) => (
                                            <Grid component="div" xs={12} sm={6} md={3} key={product.id}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 1 }}
                                                    className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                                                >
                                                    <Typography variant="h6" className="text-xl font-semibold mb-2">
                                                        <p>{product.name}</p>
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-600 mb-2">
                                                        {product.description}
                                                    </Typography>
                                                    <Typography variant="h5" className="font-bold text-indigo-600">
                                                        ${product.price.toFixed(2)}
                                                    </Typography>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </div>
                        </div>
                    </motion.section>
                    <div className="text-3xl font-bold mb-6 text-center">

                        <Link
                            href="/products"
                            className="px-4 py-3 btn-primary rounded-full font-semibold hover:bg-gray-900 inline-block mt-4"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Testimonials Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className=" flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center ">What Our Customers Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    &quot;E-Store has the best selection of gadgets. The customer service is amazing!&quot;
                                </p>
                                <h3 className="mt-6  font-bold">- John D.</h3>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    &quot;I love my new 4K TV. The shopping experience was smooth and hassle-free.&quot;
                                </p>
                                <h3 className="mt-6  font-bold">- Sarah K.</h3>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white shadow-lg rounded-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <p className="text-gray-700 italic text-lg">
                                    &quot;Fast delivery, great prices, and top-notch products. Highly recommend!&quot;
                                </p>
                                <h3 className="mt-6  font-bold">- Mike P.</h3>
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