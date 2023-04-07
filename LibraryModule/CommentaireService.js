var express = require('express');
var Commentaire = require ("./CommentaireModel")
var Library  =require("./LibraryModel")

async function addC(req,res,next){
 

    let newCommentaire;
    try{
      const data = Commentaire(
     {

        description:req.body.description,
        dateEnvoi :Date.now(),
        Libraryid:req.body.Libraryid

      
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
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
    if (newCommentaire) {
      newCommentaire.delete();
    }
  }
}
    async function updateC(req,res,next)
 {
    Commentaire.findByIdAndUpdate(req.params.id,{
      
        description:req.body.description,

    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
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
    
    
        const id = req.params.id;
  try {
    await Commentaire.deleteOne({ _id: id }); // delete the comment with the given ID
    res.sendStatus(204); // send a "no content" response if the comment was successfully deleted
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send a "server error" response if there was a problem deleting the comment
  }
}

    
    module.exports={addC,updateC,listC,deletec}
