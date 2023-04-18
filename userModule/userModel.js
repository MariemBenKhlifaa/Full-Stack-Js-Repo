var mongoose = require("mongoose");
var Commentaire=require("../LibraryModule/CommentaireModel")

var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  lastname: String,
  email: String,
  username: String,
  pwd: String,
  
  role: {
    type: String,
    default: "user",
    enum: ["admin", "superadmin", "user"],
  },
  isBlocked: { type: Object, default: { blocked: false } },
  commentaire:[
    {
     type:mongoose.Types.ObjectId,
     ref:"commentaire"
 
    }
   ],
   abonnement:[
    {
     type:mongoose.Types.ObjectId,
     ref:"abonnement"
 
    }
   ]
});
module.exports = mongoose.model("user", User);