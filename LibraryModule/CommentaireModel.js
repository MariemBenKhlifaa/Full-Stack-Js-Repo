var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Commentaire=new Schema({
    description:String,
    dateEnvoi : Date,
    Libraryid:String
   
})
module.exports=mongoose.model("commentaire",Commentaire)