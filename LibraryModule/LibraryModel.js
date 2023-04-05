var mongoose=require("mongoose")
var Schema=mongoose.Schema
var Commentaire=require("./CommentaireModel")
var Library=new Schema({
    name:String,
    adresse:String,
    pays:String,
    email:String,
    tel:String,
    img:String,
    
    Commentaire: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaire'}
    ]
})
module.exports=mongoose.model("library",Library)
