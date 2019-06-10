import express from 'express';
var router = express.Router();

import authenticationController from "../controller/AuthenticationController";


router.post("/loginUser",authenticationController.loginUser);
router.post("/verifyToken",authenticationController.verifyTokenApi);


export default router;