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
    const featuredProducts = products.slice(0, 6);

    return (
        <div className="min-h-screen bg-standard">
                <h1 className="text-3xl flex justify-center mb-4 font-lato">Welcome to an AI-Powered E-Store</h1>
                <p className="text-lg mb-6 text-center">
                    Your one-stop shop for the latest and greatest in electronics powered by AI.
                </p>

                {/* Top Featured Products Section */}
                <motion.section
                    id="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex items-center items-center justify-center py-10"
                >
                    <div className="container px-4 mb-6">
                        <h2 className="text-3xl font-bold mb-6 text-center">Top Featured Products</h2>
                        {featuredProducts.length === 0 ? (
                            <p className="text-gray-700 text-center">No products available right now.</p>
                        ) : (
                            <Grid container rowGap={5} columnGap={5} justifyContent="center" marginTop={6} >
                                {featuredProducts.map((product) => (
                                    <Grid component="div" xs={12} sm={6} md={3} lg={3} key={product.id} className="bg-white shadow-lg rounded-lg space-x-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.5 }
                                              }}
                                            style={{ transformStyle: 'preserve-3d' }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="rounded-lg shadow-md py-8 p-6 hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <Link href={`/products/${product.id}`} className="hover:no-underline cursor:pointer" >
                                            <Typography variant="h6" className="text-xl font-semibold mb-2">
                                                <p>{product.name}</p>
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 mb-2 truncate">
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h5" className="font-bold text-indigo-600">
                                                ${product.price.toFixed(2)}
                                            </Typography>
                                            </Link>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                    </div>
                </motion.section>
                <div className="mb-6 text-3xl font-bold text-center">
                    <Link
                        href="/products"
                        className="btn-primary"
                    >
                        Shop Now
                    </Link>
                </div>

                {/* Testimonials Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className=" flex items-center justify-center"
                >
                    <div className="container mx-auto py-10 px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center ">What Our Customers Say</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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