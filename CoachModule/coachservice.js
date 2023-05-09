var user = require('../userModule/userModel')
const validatorRegister = require("../userModule/validation/register");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
async function getAllCoach(req,res,next){
  try {
    let userr = await user.find({ role: "coach" }).populate("avis");

    userr.forEach((element) => {
      let somme = 0;
      let t = 0;
      for (let i = 0; i < element.avis.length; i++) {
        somme += element.avis[i].nbravis;
        t = t + 1;
      }
      if (element.statavis) {
        element.statavis = somme / t;
      } else {
        element.statavis = 0;
      }
      element.save();
    });

    // trier le tableau d'utilisateurs
    userr.sort((a, b) => b.statavis - a.statavis);

    res.json(userr);
    console.log(userr)
  } catch (error) {
    next(error);
  }
    
}
async function addCoach(req,res,next){
    const { errors, isValid } = validatorRegister(req.body);

  console.log(req.body)
  console.log(isValid)
  if(isValid==true){
    
   
    const newuser = new user({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      pwd: bcrypt.hashSync(req.body.pwd),
      role: req.params.role,
    //  image: imagee.substring(imagee.lastIndexOf("\\") + 1),
    
      specialite: req.body.specialite,
      biographie:req.body.biographie,
      telephone:req.body.telephone,
      adresseCabinet:req.body.adresseCabinet,
      image:req.body.image
    });

  
  await  user.findOne({ username: req.body.username })
      .then((userexistant) => {
       
        if (userexistant == null ) {
         
          newuser.save()
            .then(() => {
              console.log(newuser);
              res.end();
            })
            .catch((error) => {
              
              console.log(error);
              res.status(500).json({ message: "Erreur lors de l'enregistrement du coach" });
            });
        } else {
         return res.status(500).json({ message: "coach existe deja" });
          
          
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur" });
      });
    }
    else{
      console.log(errors)
      return res.status(403).json(errors);
    }

   
}
async function topcoach (req,res,next){
  const userr = await user.find({ role: "coach" }).populate("avis");

userr.forEach((element) => {
  let somme = 0;
  let t = 0;
  for (let i = 0; i < element.avis.length; i++) {
    somme += element.avis[i].nbravis;
    t = t + 1;
  }
  if(element.statavis){
    element.statavis = somme / t;
  }
  else{

    element.statavis = 0
  }

  element.save();
});

userr.sort((a, b) => b.statavis - a.statavis);

const top4 = userr.slice(0, 4);

res.json(top4);
}



module.exports = {getAllCoach:getAllCoach,addCoach:addCoach,topcoach:topcoach}