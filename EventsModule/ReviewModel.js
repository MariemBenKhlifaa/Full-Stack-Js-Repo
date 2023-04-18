var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Review=new Schema({
    
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "event",
        },
        username: {
          type: String,
          required: true,
        },
        reviewText: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
          default: 0,
        },
      },
      { timestamps: true }
   
)
module.exports=mongoose.model("review",Review)
