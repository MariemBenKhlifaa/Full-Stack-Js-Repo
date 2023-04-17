var express = require("express");
var Course = require("./CourseModel");
async function addCourse(req, res, next) {
  newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    level: req.body.level,
    category: req.body.category,
    duration: req.body.duration,
    img: req.body.img,
  }).save((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
}
async function updateCourse(req, res, next) {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      category: req.body.category,
      duration: req.body.duration,
      img: req.body.img,
    },
    { new: true },
    (obj) => {
      console.log(obj);
    }
  );
  res.end();
}

async function listCourses(req, res, next) {
  const query = req.query.sort;
  const courses = await Course.find().sort({ [query]: req.query.order });
  // courses.forEach((obj) => {
  //   console.log(obj);
  // });
  res.json(courses);
}

deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted !");
  } catch (error) {
    res.json(error);
  }
};
async function getOneCourse(req, res, next) {
  Course.findById(req.params.id, (err, obj) => {
    if (err) {
      console.error(err);
    }
    res.json(obj);
  });
}

async function searchCourse(req, res, next) {
  try {
    // const course = await Course.find({ $text: { $search: req.params.title } });
    const searchObj = { $regex: "^" + req.params.title, $options: "mi" };
    const course = await Course.find({ $or: [{ title: searchObj }, { category: searchObj }, { level: searchObj }] });
    res.json(course);
  } catch (e) {
    res.status(500).json(e);
  }
}

module.exports = { addCourse, updateCourse, listCourses, deleteCourse, getOneCourse, searchCourse };
