var express = require('express');
var likeEvent = require ("./LikeEventModel")
var Event = require ("./EventModel")
var User =require ("../userModule/userModel")

const incrementLikes= (ide)=>
{return async  ()=>{

try {
  const updatedEvent = await Event.findByIdAndUpdate(
 ide ,
    { $inc: { nbLikes: 1 } },
    { new: true }
  );
  console.log(updatedEvent);
 
} catch (error) {
  console.error("Error incrementing likes:", error);
  console.log(error);
  

}
}}

const addLIKE= (ide,idu)=> {return async  ()=>{
    const eventt= await Event.findById(ide);
    const userr= await User.findById(idu);

       const like = new likeEvent({
         // user: req.body.user,
          user:userr,
          event:eventt,
          status:true
         }); 
         like.save().then((obj,err)=>{
           if(err){console.error(err)}
           else{console.log(obj)}
         })
      
     } }


      /*async function delLike(req,res,next)
      {           
      likeEvent.find({_id:req.params.id},(err,docs)=>{
      console.log(docs)
      }).deleteOne((err,obj)=>{
     if(err){console.error(err)}
     else{
     console.log("element supprimeé")
      }
     res.end(obj)
     })}  */  

     async function getlike(req,res,next){

        likeEvent.find((err,obj)=>{
           if(err){console.error(err);}
           console.log(obj)
           res.json(obj)
          })
               }
         
 async function fasakh(req,res,next){
  try {
    await likeEvent.deleteMany({});
    res.status(200).send('Tous les documents ont été supprimés avec succès');

  } catch (err) {
    
    next(err);
    
  }
  res.end()
   }
                 

module.exports={addLIKE:addLIKE,getlike,fasakh}