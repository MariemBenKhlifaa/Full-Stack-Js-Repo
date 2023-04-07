var mongoose=require("mongoose")
var Schema=mongoose.Schema
const User = require("../userModule/userModel");

var Abonnement=new Schema({
    nom:String,
    prenom: String,
    age:String,
    tel: String,
    city: String,
    email:String,
    image:String,
    Duration:String,
    Libraryid:String

    
   
})
module.exports=mongoose.model("abonnement",Abonnement)