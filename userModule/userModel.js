var mongoose = require("mongoose");
const { number } = require("yup");
var Schema = mongoose.Schema;


var User = new Schema({
  name: String,
  lastname: String,
  email: String,
  username: String,
  pwd: String,
  image: String,
  
  role: {
    type: String,
    default: "user",
    enum: ["admin", "superadmin", "user","coach"]
  },
  isBlocked: { type: Object, default: { blocked: false } },
  specialite:String,
  biographie:String,
  telephone:String,
  adresseCabinet:String,
  disponiblite:String,
  statavis:0,
  rendezVous:[
   {
    type:mongoose.Types.ObjectId,
    ref:"rendezVous"

   }
  ],
  avis:[
    {

      type:mongoose.Types.ObjectId,
      ref:"avis"
    }
  ],
  

});
module.exports = mongoose.model("user", User);
