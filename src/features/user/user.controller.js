import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from "./user.repository.js";
import { ObjectId } from "mongodb";
import { sendMail } from "../../config/mail.js";

export class UserController{
    constructor(){
        this.userRepository = new UserRepository();

    }
    async signUp(req,res){
        const{name,email,password,type} = req.body;
        const hashedPassword =await bcrypt.hash(password,10);
        const user =new UserModel(name,email,hashedPassword,type);
        const newuser = await this.userRepository.signUp(user);
        // sendMail(email,"successfully registered with SocioNetwork!!");
        res.status(201).send(newuser);
    }

    async signIn(req,res){
        const {email,password} = req.body;
        const validUser = await this.userRepository.validEmail(email);
        if(!validUser)
        {
            return res.status(400).send("user not found");
        }
        else{
            const result =await bcrypt.compare(password,validUser.password);
            if(!result)
                return res.status(400).send('invalid creds');
            else{
                console.log(validUser.name);
                const token = jwt.sign({userId: validUser._id,userName: validUser.name},"QkyFD8VqVkTwDoyHYk85KbAF820DgPWb",{
                    expiresIn: '1h',
                });
                //saving jwt token to cookie
                return res.status(200).cookie("jwtToken", token, { maxAge: 900000, httpOnly: false }).send(token);
            }
        }
        
    }


    async resetPassword(req,res,next){
        const {newPass} = req.body;
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(newPass,10);
        try{
            await this.userRepository.resetPassword(userId,hashedPassword);
            res.status(200).send('password is updated');
        }
        catch(err)
        {
            return res.status(400).send("something went wrong");
        }
    }

}