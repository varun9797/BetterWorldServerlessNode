


'use strict';
import authenticationRouter from "../components/authentication/router/authentication-router";
import serverless from'serverless-http';
import express from 'express'; // or any supported framework
import bodyParser from 'body-parser'; 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authenticationRouter);
//app.use("/public", ownerRouter);

export async function authHandler(event, context){
  const handler = serverless(app);
  const result = handler(event, context);
  return result;
}

  