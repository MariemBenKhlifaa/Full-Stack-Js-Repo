var express = require('express');
var Library = require ("./LibraryModel")
const validatorRegister = require("./validation/ValidLib");
const Updateregistre= require("./validation/Updateregistre");
var Abonnement =require ("./AbonnementModel")
async function addL(req,res,next){
    const { errors, isValid } = validatorRegister(req.body);

    console.log(req.body)
    console.log(isValid)
    if(isValid==true){
    newLibrary= new Library(
     {
        name:req.body.name,
        location:req.body.location,
        pays:req.body.pays,
        email:req.body.email,
        tel:req.body.tel,
        img:req.body.img.substring(req.body.img.lastIndexOf("\\") + 1)
    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
        console.log(data)
        res.json(data)}
    })
  }  else{
        console.log(errors)
        return res.status(403).json(errors);
      }
    }
    async function updateL(req,res,next)
 {
    const { errors, isValid } = Updateregistre(req.body);

    console.log(req.body)
    console.log(isValid)
    if(isValid==true){

    Library.findByIdAndUpdate(req.params.id,{
       
        name:req.body.name,
        location:req.body.location,
        pays:req.body.pays,
        email:req.body.email,
        tel:req.body.tel,
      

    
    },{new:true},(obj)=>{console.log(obj)})
    res.end();
 } 
 else{
    console.log(errors)
    return res.status(403).json(errors);
  }  
 
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
    try {
      const obj = await  Library.findById(req.params.id)
    console.log(obj)
    res.json(obj)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }}
   
     
   async function getbynom(req, res, next) {
    try {
      const obj = await Library.find({ name: { $regex :req.params.name, $options: "i"}});
      res.json(obj);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
   

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

    module.exports={addL,updateL,listL,deleteL,getOneL,getbynom}