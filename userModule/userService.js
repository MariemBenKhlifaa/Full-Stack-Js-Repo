var user = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret_key = "mykey";
const {OAuth2Client} = require('google-auth-library');
const {CLIENT_URL} = process.env
const client = new OAuth2Client(process.env.CLIENT_ID)
const authentifaction = require("../userModule/middleware/auth");
var usertodelete;
async function add(req, res, next) {
  newuser = new user({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    pwd: bcrypt.hashSync(req.body.pwd),
    role: req.params.role,
  });
  userexistant = await user.findOne({ username: req.body.username });

  if (userexistant == null) {
    newuser.save();
  } else {
    console.log("mawjoud");
  }
  console.log(userexistant);
  res.end();
}
async function login(req, res, next) {
  const pwd = req.body.pwd;
  try {
    (userexisting = await user.findOne({ username: req.body.username })),
      (err, userr) => {
        if (err) {
          console.error(err);
        }
      };
  } catch (err) {
    return new Error(err);
  }
  if (userexisting == null) {
    return res.status(400).json({ message: "user inexistant" });
  }
  console.log(userexisting.pwd);
  const comparepwd = bcrypt.compareSync(pwd, userexisting.pwd);
  if (comparepwd == false) {
    return res.status(400).json({ message: "mot de passe incorrect" });
  }

  const token = jwt.sign(
    {
      id: userexisting._id,
      role: userexisting.role,
      username: userexisting.username,
      name: userexisting.name,
      email: userexisting.email,
      pwd: userexisting.pwd,
      lastname: userexisting.lastname,
    },
    jwt_secret_key,
    { expiresIn: "1hr" }
  );

  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "succefully de login", userexisting, token });
  // console.log(userexisting)
  res.end();
}

async function verifytoken(req, res, next) {
  const header = req.headers["authorization"];
  console.log(header);
  res.end();
}
list = (req, res, next) => {
  user.find({ name: req.params.name }, (err, docs) => {
    console.log(docs);
    if (err) {
      console.error(err);
    } else res.json(docs);
  });
};
async function deleteuser(req, res, next) {
  user
    .find({ name: req.params.name }, (err, docs) => {
      console.log(docs);
    })
    .deleteOne((err, obj) => {
      if (err) {
        console.error(err);
      } else {
        console.log("element supprimeé");
      }

      res.end(obj);
    });
}
async function listuser(req, res, next) {
  user.find((err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}
async function update(req, res, next) {
  user.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      name: req.body.name,
      lastname: req.body.lastname,
      pwd: bcrypt.hashSync(req.body.pwd),
      role: req.body.role,
    },
    { new: true }
  );
  res.end();
}

async function googlelogin(req, res, next) {

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  try {
    const { tokenId } = req.body;
    
    console.log(tokenId)
    const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });

    const { email_verified, email, name, picture } = verify.payload;
    const pwd = email + process.env.GOOGLE_SECRET;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pwd, salt);

    if (!email_verified) {
      return res.status(400).json({ msg: "Email verification failed." });
    }

    const User = await user.findOne({ email });
    console.log(User)

    if (User) {
      let isMatch = await bcrypt.compare(pwd, User.pwd);

      if (!isMatch) {
        return res.status(404).json({
          success: false,
          error: "Password is incorrect"
        });
      }

      const token = sendToken({ _id: User._id });

      res.cookie('refreshtoken', token, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
      });

      res.status(201).json({
        success: true,
        token: token
      });
    } else {
      const newUser = new user({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        pwd: bcrypt.hashSync(req.body.pwd),
        role: req.params.role
      });

      await newUser.save();

      const token = sendToken({ _id: newUser._id });

      res.cookie('refreshtoken', token, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
      });

      res.status(201).json({
        success: true,
        token: token
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  add,
  list,
  deleteuser: deleteuser,
  login: login,
  verifytoken: verifytoken,
  listuser: listuser,
  update: update,
  googlelogin:googlelogin,
};
