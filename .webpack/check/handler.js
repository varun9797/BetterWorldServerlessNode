module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "source-map-support/register"
var register_ = __webpack_require__(0);

// CONCATENATED MODULE: ./database/mysql.js


var mysql = __webpack_require__(1);

var connection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASS,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  debug: false,
  multipleStatements: true
});
/* harmony default export */ var database_mysql = ({
  connection //module.exports.connection = connection;

});
// CONCATENATED MODULE: ./components/utility/QueryMediator.js


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class QueryMediator_QueryMediator {
  constructor() {
    _defineProperty(this, "queryConnection", (query, value = null) => {
      var appData = {
        'error': 1,
        'data': '',
        'satusCode': '',
        'dbResponse': ''
      };
      console.log(query, 'values =', value);
      return new Promise((resolve, reject) => {
        database_mysql.connection.getConnection((err, connection) => {
          if (err) {
            console.log('got error ' + err);
            appData.error = err;
            appData['data'] = 'Error Occured!';
            appData['satusCode'] = 500;
            appData['dbResponse'] = '';
            reject(appData);
          } else {
            connection.query(query, [value], function (err, rows) {
              //console.log(temp.sql);
              connection.release();

              if (!err) {
                appData.error = 0;
                appData['data'] = '';
                appData['satusCode'] = 201;
                appData['dbResponse'] = rows;
                resolve(appData); //res.status(201).json(appData);
              } else {
                appData.error = err;
                appData['data'] = 'Error Occured!';
                appData['satusCode'] = 400;
                appData['dbResponse'] = '';
                reject(appData); //res.status(400).json(err);
              }
            });
          }
        });
      });
    });
  }

}

/* harmony default export */ var utility_QueryMediator = (new QueryMediator_QueryMediator());
// CONCATENATED MODULE: ./components/society-reciept/model/SocietyRecieptModel.js


function SocietyRecieptModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SocietyRecieptModel_SocietyRecieptModel {
  constructor() {
    SocietyRecieptModel_defineProperty(this, "createPaymentStructure", async body => {
      try {
        console.log("SocietyRecieptModel:: createPaymentStructure : ");
        let query = `call create_payment_structure( ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                ${body.sinkingFund}, ${body.electricityCharge})`;
        console.log(query);
        let result = await utility_QueryMediator.queryConnection(query);
        return result;
      } catch (err) {
        console.log("SocietyRecieptModel:: createPaymentStructure Error : ", err);
      }
    });

    console.log("inside SocietyRecieptModel");
  }

}

/* harmony default export */ var model_SocietyRecieptModel = (new SocietyRecieptModel_SocietyRecieptModel());
// CONCATENATED MODULE: ./components/society-reciept/controller/SocietyRecieptController.js


function SocietyRecieptController_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 //1) Create Maintainance by Society Id according to flatType and Created By and updated By should e there
// For every mainatinace recipet update every flats belong to that society and flat type
//2) Update Flats
// First add Pending Payment to the maintainance amount and add it to pending amount
// Add new Maintainance in the flat table
//
// await  societyRecieptModel.test();

class SocietyRecieptController_SocietyRecieptController {
  constructor() {
    SocietyRecieptController_defineProperty(this, "createReciept", async body => {
      console.log("********", body);
      let promiseArr = [];
      body.flatTypeArr.forEach(flatType => {
        body.flatType = flatType;
        promiseArr.push(model_SocietyRecieptModel.createPaymentStructure(body));
      });
      let result = await Promise.all(promiseArr);
      console.log("result is ", result);
    });

    console.log("inside SocietyRecieptController");
  }

}

/* harmony default export */ var controller_SocietyRecieptController = (new SocietyRecieptController_SocietyRecieptController());
// CONCATENATED MODULE: ./handler.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "societyReciept", function() { return societyReciept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check", function() { return check; });




async function societyReciept(event) {
  // let postObj = {
  //   "buildingMaintenance":222,
  //   "parkingMaintenance":222,
  //   "municipalDue":111,
  //   "sinkingFund":300,
  //   "electricityCharge":100,
  //   "createdBy":1,
  //   "id":1,
  //   "societyId":1,
  //   "flatTypeArr":[2]
  // }	
  let data = JSON.parse(event.body);
  console.log("post event is ", data); //await societyRecieptController.createReciept(postObj);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: data
    }, null, 2)
  };
} // export default {
//   societyReciept
// }

async function check(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'this is second event function!!!!!',
      input: event
    }, null, 2)
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=handler.js.map