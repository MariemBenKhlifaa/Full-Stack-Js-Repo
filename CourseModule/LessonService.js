var express = require("express");
var Lesson = require("./LessonModel");
var Course = require("./CourseModel");
const fileUpload = require('express-fileupload');

async function addLFF(req, res, next) {
  const newLesson = new Lesson({
    number: req.body.number,
    type: req.body.type,
    content: req.body.content,
    courseId: req.body.courseId,
    //img: req.body.img.substring(req.body.img.lastIndexOf("\\") + 1),
  }).save((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      updateCourse(newLesson, data, req, res);
    }
  });
}

function updateCourse(newLesson, data, req, res) {
  Course.findById(req.body.courseId, (err, course) => {
    if (err) {
      res.status(500).json(err);
    } else {
      course.lessons.push(data._id);
      course.save((err, newCourse) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(data);
        }
      });
    }
  });
}

async function addL(req, res, next) {
  let newLesson;
  try {
    const data = new Lesson({
      number: req.body.number,
      type: req.body.type,
      content: req.body.content,
      courseId: req.body.courseId,
    });
    newLesson = await data.save();
    const course = await Course.findById(req.body.courseId);
    course.lessons.push(newLesson._id);
    const newCourse = await course.save();
    res.json(data);
  } catch (e) {
    res.status(500).json(e);
    if (newLesson) {
      newLesson.delete();
    }
  }
}

async function updateL(req, res, next) {
  Lesson.findByIdAndUpdate(
    req.params.id,
    {
      number: req.body.number,
      type: req.body.type,
      content: req.body.content,
    },
    { new: true },
    (obj) => {
      console.log(obj);
    }
  );
  res.end();
}

async function listL(req, res, next) {
  try {
    const course = await Course.findById(req.params.courseId);
    const lessons = await Lesson.find({ _id: course.lessons });
    res.json(lessons);
  } catch (e) {
    res.status(500).json(e);
  }
}

deleteL = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    const course = await Course.findByIdAndUpdate(lesson.courseId, {
      $pull: {
        lessons: {
          _id: lesson._id,
        },
      },
    });
    await lesson.remove();
    // course.lessons.splice(course.lessons.findIndex(a => a._id === lesson._id) , 1)
    res.status(200).json("lesson deleted");
  } catch (error) {
    res.json(error);
  }
};
async function getOneL(req, res, next) {
  Lesson.findById(req.params.id, (err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}

async function deleteL(req, res, next) {
  const id = req.params.id;
  try {
    await Lesson.deleteOne({ _id: id }); // delete the comment with the given ID
    res.sendStatus(204); // send a "no content" response if the comment was successfully deleted
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send a "server error" response if there was a problem deleting the comment
  }
}

module.exports = { addL, updateL, listL, deleteL, getOneL };
