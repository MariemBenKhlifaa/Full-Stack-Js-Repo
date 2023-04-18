var express = require('express');
var Event = require ("./EventModel")
var User =require ("../userModule/userModel")
var likeEvent=require("../EventsModule/likeEventService")
var likeeventtt=require("../EventsModule/LikeEventModel")

var sendMail=require("../utils/sendEmail")
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const validatorRegister = require("./validations/Csaisie");
const validatorRegisterr = require("./validations/Upev");


const { findById } = require('./ParticipateModel');

async function addev(req,res,next){
  const { errors, isValid } = validatorRegister(req.body);

  image = req.body.img 
  console.log(req.body)
  console.log(isValid)
  if(isValid==true){
    newEvent= new Event(
     {
        title:req.body.title,
        description:req.body.description,
        location:req.body.location,
        organizer:req.body.organizer,
        date:req.body.date,
        nbLikes:req.body.nbLikes,
        //img:req.body.img.substring(req.body.img.lastIndexOf("\\") + 1)
        img:image.substring(req.body.img.lastIndexOf("\\") + 1)

    }).save((err,data)=>{
        if(err){
            res.status(500).json(err)}else{
              var mailOptions = {
                from: 'webspirits',
                to: "elaa.boulifi@esprit.tn",
                subject: 'A new event has been added!',
                html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">A new event has been added!</h2>
          <p>
             touuuuuskie events aaml talla aa site ;)
          </p>     
          </div>
      `,
               
            };
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'packandgomail@gmail.com',
                    pass: 'eamitqfivmalwvpc'
                }
            });


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        console.log(data)
        res.json(data)}
    }) }  else{
      console.log(errors)
      return res.status(403).json(errors);
    }
    }
async function updateev(req,res,next)

 {
  const { errors, isValid } = validatorRegisterr(req.body);
  console.log(req.body)
  console.log(isValid)
  if(isValid==true){
    Event.findByIdAndUpdate(req.params.id,{
      
        title:req.body.title,
        description:req.body.description,
        location:req.body.location,
        organizer:req.body.organizer,
        date:req.body.date,
        img:req.body.img.substring(req.body.img.lastIndexOf("\\") + 1),
        nbLikes:req.body.nbLikes
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end() } 
    else{
       console.log(errors)
       return res.status(403).json(errors);
     }  
 }

//getAllEvents

async function listev(req,res,next)
  {
  
     Event.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     }).populate('reviews')}


// get single event
  async function listoneev(req,res,next)
  {
    await Event.findById(req.params.id).then((docs,err)=>{
      console.log(docs)
      res.json(docs)
      })
    
        res.end()
        
      }

//search
async function searchbytitle(req,res,next)
  {
    Event.find({title :  {'$regex': req.params.title,$options:'$i'} },(err,docs)=>{
      console.log(docs)
      })
      
        res.end()
        
      }

async function deleteev(req,res,next)
     {
       
       Event.find({_id:req.params.id},(err,docs)=>{
       console.log(docs)
       }).deleteOne((err,obj)=>{
         if(err){console.error(err)}
         else{
           console.log("element supprimeé")
         }
       
         res.end(obj)
       })
       
       
     }    
     async function getbynom(req, res, next) {
      try {
        const obj = await Event.find({ title: { $regex :req.params.title, $options: "i"}});
        res.json(obj);
      } catch (err) {
        console.error(err);
        next(err);
      }
    } 

     async function incrementLikes(ide)
     {
   
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
       ide ,
          { $inc: { nbLikes: 1 } },
          { new: true }
        );
        console.log(updatedEvent);
       
      } catch (error) {
        console.error("Error incrementing likes:", error);
        console.log(error);
        

      }
    }
    
    async function decrementLikes(ide)
    {
  
     try {
       const updatedEvent = await Event.findByIdAndUpdate(
      ide ,
         { $inc: { nbLikes: -1 } },
         { new: true }
       );
       console.log(updatedEvent);
      
     } catch (error) {
       console.error("Error decrementing likes:", error);
       console.log(error);
       

     }
   }
    
async function addLIKE (ide,idu){
  const eventt= await Event.findById(ide);
  const userr= await User.findById(idu);
//console.log(eventt)
//console.log(userr)
     const like = new likeeventtt({
       // user: req.body.user,
        user:userr._id,
        Event:eventt._id,
        status:true
       }); 
       like.save().then((obj,err)=>{
         if(err){console.error(err)}
         else{console.log(obj);  }
       })
    
    
   } 
   


    async function likeeventt(req, res) {
    
      try {
      
      
        await  addLIKE(req.params.ide,req.params.idu).then((obj,err)=>{/*console.log(obj)*/})
     
          await incrementLikes(req.params.ide);
        res.json({ success: true, message: "Event liked successfully" });
       
      } catch (error) {
        console.log(error)
        res.json({ success: false, message: error });
      } 
      res.end();
    }
    async function delLike(ide,idu)
    {           
      try {
      
      const likee = await likeeventtt.findOne({Event: ide,
        user: idu}).deleteOne();
        console.log(likee)
      
    
        console.log("element supprime");
       
      } catch (err) {
        console.error(err);
      } 
        }    
    async function dislikeeventt(req, res) {
    
      try {
      
        await  delLike(req.params.ide,req.params.idu).then((obj,err)=>{console.log(obj)})
     
         await decrementLikes(req.params.ide);
        res.json({ success: true, message: "Event disliked successfully" });
       
      } catch (error) {
       // console.log(error)
        res.json({ success: false, message: error });
      } 
      res.end();
    }
       




async function GetEventCount(req,res, next) {
  try {
    const count = await Event.estimatedDocumentCount();
    return res.json({ count });
  } catch (error) {
    return next(error);
  }}

 async function subscribe (req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { newsLetter: true },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Successfully subscribed to newsletter' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
 

async function unsubscribeNewsLetter (req,res){
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { newsLetter: false },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

//
  async function getSubscribers(title)  {
  try {
    const subscribers = await User.find({ newsLetter: true });

    for (const subscriber of subscribers) {
      const mailOptions = {
        from: "youth-connect",
        to: "elaa.boulifi@esprit.tn",
        subject: "New event.",
        html: `<!DOCTYPE html>
          <html>
            <head>
              <title>A new event has been added!</title>
            </head>
            <body>
              <h2>Hello ,</h2>
              <p>We first thank you for being a subscriber to our Newsletter.</p>
              <h5>A new event has been added !</h5>
              <h3>Take a look!</h3>
              <h3><bold> Read More on: ${title}</bold></h3>
            </body>
          </html>`,
      };

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "packandgomail@gmail.com",
          pass: "eamitqfivmalwvpc",
        },
      });

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${subscriber.Email}: ${info.response}`);
    }

    console.log(subscribers);
    return subscribers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//SMS
  async function sendSubscriptionSMS (tel, name)  {
  const accountSid = "AC97dd747ec28ff01249fda6a3e75280e6";
  const authToken = "ffac2873393508c21341068dde5a96c2";
  const client = require('twilio')(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Welcome to Youth-Connect ! Congratulations ${name}! You have been subscribed to our Newsletter! You will get a notification on your email account each time we add a new event!`,
      from: '+14346942272',
      to: '+216' + tel
    });
    console.log(message.sid);
  } catch (error) {
    console.log(error);
  }
}
    





module.exports={addev,updateev,listev,deleteev,listoneev,searchbytitle,GetEventCount,subscribe,unsubscribeNewsLetter,getSubscribers,sendSubscriptionSMS,incrementLikes,likeeventt,getbynom,decrementLikes,dislikeeventt,delLike}