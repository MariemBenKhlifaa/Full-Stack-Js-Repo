//var user=require("./userModel")
const jwt=require('jsonwebtoken');
const userModel = require("../userModel");
const authentifaction=async(req,res,next)=>{
    try{
       // const header=req.headers['authorization'].replace('Bearer ', '');
      // console.log(req.headers.cookie.split("=")[1])
       const header=req.headers.cookie.split("=")[1]
       console.log(header)
     //  const header=cook.split("=")[1]
       // console.log(header);
       
        const decodedtoken = jwt.verify(header,'mykey');
        console.log(decodedtoken)
        const userr=await userModel.findOne({username:decodedtoken.username})
    
       console.log(userr)
        if(!userr) throw new Error();


       // console.log(header)
        next();
    }
    catch(e){
        res.status(401).send('merci de vous authentifier')
    }
}
module.exports= authentifaction;