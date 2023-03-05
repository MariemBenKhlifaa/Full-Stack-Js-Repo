var express = require('express');
var Library = require ("./LibraryModel")
async function addL(req,res,next){

    newLibrary= new Library(
     {
        name:req.body.name,
        adresse:req.body.adresse,
        email:req.body.email,
        email:req.body.tel,
    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
        console.log(data)
        res.json(data)}
    })
    }
    async function updateL(req,res,next)
 {
    Library.findByIdAndUpdate(req.params.id,{
      
        name:req.body.name,
        adresse:req.body.adresse,
        email:req.body.email,
        tel:req.body.tel
         
    
      
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

    

    async function listL(req,res,next)
    {
     Library.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}

     async function deleteL(req,res,next)
{
  
  Library.find({name:req.params.name},(err,docs)=>{
  console.log(docs)
  }).deleteOne((err,obj)=>{
    if(err){console.error(err)}
    else{
      console.log("element supprimeé")
    }
  
    res.end(obj)
  })
  
  
}
     

    
    module.exports={addL,updateL,listL,deleteL}
