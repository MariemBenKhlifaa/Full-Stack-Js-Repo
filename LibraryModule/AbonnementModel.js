var mongoose=require("mongoose")
var Schema=mongoose.Schema
const User = require("../userModule/userModel");

var Abonnement=new Schema({
    nom:String,
    prenom: String,
    age:Number,
    tel: String,
    city: String,
    email:String,
    image:String,
    Duration:String,
    Libraryid:String,
    userid:{
        type: mongoose.Types.ObjectId,
        ref:"user"
       },
       User:{
        type: mongoose.Types.ObjectId,
        ref:"user"
       }

    
   
})
module.exports=mongoose.model("abonnement",Abonnement)