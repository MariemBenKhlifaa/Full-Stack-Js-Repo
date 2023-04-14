var express = require('express');
var Abonnement = require ("./AbonnementModel")
var Library=require('./LibraryModel')
const validatorRegister = require("./validation/ControleSaisie");
const validatorRegistere = require("./validation/UpAge");
const UpAbo = require("./validation/UpAbo");

async function addA(req,res,next){
    const { errors, isValid } = validatorRegister(req.body);

    console.log(req.body)
    console.log(isValid)
    if(isValid==true){
  
   let newAbonnement
    
   try{
    const data = new Abonnement(
     {
        nom:req.body.nom,
        prenom:req.body.prenom,
        age:req.body.age,
        city:req.body.city,
        tel:req.body.tel,
        email:req.body.email,
        Duration:req.body.Duration,
        image:req.body.image.substring(req.body.image.lastIndexOf("\\") + 1),
        Libraryid:req.body.Libraryid
    });
    newAbonnement = await data.save();
    const library = await Library.findById(req.body.Libraryid);
    library.abonnements.push(newAbonnement._id);
   library.save();
    res.json(data);
   
} 
catch (e) {
    res.status(500).json(e);
    if (newAbonnement) {
        newAbonnement.delete();
    }
  }
}else{
    console.log(errors)
    return res.status(403).json(errors);
  }
 

   }
  


    
    async function updateA(req,res,next)
 {
  const { errors, isValid } = UpAbo(req.body);

  console.log(req.body)
  console.log(isValid)
  if(isValid==true){
    
  
    Abonnement.findByIdAndUpdate(req.params.id,{
      
        nom:req.body.nom,
        prenom:req.body.prenom,
        city:req.body.city,
        tel:req.body.tel,
        email:req.body.email,
        Duration:req.body.Duration

      },{new:true},(obj)=>{console.log(obj)})
      res.end();
   } 
   else{
      console.log(errors)
      return res.status(403).json(errors);
    }  
   
  }
  

    

    async function listA(req,res,next)
    {
     Abonnement.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}



     async function deleteA(req, res, next) {
         try {
        const abonnement = await Abonnement.findById(req.params.id);
        const library = await Library.findByIdAndUpdate(abonnement.Libraryid, {
          $pull: {
            abonnements: {
              _id: abonnement._id,
            },
          },
        });
        await abonnement.remove();
        // course.lessons.splice(course.lessons.findIndex(a => a._id === lesson._id) , 1)
        res.status(200).json("abonnement deleted");
      } catch (error) {
        res.json(error);
      }
    };

      
    async function getOneA(req, res, next) {
      try {
        const obj = await Abonnement.findById(req.params.id);
        console.log(obj);
        res.json(obj);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    }
       
    
    module.exports={addA,updateA,listA,deleteA,getOneA}
