import { GetServerSideProps } from "next";
import { createApolloClient } from "../src/app/services/client";
import { gql } from "@apollo/client";
import Header from "@/app/components/header";

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

interface HomeProps {
    products: { id: string; name: string; description: string; price: number }[];
}

export default function Home({ products }: HomeProps) {
    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-800 dark:via-gray-900 dark:to-black transition-colors duration-500">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to E-Store</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Serving the Best</p>
            <div>

            <a
                href="#"
                className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
                Explore Products
            </a>
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
