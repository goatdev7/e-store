import { GetServerSideProps } from "next";
import { createApolloClient } from "../src/app/services/client";
import { gql } from "@apollo/client";
import Header from "@/app/components/header";
import Link from "next/link";

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
    // Choose a featured product dynamically (if available)
    const featuredProduct = products.length > 0 ? products[Math.floor(Math.random() * products.length)] : null;

    return (
    // <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-800 dark:via-gray-900 dark:to-black transition-colors duration-500 flex flex-col">
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
    <section >
          <div className="container mx-auto">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to E-Store</h1>
            <p className="text-lg mb-6">
              Your one-stop shop for the latest and greatest in electronics.
            </p>
            {featuredProduct && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  Featured: {featuredProduct.name}
                </h2>
                <p className="text-md italic text-white/90">
                  {featuredProduct.description}
                </p>
                <p className="text-xl font-semibold mt-2">
                  ${featuredProduct.price.toFixed(2)}
                </p>
              </div>
            )}
            <Link href="#products"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 inline-block mt-4">
                Shop Now

            </Link>
          </div>
        </section>

        <section
          id="products"
          className="py-10 container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-700">No products available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded shadow p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="font-bold text-indigo-700">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </section>

    <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-700 italic">
                        "E-Store has the best selection of gadgets. The customer service is amazing!"
                    </p>
                    <h3 className="mt-4 font-bold">- John D.</h3>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-700 italic">
                        "I love my new 4K TV. The shopping experience was smooth and hassle-free."
                    </p>
                    <h3 className="mt-4 font-bold">- Sarah K.</h3>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-700 italic">
                        "Fast delivery, great prices, and top-notch products. Highly recommend!"
                    </p>
                    <h3 className="mt-4 font-bold">- Mike P.</h3>
                </div>
            </div>
        </div>
    </section>
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
