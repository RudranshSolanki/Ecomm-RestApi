import mongoose from "mongoose";


export const cartItemSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    quantity: Number
});