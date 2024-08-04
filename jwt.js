const jwt = require("jsonwebtoken");


const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({message: "Invalid token"});
  }
    ///Extracting the token from the request header

    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized",});
    }       

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Attach informaiton to user
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({message: "Invalid token"});
    }
};  

///Generating JWT
const generateToken = (user) => {   

    return jwt.sign(user, process.env.JWT_SECRET,
         { expiresIn: 30000 }
    );

}
        
module.exports={jwtAuthMiddleware, generateToken};