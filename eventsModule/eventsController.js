var express = require('express');
var router = express.Router();
var service=require("./eventsService");


router.post("/addev",service.addev)
router.put("/updateev/:id",service.updateev)
router.get("/listev",service.listev)
//router.get("/listoneev/:id",service.listoneev)
router.get("/deleteev/:id",service.deleteev)



module.exports = router;