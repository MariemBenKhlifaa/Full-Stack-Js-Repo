var express = require('express');
var Events = require ("./eventsModel")

async function addev(req,res,next){

    newEvents= new Events(
     {
        Title:req.body.Title,
        Description:req.body.description,
        Location:req.body.Location,
        Organizer:req.body.Organizer,
        Photo:req.body.Photo,
        Date:req.body.Date
      
    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
        console.log(data)
        res.json(data)}
    })
    }
async function updateev(req,res,next)
 {
    Events.findByIdAndUpdate(req.params.id,{
      
        Title:req.body.Title,
        Description:req.body.description,
        Location:req.body.Location,
        Organizer:req.body.Organizer,
        Photo:req.body.Photo,
        Date:req.body.Date
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

    

async function listev(req,res,next)
  {
     Events.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}
// get single event
/*async function listoneev(req,res,next)
  {
     Events.findById((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}
*/
async function deleteev(req,res,next)
     {
       
       Events.find({_id:req.params.id},(err,docs)=>{
       console.log(docs)
       }).deleteOne((err,obj)=>{
         if(err){console.error(err)}
         else{
           console.log("element supprimeé")
         }
       
         res.end(obj)
       })
       
       
     }    




    
module.exports={addev,updateev,listev,deleteev}