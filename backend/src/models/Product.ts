import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
});

export const Product = mongoose.model('Product', ProductSchema);