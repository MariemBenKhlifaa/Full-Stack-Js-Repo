var express = require('express');
var Event = require ("./EventModel")
var Review=require("./ReviewModel")


async function createreview(req,res,next){
const eventId=req.params.eventId
const newReview =new Review({...req.body})
   try {
    const savedReview =await newReview.save()
    //update tawa after creating new review
    await Event.findByIdAndUpdate(eventId,{
        $push: {reviews: savedReview._id}
    })
    res.status(200).json({sucess:true,message:'review submitted'
    ,data:savedReview})
    
   } catch (err) {
    res.status(500).json({sucess:false,message:'failed to submit'
    ,data:savedReview})
    
     }
    }
    
module.exports={createreview}