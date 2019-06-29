import express from "express";
var router = express.Router();
const notification = require("../../utility/Notification");
const authenticationController = require("../controller/AuthenticationController");


router.post("/loginUser",authenticationController.loginUser);
router.post("/verifyToken",authenticationController.verifyTokenApi);
router.post("/testmail",notification.dummyMailFunction);


export default router;