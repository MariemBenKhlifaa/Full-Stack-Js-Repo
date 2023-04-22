var express = require("express");
var router = express.Router();
var service = require("./LessonService");

router.post("/addLesson", service.addLesson);
router.put("/updateLesson/:id", service.updateLesson);
router.get("/listLessons/:courseId", service.listLessons);
router.delete("/deleteLesson/:id", service.deleteLesson);
router.get("/getOneLesson/:id", service.getOneLesson);
router.get("/searchLesson/:type", service.searchLesson);


module.exports = router;
