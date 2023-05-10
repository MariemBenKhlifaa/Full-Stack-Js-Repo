var mongoose = require("mongoose");
const LessonModel = require("./LessonModel");
var Schema = mongoose.Schema;

var Course = new Schema({
  title: String,
  description: String,
  level: String,
  category: String,
  duration: Number,
  img: String,
  lessons: [LessonModel.schema],
});

Course.index({ title: "text" });
const courseModel = mongoose.model("course", Course);
//courseModel.createIndexes();

module.exports = courseModel;
