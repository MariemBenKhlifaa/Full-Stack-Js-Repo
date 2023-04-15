var express = require('express');
var router = express.Router();
var service=require("./AbbService");


router.post("/adda",service.addA)
router.put("/updatea/:id",service.updateA)
router.get("/lista",service.listA)
router.delete("/deletea/:id",service.deleteA)
router.get("/getOneA/:id",service.getOneA)
router.get("/stat/:Libraryid",service.stat)
router.get("/total",service.total)
router.get("/tri",service.tri)
router.get("/age",service.ageStats)

module.exports = router;

