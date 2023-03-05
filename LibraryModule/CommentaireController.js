var express = require('express');
var router = express.Router();
var service=require("./CommentaireService");


router.post("/addc",service.addC)
router.put("/updatec/:id",service.updateC)
router.get("/listc",service.listC)


module.exports = router;