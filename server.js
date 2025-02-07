import './env.js';
import express from 'express'
import cookieParser from 'cookie-parser';


import ProductRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartRouter from './src/features/cart/cartItems.routes.js';
import { connnectToMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';


const server = express();
server.use(cookieParser());



server.use((err,req,res,next)=>{
    res.status(503).send('something went wrong');
})


server.use(bodyParser.json());
server.use('/api/products',jwtAuth,ProductRouter);
server.use('/api/users',userRouter);
server.use('/api/cartItems',jwtAuth,cartRouter)
server.use('/api/order',jwtAuth,orderRouter);

server.get('/',(req,res)=>{
    res.send('welcome to ecomm api');
})


server.listen(3200,()=>{
    console.log("server is runnging at 3200");
    connectUsingMongoose();
});
