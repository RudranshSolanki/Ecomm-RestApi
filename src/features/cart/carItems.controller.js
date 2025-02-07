import { CartRepository } from "./cart.repository.js";
import CartItem from "./cartItems.model.js";
import { ObjectId } from "mongodb";
export default class CartItemsCotroller{
    constructor(){
        this.cartRepository = new CartRepository();
    }
    async add(req,res){
         const{productId,quantity} = req.query;
         const userId = req.userId;
        const item = new CartItem(new ObjectId(productId),new ObjectId(userId),quantity);
        await this.cartRepository.add(item);
        res.status(201).send("Added in cart");
    }
    async get(req,res){
        const userId = req.userId;
        const cartItems =await this.cartRepository.get(userId);
        return res.status(200).send(cartItems);
    }
    async delete(req,res){
        const userId = req.userId;
        const cartId = req.params.id;
        const err =await this.cartRepository.delete(cartId);
        if(err)
            res.status(400).send('unable to delete');
        else
            res.status(200).send('deleted successfully');
    }
}