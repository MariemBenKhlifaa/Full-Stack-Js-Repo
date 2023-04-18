var mongoose=require("mongoose")
var Schema=mongoose.Schema
var Commentaire=require("./CommentaireModel")
var Abonnement=require("./AbonnementModel")
var Library=new Schema({
    name:String,
    location:String,
    pays:String,
    email:String,
    tel:String,
    img:String,  
    commentaires:[Commentaire.schema],
    abonnements:[Abonnement.schema]
})
module.exports=mongoose.model("library",Library)
