import { getDB } from "../../config/mongodb.js";

export class CartRepository{
    async add(item){
        const db = getDB();
        const collection = db.collection('cart');
        await collection.updateOne({productId: new ObjectId(item.productId),userId: new ObjectId(item.userId)},
        {$inc:{
            quantity: item.quantity
        }},
        {upsert: true})
        await collection.insertOne(item);
    }


    async delete(cartItemId){
        const db = getDB();
        const collection = db.collection('cart');
        const filter = {_id: new ObjectId(cartItemId)};
        await collection.deleteOne(filter);
    }

    async get(userId){
        const db = getDB();
        const collection = db.collection('cart');
        const filter = {userId: new ObjectId(userId)};
        return await collection.find(filter).toArray();
    }
}