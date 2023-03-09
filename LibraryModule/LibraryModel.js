var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Library=new Schema({
    name:String,
    adresse:String,
    email:String,
    tel:String,
   
})
module.exports=mongoose.model("library",Library)