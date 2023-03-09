var express = require("express");
var router = express.Router();
var service = require("./userService");
const {
  authentifaction,
  getPassword,
  forgotpassword,
  resetpassword,
  googlelogin,
} = require("./middleware/auth");
var permission = require("./middleware/isadmin");
var refreshToken = require("./middleware/refershtoken");

router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword/:token", resetpassword);
router.post("/getpassword/:email", getPassword);
router.post("/googlelogin", googlelogin);

router.get("/", function (req, res, next) {
  res.send("hello user");
});

router.post("/add/:role", service.add);
router.get(
  "/show/:name",
  authentifaction,
  permission("admin"),
  service.list,
  refreshToken
);
router.get(
  "/delete/:name",
  authentifaction,
  permission("admin"),
  service.deleteuser,
  refreshToken
);
router.post("/login", service.login);
router.get(
  "/listuser",
  authentifaction,
  permission("admin"),
  service.listuser,
  refreshToken
);
router.post("/updateuser/:id", authentifaction, service.update, refreshToken);
router.get("/logout", service.logout);
router.get("/home", service.homePage);

module.exports = router;
