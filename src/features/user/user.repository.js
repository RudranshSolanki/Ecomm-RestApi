import mongoose from "mongoose";

import { getDB } from "../../config/mongodb.js";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model('User',userSchema)

export class UserRepository{
    async signUp(user)
    {
        // using mongoose
        try{
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err)
        {
            throw new Error("something went wrong");
        }
        // using mongodb
        // try{
        //     const db = getDB();
        //     const collection = db.collection('users');
        //     await collection.insertOne(user);
        //     return user;
        // }
        // catch(err){
        //     throw new Error("something went wrong");
        // }
    }

    async singIn(email,password){
        
    }
    async validEmail(email){
        //using mongoose
        try
        {
            return await UserModel.findOne({email});
        }
        catch(err)
        {
            throw new Error("somethhing went wrong");
        }

        // using mongo db
        // try{
        //     const db = getDB(); //get the database,
        //     const collection = db.collection('users');
        //     return await collection.findOne({email});
            
        // }
        // catch(err)
        // {
        //     throw new Error("somethhing went wrong");
        // }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection('users');
            return await collection.find();
        }
        catch(err){
            throw new Error("Something went wrong!");
        }
    }


    async resetPassword(userId,newpass){
        try{
            const user = await UserModel.findById(userId);
            if(user){
                user.password = newpass;
                user.save();
            }
            else{
                throw new Error('User Not Found');
            }
        }
        catch(err){
            console.log(err);
            throw new Error('Something wennt wrong while reseting the password')
        }
    }
}