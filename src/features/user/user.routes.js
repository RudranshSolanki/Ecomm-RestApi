import express from 'express';
import { UserController } from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';


const userRouter = express.Router();

const userController = new UserController();


userRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res);
});
userRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res);
});
userRouter.put('/resetpassword',jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
});


export default userRouter;
