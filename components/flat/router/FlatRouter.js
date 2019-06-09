import express from 'express';
var router = express.Router();



import flatController from "../controller/FlatController";
router.get("/ownerFlats",flatController.getFlatsByOwnerId);


  export default router;