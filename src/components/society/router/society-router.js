import express from "express";
var router = express.Router();

const societyController = require("../controller/SocietyController");


router.get("/getSocietyInfo",societyController.getSocietyBySocietyId);
router.get("/getOwnerSociety",societyController.getSocietyByOwnerId);

export default router;