
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
        email:req.body.email,
        pwd:bcrypt.hashSync(req.body.pwd),
        role:req.params.role,
        image:req.body.image.substring(req.body.image.lastIndexOf('\\') + 1)
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
async function login (req,res,next){
  const pwd=req.body.pwd;

  try{
  userexisting= await user.findOne({username:req.body.username}),(err,userr)=>{
     if(err){console.error(err)}
  }
   
  
  }catch(err){
    return new Error(err);
  }
  if(userexisting == null){
    return res.status(400).json({message:"username inexistant"})


  }
  console.log(userexisting.pwd)
  const comparepwd=bcrypt.compareSync(pwd, userexisting.pwd)
  if(comparepwd==false){
    return res.status(400).json({message:'mot de passe incorrect'})
  }
  
 
    const token = jwt.sign({id:userexisting._id,role:userexisting.role,username:userexisting.username,name:userexisting.name,pwd:userexisting.pwd,lastname:userexisting.lastname,email:userexisting.email},jwt_secret_key,{expiresIn:"1hr"})
   
  
    res.cookie('token', token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
     
   
     res.status(200).json({message:'succefully de login',userexisting,token});
     

 // console.log(userexisting)

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
  
  user.findOne({_id:req.params.id},(err,docs)=>{
  console.log(docs)
  }).deleteOne()
  
 
  
  
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
   await user.findByIdAndUpdate(req.params.id,{
      
       
        name:req.body.name,
        lastname:req.body.lastname,
        image:req.body.image.substring(req.body.image.lastIndexOf('\\') + 1),
        email:req.body.email,
       
         
    
      
    
    },{new:true})
    
    res.end()
 }
 async function refresh(req,res,next){
  const header=req.cookies.token;
  const decodedtoken = jwt.verify(header,'mykey');
  console.log(decodedtoken)
  const userr=await user.findOne({username:decodedtoken.username})
 
  
    return res.json(userr)
  

      
 }
 async function getuserconnecte(req,res,next){
  const header=req.cookies.token;
  const decodedtoken = jwt.verify(header,'mykey');
  console.log(decodedtoken)
  const userr=await user.findOne({username:decodedtoken.username})
 
  
    return res.json(userr)
 }

 
  
 

module.exports={add,list,deleteuser:deleteuser,login:login,verifytoken:verifytoken,listuser:listuser,update:update,refresh:refresh,getuserconnecte:getuserconnecte}

