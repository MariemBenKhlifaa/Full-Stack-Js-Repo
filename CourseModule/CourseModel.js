var mongoose = require("mongoose");
const LessonModel = require("./LessonModel");
var Schema = mongoose.Schema;

var Course = new Schema({
  title: String,
  description: String,
  level: String,
  category: String,
  duration: { type: Number, default: 0 },
  img: String,
  lessons: [LessonModel.schema],
});

module.exports = mongoose.model("course", Course);
