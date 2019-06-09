'use strict';
import societyRecieptRouter from "../src/components/society-reciept/router/society-reciept-router"
import societyRecieptPublicRouter from "../src/components/society-reciept/router/public-society-reciept-router"
import serverless from'serverless-http';
import express from 'express'; // or any supported framework
import bodyParser from 'body-parser';
import cors from 'cors';

import societyRecieptController from "../src/components/society-reciept/controller/SocietyRecieptController";
import responseFormat from "../lib/response-format"

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/payment-and-reciept", societyRecieptRouter);
app.use("/payment-and-reciept/public", societyRecieptPublicRouter);

export async function societyRecieptHandler(event, context){
  const handler = serverless(app);
  const result = handler(event, context);
  return result;
}

export async function monthlyRecieptUpdateByCron(req, res) {
  try {
    console.log("monthlyRecieptUpdateByCron ");
    await societyRecieptController.monthlyRecieptUpdateByCron();
      return responseFormat.getLambdaResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", null);
  } catch (err) {
    console.error("monthlyRecieptUpdateByCron :: Error ", err);
      return responseFormat.getLambdaResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);    
  }
}