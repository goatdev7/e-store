import mongoose, {Schema, Document} from "mongoose";


interface ICartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItem[];
}

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
});

export const Cart = mongoose.model<ICart>('Cart', cartSchema);