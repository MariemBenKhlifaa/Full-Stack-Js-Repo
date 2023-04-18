var express = require('express');
var Participate = require ("./ParticipateModel")
var Event = require ("./EventModel")
var User =require ("../userModule/userModel")




async function addpart(req,res,next){
   // const userr= await User.findById(req.params.idu);
    const eventt= await Event.findById(req.params.ide);

       const moucherka = new Participate({
          userEmail: req.body.userEmail,
          eventName:eventt,
         // userId:userr,
          fullName:req.body.fullName,
          guestSize:req.body.guestSize,
          phone:req.body.phone,
          participateAt:req.body.participateAt
         }); 
         moucherka.save().then((obj,err)=>{
           if(err){console.error(err)}
           else{console.log(obj)}
         })
       res.end();
     }
async function createParticipation(req,res,next){

const newParticipate=new Participate(req.body)
   try {
    const savedParticipate =await newParticipate.save()
   
    res.status(200).json({
        sucess:true
        ,message:'yaatik saha aal participation'
        ,data:savedParticipate})
    
   } catch (err) {
    res.status(500).json({
        sucess:false
        ,message:'internal server error'
     })
    
     }
    }
    
//getSingleParticipation
    async function getParticipation(req,res,next){
        const id =req.params.id

        try {
            const participate =await Participate.findById(id)
            res.status(200).json({
                sucess:true
                ,message:'successful'
                ,data:participate})
            
        } catch (error) {
            res.status(404).json({
                sucess:true
                ,message:'not found'
             })
            
        }
            }
  //getALLParticipation
    async function getParticipations(req,res,next){

     Participate.find((err,obj)=>{
        if(err){console.error(err);}
        console.log(obj)
        res.json(obj)
       })
            }


  async function delpart(req,res,next)
 {           
 Participate.find({_id:req.params.id},(err,docs)=>{
 console.log(docs)
 }).deleteOne((err,obj)=>{
if(err){console.error(err)}
else{
console.log("element supprimeé")
 }
res.end(obj)
})}    
       

module.exports={createParticipation,getParticipation,getParticipations,addpart,delpart}