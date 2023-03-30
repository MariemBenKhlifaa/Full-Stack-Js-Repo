var mongoose=require("mongoose")
var Schema=mongoose.Schema
const User = require("../userModule/userModel");

var Abonnement=new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    age: { type: Number, required: true },
    tel: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    image:String,

      library_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Library",
      }
    
   
})
module.exports=mongoose.model("abonnement",Abonnement)