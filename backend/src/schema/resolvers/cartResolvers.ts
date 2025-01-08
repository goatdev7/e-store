import { Cart } from "../../models/Cart";

export const cartResolvers = {
    Query: {
        getCart: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }

            const cart = await Cart.findOne({ user: context.user.id }).populate('items.product');
            return cart;
        }
    },

    Mutation: {
        addToCart: async (_: any, { productId, quantity }: { productId: string, quantity: number }, context: any) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            let cart = await Cart.findOne({ user: context.user.id });
            if (!cart) {
                cart = new Cart({ user: context.user.id, items: [] });
            }
            cart = cart || { items: [] };
            const productIndex = cart.items.findIndex((item: any) => item.product.equals(productId));
            if (productIndex !== undefined && productIndex !== -1) {
                cart.items[productIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
            return cart;
        },
    }
};
