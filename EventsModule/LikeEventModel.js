var mongoose=require("mongoose")
const { number } = require("yup")
var Schema=mongoose.Schema

var likeEvent=new Schema({
    Event: {
        type: mongoose.Types.ObjectId,
           ref:"event"
    },
    user: {
        type: mongoose.Types.ObjectId,
           ref:"user"
    },
    status: {
        type: Boolean,
        required: true,
    }
})
module.exports=mongoose.model("likeEvent",likeEvent)
