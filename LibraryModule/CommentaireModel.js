var mongoose=require("mongoose")
var Schema=mongoose.Schema
var User=require("../userModule/userModel")
var Commentaire=new Schema({
    description:String,
    dateEnvoi : Date,
    Libraryid:String,
   userid:{
    type: mongoose.Types.ObjectId,
    ref:"user"
   },
   User:{
    type: mongoose.Types.ObjectId,
    ref:"user"
   },
 
})
module.exports=mongoose.model("commentaire",Commentaire)