import express from 'express';
var router = express.Router();



const flatController = require("../controller/FlatController");
// router.get("/ownerFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsByOwnerId);
// router.get("/societyFlats", authenticationController.verifyTokenMiddleware, flatController.getFlatsBySocietyId);
router.get("/getFlats", flatController.getFlats);
router.post("/uploadFile", flatController.uploadFileOnS3);
router.get("/getFile", flatController.getFileFromS3);

  export default router;