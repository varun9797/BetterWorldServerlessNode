import express from 'express';
var router = express.Router();

import societyRecieptController from "../controller/SocietyRecieptController";
import responseFormat from "../../../lib/response-format"


router.get("/societyReciept",getSocietyReciept);
router.post("/societyReciept",putOrPostSocietyReciept);
router.put("/societyReciept",putOrPostSocietyReciept);
router.post("/pendingPayment",updatePendingPayment);
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
  
  export async function putOrPostSocietyReciept(req, res) {
    try {
      let data = req.body;
      let httpMethod = req.method;
      console.log("request method is ", httpMethod);
      console.log("putOrPostSocietyReciept ", data);
      await societyRecieptController.createOrUpdateReciept(data, httpMethod);
      res.json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", null));
    } catch (err) {
      console.error("putOrPostSocietyReciept :: Error ", err);
      res.json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    }
  }
  
  export async function updatePendingPayment(req, res) {
    try {
      let data = req.body;
      console.log("updatePendingPayment ", data);
      let result = await societyRecieptController.updatePendingPayment(data);
      res.json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    } catch (err) {
      console.error("updatePendingPayment :: Error ", err);
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