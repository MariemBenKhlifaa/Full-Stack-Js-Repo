var express = require('express');
var Abonnement = require ("./AbonnementModel")

async function addA(req,res,next){

    newAbonnement= new Abonnement(
     {
        nom:req.body.nom,
        prenom:req.body.prenom,
        age:req.body.age,
        city:req.body.city,
        tel:req.body.tel,
        email:req.body.email,
        image:req.body.image.substring(req.body.image.lastIndexOf("\\") + 1),

        library_id:req.body.library_id
    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
        console.log(data)
        res.json(data)}
    })
    }
    async function updateA(req,res,next)
 {
    Abonnement.findByIdAndUpdate(req.params.id,{
      
        nom:req.body.nom,
        prenom:req.body.prenom,
        age:req.body.age,
        city:req.body.city,
        tel:req.body.tel,
        email:req.body.email,
        image:req.body.image.substring(req.body.image.lastIndexOf("\\") + 1),
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

    

    async function listA(req,res,next)
    {
     Abonnement.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}
     async function deleteA(req, res, next) {
        Abonnement.findOne({ _id: req.params.id }, (err, docs) => {
            console.log(docs);
          })
          .deleteOne();
      }
      
    

    
    module.exports={addA,updateA,listA,deleteA}
