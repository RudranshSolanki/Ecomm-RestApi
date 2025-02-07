import mongoose from "mongoose";



export const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    imageUrl: URL,
    category: String,
    price: Number,
    sizes: String,
    inStock: Number
})