var user = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./userModel");
const jwt_secret_key = "mykey";
const validatorRegister = require("./validation/register");
const crypto = require('crypto');
var usertodelete;
async function add(req, res, next) {
  const { errors, isValid } = validatorRegister(req.body);

  console.log(req.body)
  const imagee = req.body.image;
  console.log(isValid)
  if(isValid==true){
    
   
    const newuser = new user({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      pwd: bcrypt.hashSync(req.body.pwd),
      role: req.params.role,
      image:imagee
    });

  
    user.findOne({ username: req.body.username })
      .then((userexistant) => {
       
        if (userexistant == null ) {
         
          newuser.save()
            .then(() => {
              console.log(newuser);
              res.end();
            })
            .catch((error) => {
              
              console.log(error);
              res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
            });
        } else {
         return res.status(500).json({ message: "user existe deja" });
          
          
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

async function login(req, res, next) {
  const currentTime = new Date();

  const pwd = req.body.pwd;
  try {
    (userexisting = await user.findOne({ username: req.body.username })),
      (err, userr) => {
        if (err) {
          console.error(err);
        }
      };

  } catch (err) {
    return new Error(err);
  }
  if (userexisting == null) {
    return res.status(400).json({ message: "user inexistant" });
  }
  if (userexisting.isBlocked.blocked && userexisting.isBlocked.blockEnd > currentTime) {
      return res.status(400).json({ message: "vous etes bloqué pour une durée de 30min " });
  }

  if (userexisting.isBlocked.blocked && userexisting.isBlocked.blockEnd < currentTime) {
    userexisting.isBlocked={ blocked: false, blockEnd: new Date(Date.now()) };
    await userexisting.save()
    return res.status(200).json({ message: "user debloqué " });
  }

  const comparepwd = bcrypt.compareSync(pwd, userexisting.pwd);

  if (comparepwd == false) {
    return res.status(400).json({ message: "mot de passe incorrect" });
    // const sessionUser = sessionizeUser(userexisting);
    // req.session.userexisting = sessionUser;
  }
  const token = jwt.sign(
    {
      id: userexisting._id,
      role: userexisting.role,
      username: userexisting.username,
      name: userexisting.name,
      email: userexisting.email,
      pwd: userexisting.pwd,
      lastname: userexisting.lastname,
    },
    jwt_secret_key,
    { expiresIn: "1hr" }
  );

  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });
  req.session.sessionId = userexisting.username;

  return res.status(200).json({ message: "succefully login", userexisting, token });

  // console.log(userexisting)
}

const logout = async function (req, res) {
  req.session.destroy();
  res.status(200).clearCookie();
  res.end();
};

async function verifytoken(req, res, next) {
  const header = req.headers["authorization"];
  console.log(header);
  res.end();
}
list = (req, res, next) => {
  user.find({ name: req.params.name }, (err, docs) => {
    console.log(docs);
    if (err) {
      console.error(err);
    } else res.json(docs);
  });
};
// async function deleteuser(req, res, next) {
//   user
//     .find({ name: req.params.name }, (err, docs) => {
//       console.log(docs);
//     })
//     .deleteOne((err, obj) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log("element supprimeé");
//       }

//       res.end(obj);
//     });
// }
async function deleteuser(req, res, next) {
  user
    .findOne({ _id: req.params.id }, (err, docs) => {
      console.log(docs);
    })
    .deleteOne();
}

async function listuser(req, res, next) {
  user.find((err, obj) => {
    if (err) {
      console.error(err);
    }
    console.log(obj);
    res.json(obj);
  });
}
async function update(req, res, next) {
  await user.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      lastname: req.body.lastname,
      image: req.body.image.substring(req.body.image.lastIndexOf("\\") + 1),
      email: req.body.email,
    },
    { new: true }
  );

  res.end();
}
async function refresh(req, res, next) {
  const header = req.cookies.token;
  const decodedtoken = jwt.verify(header, "mykey");
  console.log(decodedtoken);
  const userr = await user.findOne({ username: decodedtoken.username });

  return res.json(userr);
}
async function getuserconnecte(req, res, next) {
  const header = req.cookies.token;
  const decodedtoken = jwt.verify(header, "mykey");
  console.log(decodedtoken);
  const userr = await user.findOne({ username: decodedtoken.username });

  return res.json(userr);
}
async function blockuser(req,res,next){
  const userId = req.params.id;
  const blockDuration = 3; // block for 30 minutes
  
  try {
    const userr = await user.findById(userId);
    
    if (!userr) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    userr.isBlocked = { blocked: true, blockEnd: new Date(Date.now() + blockDuration * 60000) };
    await userr.save()
    
    return res.json({ message: 'User blocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
 
}
async function changerpwd(req,res,next){
  
  const pwd = req.body.pwd;
  try {
    userexisting = await user.findOne({ username: req.params.username })
     
    const comparepwd = bcrypt.compareSync(pwd, userexisting.pwd);

    if (comparepwd == false) {
      return res.status(400).json({ message: "mot de passe incorrect" });
      // const sessionUser = sessionizeUser(userexisting);
      // req.session.userexisting = sessionUser;
    }
    else {
      userexisting.pwd=bcrypt.hashSync(req.body.pwdd)

      userexisting.save();
      
    console.log("hhhhh")
    
    }
   

}
catch (err) {
  return new Error(err);
}
}
async function getcoachclient(req,res,next){
  user.find({role:"user" , role:"coach"}).then((obj,err)=>{
    if(err){console.error(err)}
    console.log(obj)
    res.json(obj)
  })
}

// const homePage = async function (req, res) {
//   // Check if we have the session set.
//   if (req.session.user) {
//     // Get the user using the session.
//     let user = await userModel.findById(req.session.user);
//     // Render the home page
//     res.render("pages/home", {
//       name: user.name + " " + user.lastname,
//       isLoggedIn: true,
//     });
//   } else {
//     // Redirect to the login page
//     res.redirect("/login");
//   }
// };

module.exports = {
  add,
  list,
  deleteuser: deleteuser,
  login: login,
  verifytoken: verifytoken,
  listuser: listuser,
  update: update,
  logout: logout,
  refresh: refresh,
  getuserconnecte: getuserconnecte,
  blockuser:blockuser,
  changerpwd:changerpwd,getcoachclient:getcoachclient
};