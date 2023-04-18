var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  lastname: String,
  email: String,
  username: String,
  pwd: String,
  image: String,
  newsLetter : {
    type : Boolean,
    default : true
},
  
  role: {
    type: String,
    default: "user",
    enum: ["admin", "superadmin", "user"],
  },
  isBlocked: { type: Object, default: { blocked: false } }
});
module.exports = mongoose.model("user", User);
