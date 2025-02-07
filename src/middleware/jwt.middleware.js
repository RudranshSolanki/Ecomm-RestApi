import jwt from 'jsonwebtoken'

const jwtAuth=(req,res,next)=>{
    // read the token
    const {jwtToken} = req.cookies;
    if(!jwtToken)
        return res.status(401).send('unauthorized');
    
    //check token is valid
    try{
        const payload = jwt.verify(jwtToken,"QkyFD8VqVkTwDoyHYk85KbAF820DgPWb");
        console.log("first pay load");
        console.log(payload.userId);
        req.userId = payload.userId;
        req.userName = payload.userName;
    }
    catch(err)
    {
        return res.status(401).send('unauthorized');
    }
    next();
}

export default jwtAuth;