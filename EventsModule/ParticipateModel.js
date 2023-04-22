var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Participate=new Schema({
    
  date:Date,
  etat:String,
  horaire:String,

        userId: {
         
          type: mongoose.Types.ObjectId,
           ref:"user"
        },
        userEmail: {
          type: String,
        
        },
        eventName: {
           // type: String,
           // required: true,
           type: mongoose.Types.ObjectId,
           ref:"event"
          
        },
        fullName: {
          type: String,
          required: true,
        },
        guestSize: {
            type: Number,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        participateAt: {
            type: Date,
            required: true,
        },
          

     
      },
      { timestamps: true }
   
)
module.exports=mongoose.model("participate",Participate)
