var express = require('express');
var router = express.Router();
var service=require("./EventService");


router.post("/addev",service.addev)
router.put("/updateev/:id",service.updateev)
router.get("/listev",service.listev)
router.get("/deleteev/:id",service.deleteev)
router.get("/one/:id",service.listoneev)
router.get("/search/:Title",service.searchbytitle)
router.get("/count",service.GetEventCount)
//router.post("/likeEvent/:event",service.likeEvent);
router.put("/inc/:id",service.incrementLikes);
router.put("/dec/:id",service.decrementLikes);

router.post("/likeeventt/:ide/:idu",service.likeeventt);
router.get("/dislikeev/:ide/:idu",service.dislikeeventt);


router.get("/rech/:title",service.getbynom)



router.get('/getch',service.getSubscribers);
router.put("/unsubscribeNewsLetter",service.unsubscribeNewsLetter)
router.post("/subscribe",service.subscribe)
router.post("/sms",service.sendSubscriptionSMS)
router.get('/getev',service.listev2);






module.exports = router;