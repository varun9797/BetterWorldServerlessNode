import express from 'express';
var router = express.Router();

import societyRecieptController from "../controller/SocietyRecieptController";
import responseFormat from "../../../lib/response-format"


router.get("/societyReciept",getSocietyReciept);
router.get("/paymentHistory",getPaymentHistory);

async function getSocietyReciept(req, res) {
    try {
      console.log("getSocietyReciept ", req.query);
      let result = await societyRecieptController.getPaymentStructure(req.query);
      res.json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    } catch (err) {
      console.error("getSocietyReciept :: Error ", err);
      res.json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    }
  }
  
  export async function getPaymentHistory(req, res) {
    try {
      console.log("getPaymentHistory ", req.query);
      let result = await societyRecieptController.getPaymentHistory(req.query);
      res.json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    } catch (err) {
      console.error("getPaymentHistory :: Error ", err);
      res.json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    }
  }
  

  export default router;