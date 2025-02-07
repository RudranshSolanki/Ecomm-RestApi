import express from 'express';
import  CartItemsCotroller  from './carItems.controller.js';

 const cartRouter = express.Router();

 const cartCotroller = new CartItemsCotroller();

 cartRouter.post('/',(req,res)=>{
    cartCotroller.add(req,res)
 });
 cartRouter.get('/',(req,res)=>{
    cartCotroller.get(req,res)
 });
 cartRouter.delete('/:id',(req,res)=>{
    cartCotroller.delete(req,res);ß
 });
 export default cartRouter;