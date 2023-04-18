var express = require('express');
var router = express.Router();
const { authentifaction} = require("../userModule/middleware/auth");
var service=require("./ParticipateService");
var refreshToken = require("../userModule/middleware/refershtoken");


router.post("/ad",authentifaction,service.createParticipation,refreshToken)
router.post("/aad/:ide",service.addpart)

router.get("/:id",authentifaction,service.getParticipation)
router.get("/",service.getParticipations)
router.get("/delpart/:id",service.delpart)



module.exports = router;