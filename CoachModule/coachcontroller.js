var express = require("express");
var router = express.Router();
var serviceuser = require("../userModule/userService");
var servicecoach = require("./coachservice")
var servicerendezvous=require("./rendezVouqservice")
var serviceavis=require("./avisservice")
var {authentifaction} = require("../userModule/middleware/auth")
var permission = require("../userModule/middleware/isadmin");
var refreshToken = require("../userModule/middleware/refershtoken");
router.get("/getallcoach", servicecoach.getAllCoach);
router.post("/addcoach/:role",servicecoach.addCoach)
router.post("/addrendezvous/:id",servicerendezvous.addrendezvous)
router.get("/getrendezvous/:id",servicerendezvous.getrendezvousbyuser)
router.get("/getuserbyid/:id",servicerendezvous.getuserbyid)
router.post("/addavis",serviceavis.addavis)
router.get("/getnbravis/:idcoach",serviceavis.getavisparuser)
router.get("/deleterdv/:id",servicerendezvous.removerdv)
router.get("/getrendezvousbypatient/:id",servicerendezvous.getrendezvousbypatient)
router.put("/annulerrdv/:id",servicerendezvous.annulerRdv)
router.get("/getrdvbycoach/:id",servicerendezvous.getrendezvousbycoach)
router.put("/updateavis/:idcoach/:idpatientavis",serviceavis.updateavis)
router.put("/updaterdv/:id",servicerendezvous.updaterendezvous)
router.get("/getallrdvbycoach/:id",servicerendezvous.getallrendezvousbycoach)
router.get("/getrdvbyid/:id",servicerendezvous.getrendezvousbyid)
router.get("/topcoach",servicecoach.topcoach)
module.exports = router;