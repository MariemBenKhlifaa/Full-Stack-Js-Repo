var express = require("express");
var router = express.Router();
var service = require("./fileUpload");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.post("/", service.fileupload);

module.exports = router;
