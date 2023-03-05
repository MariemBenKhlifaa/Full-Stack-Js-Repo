
var user=require("./userModel")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const jwt_secret_key="mykey";
const authentifaction = require("../userModule/middleware/auth")
var usertodelete;
async function add(req,res,next){

   newuser= new user(
    {
        name:req.body.name,
        lastname:req.body.lastname,
        username:req.body.username,
        pwd:bcrypt.hashSync(req.body.pwd),
        role:req.params.role
    }

   
   
)
userexistant= await user.findOne({ username: req.body.username})
  
if(userexistant == null)
{
  newuser.save()
}
else{
  console.log("mawjoud")
}
console.log(userexistant)
res.end()


}
async function login(req,res,next){
  const pwd=req.body.pwd;
  try{
  userexisting= await user.findOne({username:req.body.username}),(err,userr)=>{
     if(err){console.error(err)}
  }
   
  
  }catch(err){
    return new Error(err);
  }
  if(userexisting == null){
    return res.status(400).json({message:'user inexistant'})


  }
  console.log(userexisting.pwd)
  const comparepwd=bcrypt.compareSync(pwd, userexisting.pwd)
  if(comparepwd==false){
    return res.status(400).json({message:'mot de passe incorrect'})
  }
  

    const token = jwt.sign({id:userexisting._id,role:userexisting.role,username:userexisting.username},jwt_secret_key,{expiresIn:"1hr"})
    if (req.cookies[`${userexisting._id}`]) {
      req.cookies[`${userexisting._id}`] = "";
    }
  
    res.cookie(String(userexisting._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
      
    
    return res.status(200).json({message:'succefully de login',userexisting,token})
 // console.log(userexisting)
 res.end()
  }

async function verifytoken(req,res,next){
  const header=req.headers['authorization'];
  console.log(header)
  res.end()
}
list=(req,res,next)=>{
    
user.find({name:req.params.name},(err, docs) => {
  console.log(docs)
  if (err) {
    console.error(err);

  }
  else
  res.json(docs)
}) 
}
async function deleteuser(req,res,next)
{
  
  user.find({name:req.params.name},(err,docs)=>{
  console.log(docs)
  }).deleteOne((err,obj)=>{
    if(err){console.error(err)}
    else{
      console.log("element supprimeé")
    }
  
    res.end(obj)
  })
  
  
}
 async function listuser(req,res,next)
{
 user.find((err,obj)=>{
  if(err){console.error(err);}
  console.log(obj)
  res.json(obj)
 })}
 async function update(req,res,next)
 {
    user.findByIdAndUpdate(req.params.id,{
      
        username:req.body.username,
        name:req.body.name,
        lastname:req.body.lastname,
        pwd:bcrypt.hashSync(req.body.pwd),
        role:req.body.role
         
    
      
    
    },{new:true},(obj)=>{console.log(obj)})
    res.end()
 }

 
  
 

module.exports={add,list,deleteuser:deleteuser,login:login,verifytoken:verifytoken,listuser:listuser,update:update}

