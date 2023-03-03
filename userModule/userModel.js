var mongoose=require("mongoose")
var Schema=mongoose.Schema

var User=new Schema({
    name:String,
    lastname:String,
    email:String,
    username:String,
    pwd:String,
    role:{

        type:String,
        default:"user",
        enum:["admin","superadmin","user"]

    }
})
module.exports=mongoose.model("user",User)