import { Cart } from "../../models/Cart";
import { Types } from "mongoose";

interface CartItem {
    quantity: number;
    product: Types.ObjectId;
}
interface ICart extends Document {
    user: Types.ObjectId;
    items: CartItem[];
    save(): Promise<ICart>;
}

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
        addToCart: async (_: any, { productId, quantity }: { productId: Types.ObjectId, quantity: number }, context: { user?: { id: string } }): Promise<ICart | null> => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            let cart = await Cart.findOne({ user: context.user.id }) as ICart;
            if (!cart) {
                let cart = new Cart({
                    user: context.user.id,
                    items: [],
                });
                await cart.save();
            }
            const productIndex = cart.items.findIndex((item: any) => item.product.equals(productId));
            if (productIndex !== -1) {
                cart.items[productIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
            return cart;
        },
    }
};
