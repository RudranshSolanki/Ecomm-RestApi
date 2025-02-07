import mongoose from "mongoose";

const userType = ['seller','customer']

export const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String,unique:true},
    password: String,
    type: {type:String, enum: userType}
})