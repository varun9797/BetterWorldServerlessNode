import express from 'express';
import authenticationController from './../../authentication/controller/AuthenticationController'
var router = express.Router();



import flatController from "../controller/FlatController";
// router.get("/ownerFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsByOwnerId);
// router.get("/societyFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsBySocietyId);
router.get("/getFlats", flatController.getFlats);
router.post("/s3SignedUrl", authenticationController.verifyTokenMiddleware,flatController.getS3SignedUrl);
router.get("/getFile", flatController.getFileFromS3);
router.put("/updateFlat", flatController.updateFlat);

  export default router;