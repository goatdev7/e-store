// import { GetServerSideProps } from "next";
// import { createApolloClient } from "@/app/services/client";
// import { GET_PRODUCTS } from "@/app/services/product";
// import Link from "next/link";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
// }

// interface ProductPageProps {
//   products: Product[];
// }

// export default function Products({ products }: ProductPageProps) {
//   return (
//     <div className="min-h-screen text-black bg-gray-50 py-10">
//       <div className="container mx-auto px-4 text-center">
//         <h1 className="text-3xl font-bold mb-6">All Products</h1>
//         {products.length === 0 ? (
//           <p className="text-gray-600">No products available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div key={product.id} className="bg-white rounded shadow p-4">
//                 <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//                 <p className="text-gray-600 mb-2">{product.description}</p>
//                 <p className="font-bold text-indigo-700">
//                   ${product.price.toFixed(2)}
//                 </p>
//                 <Link href={`/products/${product.id}`} className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   const client = createApolloClient();
//   const { data } = await client.query({ query: GET_PRODUCTS });
//   return {
//     props: {
//       products: data.getProducts,
//     }
//   };
// };

import { GetServerSideProps } from "next";
import { createApolloClient } from "@/app/services/client";
import { GET_PRODUCTS } from "@/app/services/product";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ProductPageProps {
  products: Product[];
}

export default function Products({ products }: ProductPageProps) {
  return (
    <div className="min-h-screen text-black bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        {products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="font-bold text-indigo-700 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  View Details
                </Link>
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
