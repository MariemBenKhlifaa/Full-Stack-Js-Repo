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
router.get("/show/:name",refreshToken,authentifaction,permission("admin"),service.list)
router.get("/delete/:name",authentifaction,permission("admin"),service.deleteuser)
router.post("/login",service.login)
router.get("/veriftoken",verifytoken)
router.get("/refresh",refreshToken,authentifaction)
router.get("/listuser",authentifaction,service.listuser)
router.post("/updateuser/:id",authentifaction,service.update)
module.exports = router;