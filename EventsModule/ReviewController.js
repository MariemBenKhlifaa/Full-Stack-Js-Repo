var express = require('express');
var router = express.Router();
var service=require("./ReviewService");

const { authentifaction} = require("../userModule/middleware/auth");


router.post("/:eventId",authentifaction,service.createreview)

module.exports = router;