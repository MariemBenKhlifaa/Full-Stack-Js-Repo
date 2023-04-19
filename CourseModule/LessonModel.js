var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Lesson = new Schema({
  number: Number,
  type: String,
  content: String,
  courseId: String
});

module.exports = mongoose.model("lesson", Lesson);
