var express = require('express');
var router = express.Router();
var service=require("./LibraryService");


router.post("/addl",service.addL)
router.put("/updatel/:id",service.updateL)
router.get("/listL",service.listL)
router.delete("deleteL/:id",service.deleteL)


module.exports = router;
