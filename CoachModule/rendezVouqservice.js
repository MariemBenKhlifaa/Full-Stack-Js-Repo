const { get } = require('mongoose');
var user = require('../userModule/userModel')
var rendezvous = require('./rendevousModel');
const { date } = require('yup');
async function addrendezvous(req,res,next){
 const userr= await user.findById(req.params.id);
 const patient=await user.findById(req.body.patientid)

 
 const coach = await user.findById(req.params.id)
 

  const randivous = new rendezvous({
       date: req.body.date,
       etat:"comfirmé",
       userid:userr._id,
       tel:req.body.tel,
       patientid:patient._id
      }); 
     await randivous.save().then((obj,err)=>{
        if(err){console.error(err)}
        else{console.log(obj)}
      })
     coach.rendezVous.push(randivous._id)
     await coach.save();
    res.end();
 }
  
  async function getrendezvousbyuser(req,res,next){

  await rendezvous.find({userid:req.params.id,etat:'comfirmé'}).then((obj,err)=>{
      if(err){console.log(err)}
      else {
        res.json(obj);
        console.log(obj)
      }
     })
    
     res.end()
  
  }
  async function getuserbyid(req,res,next){
    await user.findById(req.params.id).then((obj,err)=>{
      if(err){console.log(err)}
      else{console.log(obj);
      res.json(obj)}

    })
    
  }
  async function removerdv(req,res,next){
    await rendezvous.findOneAndDelete({_id:req.params.id}).then(
      (obj,err)=>{
        if(err){console.log(err)}
        else{console.log(obj);
         console.log(obj)}
  
      }
    )
    res.end()
  }
  async function getrendezvousbypatient(req,res,next){

    await rendezvous.find({patientid:req.params.id,etat:"comfirmé",date:new Date(),date:{$gte:new Date()}}).then((obj,err)=>{
        if(err){console.log(err)}
        else {console.log(obj);
          res.json(obj)
        }
       })
      
       res.end()
    
    }
 async function annulerRdv(req,res,next){
      await rendezvous.findByIdAndUpdate(req.params.id,{
        etat:"annulée"
      }).then((err,obj)=>{
        if(err){console.log(err)}else{
          console.log(obj)
        
        }
      })
    }
    async function getrendezvousbycoach(req,res,next){

      await rendezvous.find({userid:req.params.id,etat:"comfirmé"}).then((obj,err)=>{
          if(err){console.log(err)}
          else {
            res.json(obj);
            console.log(obj)
          }
         })
        
         res.end()
      
      }
    async function updaterendezvous(req,res,next){
     const rdvupdate=await rendezvous.findOne({_id:req.params.id,date:{$gte:new Date()}})
     rdvupdate.date=req.body.date;
     rdvupdate.save()
     .then((obj,err)=>{console.log(obj)})
    }
    async function getallrendezvousbycoach(req,res,next){

      await rendezvous.find({userid:req.params.id}).then((obj,err)=>{
          if(err){console.log(err)}
          else {
            res.json(obj);
            console.log(obj)
          }
         })
        
         res.end()
      
      }
     


  

module.exports={addrendezvous:addrendezvous,
  getrendezvousbyuser:getrendezvousbyuser,
  getuserbyid:getuserbyid,
  removerdv:removerdv,
  getrendezvousbypatient:getrendezvousbypatient,
  annulerRdv:annulerRdv,
  getrendezvousbycoach:getrendezvousbycoach,updaterendezvous:updaterendezvous,getallrendezvousbycoach:getallrendezvousbycoach

}