import express from "express";
var router = express.Router();

import societyController from "../controller/SocietyController";


router.get("/getSocietyInfo",societyController.getSocietyBySocietyId);
router.get("/getOwnerSociety",societyController.getSocietyByOwnerId);

export default router;