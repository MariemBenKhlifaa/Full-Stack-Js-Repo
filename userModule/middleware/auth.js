//var user=require("./userModel")
const jwt = require("jsonwebtoken");
const userModel = require("../userModel");
const sendMail = require("../../utils/sendEmail");
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_URL } = process.env;
const client = new OAuth2Client(process.env.CLIENT_ID);
var session;

const authentifaction = async (req, res, next) => {
  try {
    const header = req.cookies.token;
    const decodedtoken = jwt.verify(header, process.env.JWT_SECRET);
    const userr = await userModel.findOne({ username: decodedtoken.username });
    if (!userr || !req.session.sessionId) throw new Error();
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
      const url = `${CLIENT_URL}/resetpassword/${token}`;
      sendMail("elaa.boulifi@esprit.tn", url, "Click here to reset your password");
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

async function googlelogin(req, res, next) {
  try {
    const { token } = req.body;
    const verify = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { email_verified, email, given_name, family_name, name } = verify.payload;
    const pwd = email + process.env.CLIENT_SECRET;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pwd, salt);
    console.log(verify.payload, "--------------------------");
    if (!email_verified) {
      return res.status(400).json({ msg: "Email verification failed." });
    }

    const User = await userModel.findOne({ email });
    console.log(User);

    if (User) {
      let isMatch;
      if (passwordHash == User.pwd) {
        isMatch = true;
      }
      if (isMatch == false) {
        res.status(404).json({
          success: false,
          error: "password is incorrect",
        });
      }

      const token = sendToken({ _id: User._id });

      res.cookie("refreshtoken", token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      res.status(201).json({
        success: true,
        token: token,
      });
    } else {
      const newUser = new userModel({
        name: given_name,
        lastname: family_name,
        username: name,
        email: email,
        pwd: passwordHash,
      });

      await newUser.save();

      const token = sendToken({ _id: newUser._id });

      res.cookie("refreshtoken", token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      res.status(201).json({
        success: true,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  authentifaction,
  resetpassword,
  forgotpassword,
  getPassword,
  googlelogin,
};
