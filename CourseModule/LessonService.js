var express = require("express");
var Lesson = require("./LessonModel");
var Course = require("./CourseModel");

// async function addLFF(req, res, next) {
//   const newLesson = new Lesson({
//     number: req.body.number,
//     type: req.body.type,
//     content: req.body.content,
//     courseId: req.body.courseId,
//   }).save((err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       updateCourse(newLesson, data, req, res);
//     }
//   });
// }

// function updateCourse(newLesson, data, req, res) {
//   Course.findById(req.body.courseId, (err, course) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       course.lessons.push(data._id);
//       course.save((err, newCourse) => {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.json(data);
//         }
//       });
//     }
//   });
// }

async function addLesson(req, res, next) {
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

async function updateLesson(req, res, next) {
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

async function listLessons(req, res, next) {
  try {
    const course = await Course.findById(req.params.courseId);
    const lessons = await Lesson.find({ _id: course.lessons });
    res.json(lessons);
  } catch (e) {
    res.status(500).json(e);
  }
}

deleteLesson = async (req, res, next) => {
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
async function getOneLesson(req, res, next) {
  Lesson.findById(req.params.id, (err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}

async function searchLesson(req, res, next) {
  try {
    // const course = await Course.find({ $text: { $search: req.params.title } });
    const lesson = await Lesson.find({ type: { $regex: req.params.type, $options: "i" } });
    res.json(lesson);
  } catch (e) {
    res.status(500).json(e);
  }
}

module.exports = { addLesson, updateLesson, listLessons, deleteLesson, getOneLesson, searchLesson };
