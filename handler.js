'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2)

  };
};

module.exports.check = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'this is second event function!!!!!',
      input: event,
    }, null, 2)
  };
};

