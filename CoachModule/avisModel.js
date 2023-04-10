var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Avis = new Schema({
   nbravis:Number,
   idpatientavis:{
      type: mongoose.Types.ObjectId,
      ref:"user"
   },
   idcoachavis:{
    type: mongoose.Types.ObjectId,
    ref:"user"
   }
   
});
module.exports = mongoose.model("avis", Avis);
