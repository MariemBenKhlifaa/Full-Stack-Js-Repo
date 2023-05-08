var express = require('express');
var router = express.Router();
var service=require("./LibraryService");


router.post("/addl",service.addL)
router.put("/updatel/:id",service.updateL)
router.get("/listL",service.listL)
router.get("/listL2",service.listl2)
router.delete("/deleteL/:id",service.deleteL)
router.get("/getOneL/:id",service.getOneL)
router.get("/getbynom/:name",service.getbynom)


module.exports = router;