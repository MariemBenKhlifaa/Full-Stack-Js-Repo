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


     

    
    module.exports={addC,updateC,listC}
