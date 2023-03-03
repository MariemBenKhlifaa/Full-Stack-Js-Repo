const jwt=require('jsonwebtoken');
const userModel = require("../userModel");
const refreshToken = async (req, res, next) => {
    const header=req.headers.cookie.split("=")[1];
  if (!header) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  const decodedtoken = jwt.verify(header,'mykey');
  console.log(decodedtoken)
  const userr= await userModel.findOne({username:decodedtoken.username})
    if (!userr) {
     
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${userr._id}`);
    req.cookies[`${userr._id}`] = "";

    const token = jwt.sign({id:userr._id,role:userr.role,username:userr.username}, 'mykey', {
      expiresIn: "1h",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(userr.id), token, {
      path: "/",
      expires:new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = userr._id;
    next();
  
};
  
  module.exports=refreshToken;