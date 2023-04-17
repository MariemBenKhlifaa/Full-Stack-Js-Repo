var express = require("express");
var router = express.Router();
var service = require("./CourseService");

router.post("/addCourse", service.addCourse);
router.put("/updateCourse/:id", service.updateCourse);
router.get("/listCourses", service.listCourses);
router.delete("/deleteCourse/:id", service.deleteCourse);
router.get("/getOneCourse/:id", service.getOneCourse);
router.get("/search/:title", service.searchCourse);


module.exports = router;
