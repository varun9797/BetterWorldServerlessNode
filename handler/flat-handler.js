


'use strict';
import flatRouter from "../src/components/flat/router/FlatRouter";
import serverless from'serverless-http';
import express from 'express'; // or any supported framework
import bodyParser from 'body-parser'; 
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/flat", flatRouter);
//app.use("/public", ownerRouter);

export async function flatHandler(event, context){
  const handler = serverless(app);
  const result = handler(event, context);
  return result;
}
