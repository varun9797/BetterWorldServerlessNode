import express from "express";
var router = express.Router();

import societyController from "../controller/SocietyController";


router.get("/getSocietyInfo",societyController.getSocietyBySocietyId);

export default router;