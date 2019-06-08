'use strict';
import societyRecieptRouter from "../components/society-reciept/router/society-reciept-router"
import societyRecieptPublicRouter from "../components/society-reciept/router/public-society-reciept-router"
import serverless from'serverless-http';
import express from 'express'; // or any supported framework
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/payment-and-reciept", societyRecieptRouter);
app.use("/payment-and-reciept/public", societyRecieptPublicRouter);

export async function societyRecieptHandler(event, context){
  const handler = serverless(app);
  const result = handler(event, context);
  return result;
}
