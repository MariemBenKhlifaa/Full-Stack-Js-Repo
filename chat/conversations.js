const router = require("express").Router();
const Conversation = require("./Conversation");
const { route } = require("./messages");

//new conv

router.post("/:senderId/:receiverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.params.senderId, req.params.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  } catch (err) {
  
  return  res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if(conversation){ return res.status(200).json(conversation);}
    else{
      return res.status(404).json({message:"not found"})
    }
    
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.delete("/remove/:id",async(req,res)=>{
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id)
     res.end()
  } catch (err) {
    res.status(500).json(err);
  }
})
router.delete("/remove",async(req,res)=>{
  try {
    const conversation = await Conversation.remove({})
     res.end()
  } catch (err) {
    res.status(500).json(err);
  }
})
router.get("/getcon",async(req,res)=>{

})
module.exports = router;