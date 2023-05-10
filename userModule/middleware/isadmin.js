const jwt = require("jsonwebtoken");
const userModel = require("../userModel");
const permission = (role) => {
  return async (req, res, next) => {
    try {
      const header = req.cookies.token;
      console.log(header);
      const decodedtoken = jwt.verify(header, process.env.JWT_SECRET);
      // const userr=await userModel.findOne({username:decodedtoken.username,role:})
      if (decodedtoken.role == role) {
        next();
      } else {
        res.status(401).send("vous n avez pas l acceees");
      }
    } catch (e) {
      res.status(401).send("vous n avez pas l acces");
    }
  };
};
module.exports = permission;
