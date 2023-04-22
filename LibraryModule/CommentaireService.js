var express = require('express');
var Commentaire = require ("./CommentaireModel")
var Library  =require("./LibraryModel")
const validatorRegisteeer = require("./validation/ValidCmntr");
const badWords = require('bad-words');
const https = require('https');
var User=require("../userModule/userModel")
function filterWords(text, badWords) {
  if (!badWords || badWords.length === 0) {
    return text;
  }

  for (let i = 0; i < badWords.length; i++) {
    const regex = new RegExp(`\\b${badWords[i]}\\b`, 'gi');
    text = text.replace(regex, ' *'.repeat(badWords[i].length));
  }

  return text;
}

async function addC(req, res, next) {
  const { errors, isValid } = validatorRegisteeer(req.body);
  const user=await User.findById(req.body.userid);

  console.log(req.body)
  console.log(isValid)

  if (isValid == true) {
    let newCommentaire;

    try {
      const badWords = ['bad', 'words', 'here','merde'];
      const filteredText = filterWords(req.body.description, badWords);

      const data = Commentaire({
        description: filteredText,
        username:req.body.username,
        userid:user._id,
        dateEnvoi: Date.now(),
        Libraryid: req.body.Libraryid,
      });

      newCommentaire = await data.save();

      const library = await Library.findById(req.body.Libraryid);

      if (library) {
        library.commentaires.push(newCommentaire._id);
        const newLibrary = await library.save();
        res.json(data);
      } else {
        res.status(404).send("Library not found");

      } 
      if (user == null) {
        res.status(404).send("User not found");
        return;
      }

    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      if (newCommentaire) {
        newCommentaire.delete();
      }
    }
    
  } 
  
  else {
    console.log(errors)
    return res.status(403).json(errors);
  }
 
}

    async function updateC(req,res,next)
 {
    Commentaire.findByIdAndUpdate(req.params.id,{
      
        description:req.body.description,

    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

 async function getuserbyid(req,res,next){
  await User.findById(req.params.id).then((obj,err)=>{
    if(err){console.log(err)}
    else{console.log(obj);
    res.json(obj)}

  })
}  


    async function listC(req,res,next){
    try {
      const library = await Library.findById(req.params.Libraryid);
      const commentaires = await Commentaire.find({ _id: library.commentaires });
      res.json(commentaires);
    } catch (e) {
      res.status(500).json(e);
    }
    }

     async function deletec(req, res, next) {
    
    
      try {
        const commentaire = await Commentaire.findById(req.params.id);
        const library = await Library.findByIdAndUpdate(commentaire.Libraryid, {
          $pull: {
            commentaires: {
              _id: commentaire._id,
            },
          },
        });
        await commentaire.remove();
        // course.lessons.splice(course.lessons.findIndex(a => a._id === lesson._id) , 1)
        res.status(200).json("commentaire deleted");
      } catch (error) {
        res.json(error);
      }
    };

    async function listc(req,res,next)
    {
     Commentaire.find((err,obj)=>{
      if(err){console.error(err);}
      console.log(obj)
      res.json(obj)
     })}


    
    module.exports={addC,updateC,listC,deletec,listc,getuserbyid}
