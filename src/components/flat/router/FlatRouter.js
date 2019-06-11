import express from 'express';
var router = express.Router();



import flatController from "../controller/FlatController";
router.get("/ownerFlats",flatController.getFlatsByOwnerId);
router.get("/societyFlats",flatController.getFlatsBySocietyId);

  export default router;