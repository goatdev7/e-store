import { Order } from "../../models/Order";


export const orderResolver = {
    Mutation: {
        createOrder: async (_: any, { order }: any,
            { user }: { user?: { id: string } }
        ) => {
            if (!user) {
                throw new Error("Not authenticated");
            }

            const newOrder = new Order({
                user:user.id,
                items: order.items,
                total: order.total,
                status: 'Pending'
            });

            await newOrder.save();
            return newOrder;

        }
    }
};