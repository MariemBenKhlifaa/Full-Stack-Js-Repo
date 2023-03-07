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
        Description:req.body.Description,
        Location:req.body.Location,
        Organizer:req.body.Organizer,
        Photo:req.body.Photo,
        Date:req.body.Date
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

//getAllEvents

async function listev(req,res,next)
  {
    //forpagination
    const page=parseInt(req.query.page);
    //console.log(page);
     Events.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     }).skip(page * 8).limit(8)}
// get single event
async function listoneev(req,res,next)
  {
    Events.findById({_id:req.params.id},(err,docs)=>{
      console.log(docs)
      })
      
        res.end()
        
      }

//search
async function searchbytitle(req,res,next)
  {
    Events.find({Title :  {'$regex': req.params.Title,$options:'$i'} },(err,docs)=>{
      console.log(docs)
      })
      
        res.end()
        
      }
/*
async function searchbytitle(req, res, next) {

 await Events.find({Title :  {'$regex': req.params.Title,$options:'$i'} },(err,docs)=>{
  console.log(docs)});
 return res.send();

  }*/

      
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




    
module.exports={addev,updateev,listev,deleteev,listoneev,searchbytitle}