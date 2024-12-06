import { Product } from "../../models/Product";
import { hasRole } from "../../utils/auth";
export const productResolvers = {

    Query: {
        getProducts: async () => await Product.find(),
        getProduct: async (_: any, { id }: { id: string }) =>
            await Product.findById(id),
    },

    Mutation: {
        // aaplied middleware hasRole to protect the resolver
        addProduct: hasRole('admin', async (_: any, { product }: { product: any }) => {
            const newProduct = new Product(product);
            return await newProduct.save();
        }),

        // only admin can delete a product
        deleteProduct: hasRole('admin', async (_: any, { id }: { id: string }) => {
            await Product.findByIdAndDelete(id);
            return 'Product Deleted';
        }),

        // only admin can update a product
        updateProduct: hasRole('admin', async (_: any, { id, product }: { id: string, product: any }) => {
            return await Product.findByIdAndUpdate(id, product, { new: true });
        }),
    }
}