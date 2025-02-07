import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader)
        return res.status(401).send("No authorization details found");
    const base64credentials = authHeader.replace('Basic','');
    console.log(base64credentials);
    const decodedCreds = Buffer.from(base64credentials,'base64').toString('utf8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');
    const user = UserModel.getAll().find(u=>u.email == creds[0] && u.password == creds[1]);
    if(user)
        next()
    else
        return res.status(401).send('Invalid creds');
}

export default basicAuthorizer