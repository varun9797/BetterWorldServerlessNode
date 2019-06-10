import express from "express";
var router = express.Router();
import notification from "../../utility/Notification";
import authenticationController from "../controller/AuthenticationController";


router.post("/loginUser",authenticationController.loginUser);
router.post("/verifyToken",authenticationController.verifyTokenApi);
router.post("/testmail",notification.dummyMailFunction);


export default router;