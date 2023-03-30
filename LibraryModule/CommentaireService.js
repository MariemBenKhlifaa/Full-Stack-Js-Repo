var express = require('express');
var Commentaire = require ("./CommentaireModel")

async function addC(req,res,next){

    newCommentaire= new Commentaire(
     {
        description:req.body.description
      
    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
        console.log(data)
        res.json(data)}
    })
    }
    async function updateC(req,res,next)
 {
    Commentaire.findByIdAndUpdate(req.params.id,{
      
        description:req.body.description,

    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

    

    async function listC(req,res,next)
    {
     Commentaire.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}


     async function deletec(req, res, next) {
    
    
        const id = req.params.id;
  try {
    await Commentaire.deleteOne({ _id: id }); // delete the comment with the given ID
    res.sendStatus(204); // send a "no content" response if the comment was successfully deleted
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send a "server error" response if there was a problem deleting the comment
  }
}

    
    module.exports={addC,updateC,listC,deletec}
