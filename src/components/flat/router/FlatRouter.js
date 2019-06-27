import express from 'express';
import authenticationController from './../../authentication/controller/AuthenticationController'
var router = express.Router();



import flatController from "../controller/FlatController";
// router.get("/ownerFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsByOwnerId);
// router.get("/societyFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsBySocietyId);
router.get("/getFlats", flatController.getFlats);

  export default router;