var express = require('express');
const { verifytoken, listuser } = require('./userService');
var router = express.Router();
var service=require("./userService")
var authentifaction= require("./middleware/auth")
var permission=require("./middleware/isadmin")
var refreshToken=require("./middleware/refershtoken")
router.get('/', function(req, res, next) {
    res.send('hello user');
  });

router.post("/add/:role",service.add)
router.get("/show/:name",authentifaction,permission("admin"),service.list,refreshToken)
router.get("/delete/:name",authentifaction,permission("admin"),service.deleteuser,refreshToken)
router.post("/login",service.login)
router.get("/listuser",authentifaction,permission("admin"),service.listuser,refreshToken)
router.post("/updateuser/:id",authentifaction,service.update,refreshToken)
module.exports = router;
