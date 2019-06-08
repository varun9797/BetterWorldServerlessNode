import express from 'express';
var router = express.Router();

router.post("/loginUser",loginUser);

import authenticationController from "../controller/AuthenticationController";
import responseFormat from "../../../lib/response-format"
export async function loginUser(req, res) {
    try {
      let data = req.body;
      console.log("registerOwner ", data);
      let result = await authenticationController.loginUser(data);
      res.json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    } catch (err) {
      console.error("handler :: loginUser :: Error ", err);
      res.json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    }
  }

  export default router;