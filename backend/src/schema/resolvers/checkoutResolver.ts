import mongoose from "mongoose";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";

export const checkoutResolver = {
    Mutation: {
        checkout: async (
            _: any,
            { items }: { items: { productId: string, quantity: number }[] },
            { user }: { user?: { id: string } }
        ) => {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                let total = 0;
                const orderItems = [];
                for (const item of items) {
                    const product = await Product.findById(item.productId).session(session);
                    if (!product) {
                        throw new Error("Product not found");
                    }

                    if (product.quantity === undefined || product.quantity === null || product.quantity < item.quantity) {
                        throw new Error("Insufficient stock for " + product.name);
                    }
                    const price = product.price;
                    total += price! * item.quantity;
                    orderItems.push({
                        product: product.id,
                        quantity: item.quantity,
                        price
                    });
                    product.quantity -= item.quantity;
                    await product.save({ session });
                }
                const newOrder = new Order({
                    user: user.id,
                    items: orderItems,
                    total,
                    status: 'Pending',
                });
                await newOrder.save({ session });
                await session.commitTransaction();
                session.endSession();
                return {
                    success: true,
                    message: "Checkout successfully",
                    order: newOrder
                };
            } catch (error: any) {
                await session.abortTransaction();
                session.endSession();
                return {
                    success: false,
                    message: error.message,
                    order: null
                };
            }
        }
    }
};