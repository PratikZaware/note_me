const jwt = require('jsonwebtoken');
const JWT_SECRET = "SECRETHere@";


const fetchuser = (req,res,next) =>{
    // get user from jwt token and add it to req object
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error : "Authenticate user using valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
    } catch (error) {
        res.status(401).send({error : "Authenticate user using valid token"})
    }
    
}

module.exports = fetchuser;