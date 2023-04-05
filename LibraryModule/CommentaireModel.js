var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Commentaire=new Schema({
    description:String,
    dateEnvoi : Date

   
})
module.exports=mongoose.model("commentaire",Commentaire)