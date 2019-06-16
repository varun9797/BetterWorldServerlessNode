import express from "express";
import authenticationController from './../../authentication/controller/AuthenticationController';
var router = express.Router();

import ownerController from "../controller/OwnerController";


router.post("/registerOwner", ownerController.registerOwner);
router.get("/ownerDetails", ownerController.getOwnerDetails);
router.patch("/:ownerId/ownerDetails",  ownerController.updateOwnerDetails);



// export async function registerOwner(req, res) {
//     try {
//       let data = req.body;
//       console.log("registerOwner ", data);
//       let result = await ownerController.registerOwner(data);
//       res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
//     } catch (err) {
//       console.error("handler :: registerOwner :: Error ", err);
//       res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
//     }
// }

  

  export default router;