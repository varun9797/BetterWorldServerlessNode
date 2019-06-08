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
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler/payment-and-reciept-handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/society-reciept/controller/SocietyRecieptController.js":
/*!***************************************************************************!*\
  !*** ./components/society-reciept/controller/SocietyRecieptController.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model_SocietyRecieptModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../model/SocietyRecieptModel */ "./components/society-reciept/model/SocietyRecieptModel.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SocietyRecieptController {
  constructor() {
    _defineProperty(this, "createOrUpdateReciept", async (body, httpMethod) => {
      try {
        console.log("SocietyRecieptController :: createOrUpdateReciept");
        let promiseArr = [];
        body.flatTypeArr.forEach(flatType => {
          body.flatType = flatType;
          promiseArr.push(_model_SocietyRecieptModel__WEBPACK_IMPORTED_MODULE_1__["default"].createOrUpdatePaymentStructure(body, httpMethod));
        });
        await Promise.all(promiseArr);
        return;
      } catch (err) {
        console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
        throw new Error(err);
      }
    });

    _defineProperty(this, "getPaymentStructure", async body => {
      try {
        console.log("SocietyRecieptController :: createOrUpdateReciept");
        let result = await _model_SocietyRecieptModel__WEBPACK_IMPORTED_MODULE_1__["default"].getPaymentStructure(body);
        return result;
      } catch (err) {
        console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
        throw new Error(err);
      }
    });

    _defineProperty(this, "updatePendingPayment", async body => {
      try {
        console.log("SocietyRecieptController :: updatePendingPayment");
        let result = await _model_SocietyRecieptModel__WEBPACK_IMPORTED_MODULE_1__["default"].updatePendingPayment(body);
        return result;
      } catch (err) {
        console.log("SocietyRecieptController :: updatePendingPayment :: Error", err);
        throw new Error(err);
      }
    });

    _defineProperty(this, "getPaymentHistory", async body => {
      try {
        console.log("SocietyRecieptController :: updatePendingPayment");
        let result = await _model_SocietyRecieptModel__WEBPACK_IMPORTED_MODULE_1__["default"].getPaymentHistory(body);
        return result;
      } catch (err) {
        console.log("SocietyRecieptController :: updatePendingPayment :: Error", err);
        throw new Error(err);
      }
    });

    console.log("inside SocietyRecieptController");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new SocietyRecieptController());

/***/ }),

/***/ "./components/society-reciept/model/SocietyRecieptModel.js":
/*!*****************************************************************!*\
  !*** ./components/society-reciept/model/SocietyRecieptModel.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/QueryMediator */ "./components/utility/QueryMediator.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SocietyRecieptModel {
  constructor() {
    _defineProperty(this, "createOrUpdatePaymentStructure", async (body, httpMethod) => {
      try {
        console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure : ");

        if (httpMethod == 'POST') {
          let query = `call create_payment_structure( ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                    ${body.sinkingFund}, ${body.electricityCharge})`;
          let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
          return result;
        } else if (httpMethod == 'PUT' && body.paymentStructureId) {
          let query = `call update_payment_structure(${body.paymentStructureId}, ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                    ${body.sinkingFund}, ${body.electricityCharge})`;
          let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
          return result;
        } else {
          throw new Error("Invalid Request");
        }
      } catch (err) {
        console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure Error : ", JSON.stringify(err));
        throw new Error(err);
      }
    });

    _defineProperty(this, "getPaymentStructure", async body => {
      try {
        console.log("SocietyRecieptModel:: getPaymentStructure : ");
        let query = `call get_payment_structure(${body.paymentStructureId})`;
        let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
        return result.dbResponse[0];
      } catch (err) {
        console.log("SocietyRecieptModel:: getPaymentStructure Error : ", JSON.stringify(err));
        throw new Error(err);
      }
    });

    _defineProperty(this, "updatePendingPayment", async body => {
      try {
        console.log("SocietyRecieptModel:: updatePendingPayment : ");
        let query = `call update_pending_payment(${body.flatid}, ${body.pendingPayment}, ${body.ownerid})`;
        let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
        return result.dbResponse[0];
      } catch (err) {
        console.log("SocietyRecieptModel:: updatePendingPayment Error : ", JSON.stringify(err));
        throw new Error(err);
      }
    });

    _defineProperty(this, "getPaymentHistory", async body => {
      try {
        console.log("SocietyRecieptModel:: updatePendingPayment : ");
        let query = `select idpaymenthistory, flatid, amount, createddate, updateddate, ownerid, remainingbalance, updatedby, comment from paymenthistory where flatid = ${body.flatId}`;
        let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
        return result.dbResponse;
      } catch (err) {
        console.log("SocietyRecieptModel:: updatePendingPayment Error : ", JSON.stringify(err));
        throw new Error(err);
      }
    });

    console.log("inside SocietyRecieptModel");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new SocietyRecieptModel());

