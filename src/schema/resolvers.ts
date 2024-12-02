import { Product } from "../models/Product";


export const resolvers = {

    Query: {
        getProducts: async () => await Product.find(),
        getProduct: async (_:any, {id}: {id:string}) => 
            await Product.findById(id),
    },

    Mutation: {
        addProduct: async(_:any, {product} : {product:any}) =>{
            const newProduct = new Product(product);
            return await newProduct.save();
        },
        deleteProduct: async (_:any, {id}:{id:string}) =>{
            await Product.findByIdAndDelete(id);
            return 'Product Deleted';
        },
        updateProduct: async (_:any, {id, product}: {id:string, product:any})=>{
            return await Product.findByIdAndUpdate(id, product, {new:true});
        },
    }
}