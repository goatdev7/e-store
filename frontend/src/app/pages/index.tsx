import { GetServerSideProps } from "next";
import { createApolloClient } from "../services/client";
import { gql } from "@apollo/client";
// import ProductList from "./components/ProductList";

// query to fetch data from server
const GET_PRODUCTS = gql`
    query{
        getProducts {
            id
            name
            description
            price 
        }
    }
`;

// build a custom return type of products (power of typescript)
interface HomeProps {
    products: { id: string, name: string, description: string, price: number }[];
}

// home function to display the fetched data
export default function Home({ products }: HomeProps) {
    return (
        <div>
            <h1 className="welcome">Welcome to E-Store</h1>
            <p>Serving the Best</p>
            {/* <ProductList products={products} /> */}
        </div>
    );
}

// fuction to fetch data from server on each request (server-side-rendering)
export const getServerSideProps: GetServerSideProps = async () => {
    const client = createApolloClient();
    const { data } = await client.query({ query: GET_PRODUCTS });
    return {
        props: {
            products: data.getProducts
        }
    };
};