/***/ }),

/***/ "./components/society-reciept/router/public-society-reciept-router.js":
/*!****************************************************************************!*\
  !*** ./components/society-reciept/router/public-society-reciept-router.js ***!
  \****************************************************************************/
/*! exports provided: getPaymentHistory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPaymentHistory", function() { return getPaymentHistory; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/SocietyRecieptController */ "./components/society-reciept/controller/SocietyRecieptController.js");
/* harmony import */ var _lib_response_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/response-format */ "./lib/response-format.js");


var router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();


router.get("/societyReciept", getSocietyReciept);
router.get("/paymentHistory", getPaymentHistory);

async function getSocietyReciept(req, res) {
  try {
    console.log("getSocietyReciept ", req.query);
    let result = await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].getPaymentStructure(req.query);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", result));
  } catch (err) {
    console.error("getSocietyReciept :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}

async function getPaymentHistory(req, res) {
  try {
    console.log("getPaymentHistory ", req.query);
    let result = await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].getPaymentHistory(req.query);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", result));
  } catch (err) {
    console.error("getPaymentHistory :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./components/society-reciept/router/society-reciept-router.js":
/*!*********************************************************************!*\
  !*** ./components/society-reciept/router/society-reciept-router.js ***!
  \*********************************************************************/
/*! exports provided: putOrPostSocietyReciept, updatePendingPayment, getPaymentHistory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putOrPostSocietyReciept", function() { return putOrPostSocietyReciept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePendingPayment", function() { return updatePendingPayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPaymentHistory", function() { return getPaymentHistory; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/SocietyRecieptController */ "./components/society-reciept/controller/SocietyRecieptController.js");
/* harmony import */ var _lib_response_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/response-format */ "./lib/response-format.js");


var router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();


router.get("/societyReciept", getSocietyReciept);
router.post("/societyReciept", putOrPostSocietyReciept);
router.put("/societyReciept", putOrPostSocietyReciept);
router.post("/pendingPayment", updatePendingPayment);
router.get("/paymentHistory", getPaymentHistory);

async function getSocietyReciept(req, res) {
  try {
    console.log("getSocietyReciept ", req.query);
    let result = await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].getPaymentStructure(req.query);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", result));
  } catch (err) {
    console.error("getSocietyReciept :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}

async function putOrPostSocietyReciept(req, res) {
  try {
    let data = req.body;
    let httpMethod = req.method;
    console.log("request method is ", httpMethod);
    console.log("putOrPostSocietyReciept ", data);
    await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].createOrUpdateReciept(data, httpMethod);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", null));
  } catch (err) {
    console.error("putOrPostSocietyReciept :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}
async function updatePendingPayment(req, res) {
  try {
    let data = req.body;
    console.log("updatePendingPayment ", data);
    let result = await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].updatePendingPayment(data);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", result));
  } catch (err) {
    console.error("updatePendingPayment :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}
async function getPaymentHistory(req, res) {
  try {
    console.log("getPaymentHistory ", req.query);
    let result = await _controller_SocietyRecieptController__WEBPACK_IMPORTED_MODULE_2__["default"].getPaymentHistory(req.query);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["SUCCESS"], "function executed successfully!", result));
  } catch (err) {
    console.error("getPaymentHistory :: Error ", err);
    res.json(_lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].getExpressResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_3__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./components/utility/QueryMediator.js":
/*!*********************************************!*\
  !*** ./components/utility/QueryMediator.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database_mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../database/mysql */ "./database/mysql.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class QueryMediator {
  constructor() {
    _defineProperty(this, "queryConnection", (query, value = null) => {
      var appData = {
        'error': 1,
        'data': '',
        'satusCode': '',
        'dbResponse': []
      };
      console.log(query, 'values =', value);
      return new Promise((resolve, reject) => {
        _database_mysql__WEBPACK_IMPORTED_MODULE_1__["default"].connection.getConnection((err, connection) => {
          if (err) {
            console.log('got error ' + err);
            appData.error = err;
            appData['data'] = 'Error Occured!';
            appData['satusCode'] = 500;
            reject(appData);
          } else {
            connection.query(query, [value], function (err, rows) {
              connection.release();

              if (!err) {
                appData.error = 0;
                appData['data'] = '';
                appData['satusCode'] = 201;
                appData['dbResponse'] = rows;
                resolve(appData);
              } else {
                appData.error = err;
                appData['data'] = 'Error Occured!';
                appData['satusCode'] = 400;
                reject(appData);
              }
            });
          }
        });
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new QueryMediator());

/***/ }),

/***/ "./database/mysql.js":
/*!***************************!*\
  !*** ./database/mysql.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


var mysql = __webpack_require__(/*! mysql */ "mysql");

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
/* harmony default export */ __webpack_exports__["default"] = ({
  connection //module.exports.connection = connection;

});

/***/ }),

/***/ "./handler/payment-and-reciept-handler.js":
/*!************************************************!*\
  !*** ./handler/payment-and-reciept-handler.js ***!
  \************************************************/
/*! exports provided: societyRecieptHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "societyRecieptHandler", function() { return societyRecieptHandler; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_society_reciept_router_society_reciept_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/society-reciept/router/society-reciept-router */ "./components/society-reciept/router/society-reciept-router.js");
/* harmony import */ var _components_society_reciept_router_public_society_reciept_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/society-reciept/router/public-society-reciept-router */ "./components/society-reciept/router/public-society-reciept-router.js");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);






 // or any supported framework


const app = express__WEBPACK_IMPORTED_MODULE_4___default()();
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({
  extended: false
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json());
app.use("/payment-and-reciept", _components_society_reciept_router_society_reciept_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.use("/payment-and-reciept/public", _components_society_reciept_router_public_society_reciept_router__WEBPACK_IMPORTED_MODULE_2__["default"]);
async function societyRecieptHandler(event, context) {
  const handler = serverless_http__WEBPACK_IMPORTED_MODULE_3___default()(app);
  const result = handler(event, context);
  return result;
}

/***/ }),

/***/ "./lib/response-format.js":
/*!********************************!*\
  !*** ./lib/response-format.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


class ResponseFormat {
  constructor() {
    this.statusCode = {
      SUCCESS: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      CONFLICT: 409,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      PRECONDITION_FAILED: 412,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500,
      SERVICE_UNAVAILABLE: 503,
      UNPROCESSABLE_ENTITY: 422
    };
  }

  getLambdaResponseObject(type, code, message, data) {
    let resObject = {
      statusCode: code,
      body: JSON.stringify({
        message: message,
        data: data,
        type: type
      }, null, 2),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      }
    };
    return resObject;
  }

  getExpressResponseObject(type, code, message, data) {
    let resObject = {
      statusCode: code,
      body: {
        message: message,
        data: data,
        type: type
      }
    };
    return resObject;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new ResponseFormat());

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ });
//# sourceMappingURL=payment-and-reciept-handler.js.map