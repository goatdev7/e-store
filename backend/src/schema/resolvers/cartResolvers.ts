// updated the cart resolvers to match the new schema
import { Cart } from "../../models/Cart";
import { Types } from "mongoose";

export const cartResolvers = {
    Query: {
        getCart: async (_: any, __: any, { user }: { user?: { id: string } }) => {
            if (!user) {
                throw new Error("Not authenticated");
            }

            try {
                const cart = await Cart.findOne({ user: user.id })
                    .populate({
                        path: 'items.product',
                        model: 'Product',
                        select: 'name description price quantity'
                    })
                    .populate('user', 'firstName lastName username email role');

                if (!cart) {
                    // Return empty cart structure if no cart exists
                    return {
                        id: null,
                        user: user,
                        items: []
                    };
                }

                return {
                    id: cart._id,
                    user: cart.user,
                    items: cart.items
                };
            } catch (error) {
                throw new Error("Failed to fetch cart");
            }
        }
    },

    Mutation: {
        addToCart: async (_: any, 
            { productId, quantity }: { productId: string; quantity: number }, 
            { user }: { user?: { id: string } }
        ) => {
            if (!user) {
                throw new Error("Not authenticated");
            }

            try {
                let cart = await Cart.findOne({ user: user.id });

                if (!cart) {
                    cart = await Cart.create({
                        user: user.id,
                        items: [{
                            product: new Types.ObjectId(productId),
                            quantity
                        }]
                    });
                } else {
                    const existingItemIndex = cart.items.findIndex(
                        item => item.product.toString() === productId
                    );

                    if (existingItemIndex > -1) {
                        cart.items[existingItemIndex].quantity += quantity;
                    } else {
                        cart.items.push({
                            product: new Types.ObjectId(productId),
                            quantity
                        });
                    }
                    await cart.save();
                }

                // Return fully populated cart
                return await Cart.findById(cart._id)
                    .populate({
                        path: 'items.product',
                        model: 'Product',
                        select: 'name description price quantity'
                    })
                    .populate('user', 'firstName lastName username email role');
            } catch (error) {
                throw new Error("Failed to add item to cart");
            }
        },

        updateCartItem: async (_: any, 
            { productId, quantity }: { productId: string; quantity: number },
            { user }: { user?: { id: string } }
        ) => {
            if (!user) {
                throw new Error("Not authenticated");
            }

            try {
                const cart = await Cart.findOne({ user: user.id });
                if (!cart) {
                    throw new Error("Cart not found");
                }

                const itemIndex = cart.items.findIndex(
                    item => item.product.toString() === productId
                );

                if (itemIndex === -1) {
                    throw new Error("Item not found in cart");
                }

                cart.items[itemIndex].quantity = quantity;
                await cart.save();

                // Return fully populated cart
                return await Cart.findById(cart._id)
                    .populate({
                        path: 'items.product',
                        model: 'Product',
                        select: 'name description price quantity'
                    })
                    .populate('user', 'firstName lastName username email role');
            } catch (error) {
                throw new Error("Failed to update cart item");
            }
        },

        removeFromCart: async (_: any, 
            { productId }: { productId: string },
            { user }: { user?: { id: string } }
        ) => {
            if (!user) {
                throw new Error("Not authenticated");
            }

            try {
                const cart = await Cart.findOne({ user: user.id });
                if (!cart) {
                    throw new Error("Cart not found");
                }

                cart.items = cart.items.filter(
                    item => item.product.toString() !== productId
                );
                await cart.save();

                // Return fully populated cart
                return await Cart.findById(cart._id)
                    .populate({
                        path: 'items.product',
                        model: 'Product',
                        select: 'name description price quantity'
                    })
                    .populate('user', 'firstName lastName username email role');
            } catch (error) {
                throw new Error("Failed to remove item from cart");
            }
        }
    }
};