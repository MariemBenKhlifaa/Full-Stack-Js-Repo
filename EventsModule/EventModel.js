var mongoose=require("mongoose")
const { number } = require("yup")
var Schema=mongoose.Schema

var Event=new Schema({
    title:String,
    description:String,
    location:String,
    organizer:String,
    date:Date,
    img:String,
    nbLikes:Number,
    
    reviews: [
        {
          type: mongoose.Types.ObjectId,
          ref: "review",
        },
      ],
   
})
module.exports=mongoose.model("event",Event)
