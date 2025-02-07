import { getDB } from "../../config/mongodb.js";
import { OrderModel } from "./order.model.js";
import { getClient } from "../../config/mongodb.js";
export default class OrderRepository{
    constructor(){
        this.collection = 'orders';
    }


    async placeOrder(userId){
        const client = getClient();
        const session = client.startSession();
        try{
            
            const db = getDB();
            session.startTransaction();
            // 1 get cartItems and calculate amoumt
            const items = await this.getTotalAmount(userId,session);
            const totalAmount = items.reduce((acc,item)=>acc+item.totalAmount);
            // 2 create and order record
            const newOrder = new OrderModel(new ObjectId(userId),totalAmount,new Date());
            await db.collection(this.collection).insertOne(newOrder,{session});
            // 3 reduce the stock
            for(let item of items){
                await db.collection('products').updateOne(
                    {_id:item.productId},
                    {$inc: {stock:-item.quantity}},{session}
                )
            }
            // 4 clear the cart items
            await db.collection('cartItems').deletMany(
                {userId: new ObjectId(userId)},{session}
            )
            session.commitTransactionn();
            session.endSession();
        }
        catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
        }
    }

    async getTotalAmount(userId,session){
        const db = getDB();

        const items = await db.collection('cartItems').aggregate([
            {
                $match: {userId: new ObjectId(userId)}
            },
            {
                $addField:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            }
        ],{session}).toArray();
        
        return items;
    }
}