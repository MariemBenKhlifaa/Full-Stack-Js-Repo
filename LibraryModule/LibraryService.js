var express = require('express');
var Library = require ("./LibraryModel")
async function addL(req,res,next){

    newLibrary= new Library(
     {
        name:req.body.name,
        adresse:req.body.adresse,
        email:req.body.email,
        tel:req.body.tel,
        img:req.body.img.substring(req.body.img.lastIndexOf("\\") + 1)
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
        tel:req.body.tel,
        img:req.body.img.substring(req.body.img.lastIndexOf("\\") + 1)

         
    
      
    
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

     deleteL = async(req,res,next)=>{
      try {
          await Library.findByIdAndDelete(req.params.id)
          res.status(200).json("user deleted !")
      } catch (error) {
          res.json(error)
      }
  }
  async function getOneL(req,res,next)
  {
   Library.findById((req.params.id),(err,obj)=>{
    if(err){console.error(err);}
    console.log(obj)
    res.json(obj)
   })}
  
   
   
async function deleteL(req, res, next) {
  const id = req.params.id;
  try {
    await Library.deleteOne({ _id: id }); // delete the comment with the given ID
    res.sendStatus(204); // send a "no content" response if the comment was successfully deleted
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send a "server error" response if there was a problem deleting the comment
  }
  }

    module.exports={addL,updateL,listL,deleteL,getOneL}