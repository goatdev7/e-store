import { GetServerSideProps } from "next";
import { createApolloClient } from "@/app/services/client";
import { GET_PRODUCTS } from "@/app/services/product";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ProductPageProps {
  products: Product[];
}

export default function Products({ products }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                {product.imageUrl && (

                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-4 h-4 object-cover"
                    width={20}
                    height={20}
                    
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">
                    {product.description.slice(0, 80)}...
                  </p>
                  <p className="text-indigo-700 font-bold mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <Link href={`/products/${product.id}`} className="block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    
                      View Details
                    
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
