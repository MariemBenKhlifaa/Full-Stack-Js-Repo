var express = require('express');
var router = express.Router();
var service=require("./eventsService");


router.post("/addev",service.addev)
router.put("/updateev/:id",service.updateev)
router.get("/listev",service.listev)
router.get("/deleteev/:id",service.deleteev)
router.get("/one/:id",service.listoneev)
router.get("/search",service.searchbytitle)






module.exports = router;