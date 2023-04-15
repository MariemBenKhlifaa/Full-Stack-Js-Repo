var express = require("express");
var router = express.Router();
var serviceuser = require("../userModule/userService");
var servicecoach = require("./coachservice")
var servicerendezvous=require("./rendezVouqservice")
var serviceavis=require("./avisservice")
var {authentifaction} = require("../userModule/middleware/auth")
var permission = require("../userModule/middleware/isadmin");
var refreshToken = require("../userModule/middleware/refershtoken");
router.get("/getallcoach", authentifaction,servicecoach.getAllCoach, refreshToken);
router.post("/addcoach/:role",authentifaction,permission("admin"),servicecoach.addCoach, refreshToken)
router.post("/addrendezvous/:id",servicerendezvous.addrendezvous)
router.get("/getrendezvous/:id",authentifaction,servicerendezvous.getrendezvousbyuser,refreshToken)
router.get("/getuserbyid/:id",servicerendezvous.getuserbyid)
router.post("/addavis",serviceavis.addavis)
router.get("/getnbravis/:idcoach",serviceavis.getavisparuser)
router.get("/deleterdv/:id",servicerendezvous.removerdv)
router.get("/getrendezvousbypatient/:id",authentifaction,servicerendezvous.getrendezvousbypatient,refreshToken)
router.put("/annulerrdv/:id",authentifaction,servicerendezvous.annulerRdv,refreshToken)
router.get("/getrdvbycoach/:id",authentifaction,servicerendezvous.getrendezvousbycoach,refreshToken)
router.put("/updateavis/:idcoach/:idpatientavis",serviceavis.updateavis)
router.put("/updaterdv/:id",servicerendezvous.updaterendezvous)
router.get("/getallrdvbycoach/:id",authentifaction,servicerendezvous.getallrendezvousbycoach,refreshToken)
module.exports = router;