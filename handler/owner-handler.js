


'use strict';
import ownerRouter from "../components/owner/router/owner-router";
import serverless from'serverless-http';
import express from 'express'; // or any supported framework
import bodyParser from 'body-parser'; 
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/owner", ownerRouter);
//app.use("/public", ownerRouter);

export async function ownerHandler(event, context){
  const handler = serverless(app);
  const result = handler(event, context);
  return result;
}

