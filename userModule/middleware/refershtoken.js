const jwt = require("jsonwebtoken");
const userModel = require("../userModel");
const refreshToken = async (req, res, next) => {
  //const cookies = req.headers.cookie;
  const prevToken = req.cookies.token;
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie("token");
    req.cookies["token"] = "";

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        pwd: user.pwd,
        email: userexisting.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    console.log("Regenerated Token\n", token);

    res.cookie("token", token, {
      path: "*.onrender.com",
      expires: new Date(Date.now() + 1000 * 60 * 60), // 30 min
      sameSite: "lax",
    });
    // console.log(us)

    //req.id = user._id;
    next();
  });
};

module.exports = refreshToken;
