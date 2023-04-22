var express = require('express');
var router = express.Router();
var service=require("./CommentaireService");


router.post("/addc",service.addC)
router.put("/updatec/:id",service.updateC)
router.get("/listc/:Libraryid",service.listC)
router.delete("/deleteC/:id",service.deletec)
router.get("/listc",service.listc)
router.get("/getuserbyid/:id",service.getuserbyid)


module.exports = router;