var express = require("express");
const { verifytoken, listuser } = require("./userService");

var router = express.Router();
var service = require("./userService");
const { authentifaction, getPassword, forgotpassword, resetpassword, googlelogin } = require("./middleware/auth");
var permission = require("./middleware/isadmin");
var refreshToken = require("./middleware/refershtoken");

router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword/:token", resetpassword);
router.post("/getpassword/:email", getPassword);
router.post("/googlelogin", googlelogin);

router.post("/add/:role", service.add);
router.get("/show/:name", authentifaction, permission("admin"), service.list, refreshToken);
router.get("/delete/:id",service.deleteuser);
router.post("/login", service.login);
router.get("/listuser", service.listuser);
router.post("/updateuser/:id", service.update);
router.get("/logout", service.logout);
router.get("/userconnecte", authentifaction, service.getuserconnecte, refreshToken);
router.get("/refresh", authentifaction, service.refresh, refreshToken);
router.get("/blockuser/:id", service.blockuser);
router.post("/changerpwd/:username", service.changerpwd)
router.get("/getcoachclient",service.getcoachclient)


module.exports = router;
