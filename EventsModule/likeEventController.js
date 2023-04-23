var express = require('express');
var router = express.Router();
var service=require("./likeEventService");
var serviceev=require("./EventService")

router.post("/addLIKE/:ide/:idu",service.addLIKE)
router.get("/delLike/:idu/:ide",serviceev.dislikeeventt)
router.get("/getlike",service.getlike)
router.delete("/fasakh",service.fasakh)
router.get("/getlikeeventuser/:ide/:idu",serviceev.getlikebyuserevent)




module.exports = router;