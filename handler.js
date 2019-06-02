'use strict';
import societyRecieptController from "./components/society-reciept/controller/SocietyRecieptController";

export async function societyReciept(event) {
  try {
    let data = JSON.parse(event.body);
    console.log("post event is ", data);
    await societyRecieptController.createReciept(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: data,
      }, null, 2)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something Went Wrong.',
        error: err,
        input: data,
      }, null, 2)
    };
  }

}

// export default {
//   societyReciept
// }

export async function check(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'this is second event function!!!!!',
      input: event,
    }, null, 2)
  };
}

