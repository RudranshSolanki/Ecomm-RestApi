import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export class ProductRepository{
    async add(newProduct){

        const db = getDB();
        const collection = db.collection('products');
        await collection.insertOne(newProduct);
        return newProduct;
        
    }

    async rateProduct(userId,productId,rating,name){
        const db = getDB();
        const collection = db.collection('products');
        await collection.updateOne({_id: new ObjectId(productId)},{
            $pull:{
                ratings:{userId: new ObjectId(userId)}
            }
        });

        const prod = await collection.updateOne({_id:new ObjectId(productId)},{
            $push:{ratings:{userId: new ObjectId(userId),name:name,rating}}
        })
       
    }
    async getAll(){
        try{
        const db = getDB();
        const collection = db.collection('products');
        return await collection.find({}).toArray();
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }

    async get(id){
        const db = getDB();
        const collection = db.collection('products');
        const prod = await collection.findOne({id})
        return prod;
    }

    async filter(minPrice,maxPrice,category)
    {
        try{
            const db = getDB();
            const collection = db.collection('products');
            let filterExpression = {};
            if(minPrice)
                filterExpression.price =  {$gte: parseFloat(minPrice)};
            if(maxPrice)
                filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)};
            if(category){
                filterExpression.category = category
            }
            return await collection.find(filterExpression).toArray();
        }
        catch(err){
            throw new Error("filter is not workingn");
        }
    }

}