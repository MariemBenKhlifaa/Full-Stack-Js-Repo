var express = require("express");
var Course = require("./CourseModel");
async function addL(req, res, next) {
  newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    level: req.body.level,
    category: req.body.category,
    duration: req.body.duration,
    img: req.body.img.substring(req.body.img.lastIndexOf("\\") + 1),
  }).save((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
}
async function updateL(req, res, next) {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      category: req.body.category,
      duration: req.body.duration,
      img: req.body.img.substring(req.body.img.lastIndexOf("\\") + 1),
    },
    { new: true },
    (obj) => {
      console.log(obj);
    }
  );
  res.end();
}

async function listL(req, res, next) {
  Course.find((err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}

deleteL = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted !");
  } catch (error) {
    res.json(error);
  }
};
async function getOneL(req, res, next) {
  Course.findById(req.params.id, (err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}

async function getLessons(req, res, next) {
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
    await Course.deleteOne({ _id: id }); // delete the comment with the given ID
    res.sendStatus(204); // send a "no content" response if the comment was successfully deleted
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send a "server error" response if there was a problem deleting the comment
  }
}

module.exports = { addL, updateL, listL, deleteL, getOneL };
