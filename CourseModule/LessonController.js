var express = require("express");
var router = express.Router();
var service = require("./LessonService");

router.post("/addl", service.addL);
router.put("/updatel/:id", service.updateL);
router.get("/listL/:courseId", service.listL);
router.delete("/deleteL/:id", service.deleteL);
router.get("/getOneL/:id", service.getOneL);

module.exports = router;
