var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Events=new Schema({
    Title:String,
    Description:String,
    Location:String,
    Organizer:String,
    Photo:String,
    Date:Date
   
})
module.exports=mongoose.model("events",Events)