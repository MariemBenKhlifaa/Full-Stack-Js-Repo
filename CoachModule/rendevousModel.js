var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RendezVous = new Schema({
   date:Date,
   etat:String,
   tel:String,
   patientid:{
      type: mongoose.Types.ObjectId,
      ref:"user"
   },
   userid:{
    type: mongoose.Types.ObjectId,
    ref:"user"
   }
   
});
module.exports = mongoose.model("rendeVous", RendezVous);
