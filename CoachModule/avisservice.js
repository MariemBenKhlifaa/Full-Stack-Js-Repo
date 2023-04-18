const { number } = require('yup');
var user = require('../userModule/userModel')
var avis = require('./avisModel');
const avisModel = require('./avisModel');
async function addavis(req,res,next){
  const userr = await user.findById(req.body.idcoch);
  const patient = await user.findById(req.body.idpa);
  
  const avisuser = await avisModel.findOne({ idpatientavis: req.body.idpa, idcoachavis: req.body.idcoch });
  console.log("avisuser:", avisuser);
  
  if (avisuser) {
    return res.status(400).json({ message: "Un avis existe déjà pour cet utilisateur et ce coach." });
  }

  
  const aviss = new avis({
    nbravis: req.body.nbravis,
    idcoachavis: userr._id,
    idpatientavis: patient._id
  });
  
  await aviss.save();
  
  userr.avis.push(aviss._id);
  await userr.save();

  
  
  res.json({ message: "Avis enregistré avec succès." });
}
async function getavisparuser(req,res,next){
  let somme=0;
 /* const userr =await user.find({role:"coach"}).populate('avis')
  //console.log(avis)
  userr.forEach(user => {
    console.log(user)
    user.avis.forEach(review => {

      console.log(`- ${review}`);
    });
  });*/
  
  
  
  
  
  
 const nbraviscoach= await avis.find({idcoachavis:req.params.idcoach}).count()
 if(nbraviscoach==0){
  res.json(0)
 }
 else{

 
 
    await avis.find({idcoachavis:req.params.idcoach}).then((obj,err)=> {
    
  
      for(let i = 0; i < obj.length; i++) {
        somme=somme+obj[i].nbravis
       

      }
     
     // console.log(obj.length)
  
     
    });
    res.json(somme/nbraviscoach)
  }
//  console.log(sommeavis)
  res.end()
}
async function updateavis (req,res,next){
  const userupdate = await avisModel.findOne({idpatientavis:req.params.idpatientavis,idcoachavis:req.params.idcoach})
 // console.log(userupdate);
  userupdate.nbravis=req.body.nbravis
    await userupdate.save(
      
    ).then((obj)=>{console.log(obj)})
  
res.end()}


module.exports={addavis:addavis,getavisparuser:getavisparuser,updateavis:updateavis}