//var user=require("./userModel")
const jwt = require("jsonwebtoken");
const userModel = require("../userModel");
const sendMail = require("../../utils/sendEmail");
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcryptjs");

const { CLIENT_URL } = process.env;

const authentifaction = async (req, res, next) => {
  try {
    // const header=req.headers['authorization'].replace('Bearer ', '');
    // console.log(req.headers.cookie.split("=")[1])
    const header = req.cookies.token;
    console.log(header);
    //  const header=cook.split("=")[1]
    // console.log(header);

    const decodedtoken = jwt.verify(header, "mykey");
    console.log(decodedtoken);
    const userr = await userModel.findOne({ username: decodedtoken.username });

    console.log(userr);
    if (!userr) throw new Error();

    // console.log(header)
    next();
  } catch (e) {
    res.status(401).send("merci de vous authentifier");
  }
};
const sendToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const getPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const token = sendToken(user);

    res.cookie("refreshtoken", token, {
      httpOnly: true,
      path: "/users/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const forgotpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: true,
        message: "This mail does not exist!",
      });
    else {
      const token = sendToken({ id: user._id });
      console.log("aaa", token);
      const url = `${CLIENT_URL}/users/resetpassword/${token}`;
      sendMail("dorsaf.charfeddine@esprit.tn", url, "Rest Your password");
      res.status(200).json({
        url: url,
        success: true,
        message: "Re-send Une password, please check your email.",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const { pwd } = req.body;
    console.log("aaa", pwd);
    const passwordHash = await bcrypt.hash(pwd, 12);
    console.log(req.params);
    const decoded = jwt_decode(req.params["token"]);
    console.log(decoded.payload.id);

    await userModel.findOneAndUpdate(
      { _id: decoded.payload.id },
      {
        pwd: passwordHash,
      }
    );

    res.json({ message: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  authentifaction,
  resetpassword,
  forgotpassword,
  getPassword,
};
