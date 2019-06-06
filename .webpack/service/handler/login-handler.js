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
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler/login-handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/authentication/controller/AuthenticationController.js":
/*!**************************************************************************!*\
  !*** ./components/authentication/controller/AuthenticationController.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/AuthenticationModel */ "./components/authentication/model/AuthenticationModel.js");
/* harmony import */ var _lib_bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/bcrypt */ "./lib/bcrypt.js");
/* harmony import */ var _lib_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/jwt */ "./lib/jwt.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class AuthenticationController {
  constructor() {
    _defineProperty(this, "loginUser", async body => {
      try {
        console.log("AuthenticationController :: loginUser");
        let result = await _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_1__["default"].loginUser(body);

        if (result) {
          let isPasswordMatch = await _lib_bcrypt__WEBPACK_IMPORTED_MODULE_2__["default"].comparePassword(body.password, result.password);

          if (isPasswordMatch) {
            delete result.password;
            let signInToken = await _lib_jwt__WEBPACK_IMPORTED_MODULE_3__["default"].signIn(result);
            return signInToken;
          } else {
            throw new Error("Invalid Password!!");
          }
        } else {
          throw new Error("Invalid Email!!");
        }
      } catch (err) {
        console.log("AuthenticationController :: loginUser :: Error", err);
        throw new Error(err);
      }
    });

    console.log("inside AuthenticationController");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new AuthenticationController());

/***/ }),

/***/ "./components/authentication/model/AuthenticationModel.js":
/*!****************************************************************!*\
  !*** ./components/authentication/model/AuthenticationModel.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/QueryMediator */ "./components/utility/QueryMediator.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class AuthenticationModel {
  constructor() {
    _defineProperty(this, "loginUser", async body => {
      try {
        console.log("SocietyModel:: loginUser : ");
        let query = `SELECT ownerid, ownername, phoneNumber, email, gender, password, type, dateOfBirth FROM owner WHERE email = '${body.email}'`;
        let result = await _utility_QueryMediator__WEBPACK_IMPORTED_MODULE_1__["default"].queryConnection(query);
        return result.dbResponse[0];
      } catch (err) {
        console.log("SocietyModel:: loginUser Error : ", err);
        throw new Error(err);
      }
    });

    console.log("inside AuthenticationModel");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new AuthenticationModel());

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

/***/ "./handler/login-handler.js":
/*!**********************************!*\
  !*** ./handler/login-handler.js ***!
  \**********************************/
/*! exports provided: loginUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginUser", function() { return loginUser; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_authentication_controller_AuthenticationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/authentication/controller/AuthenticationController */ "./components/authentication/controller/AuthenticationController.js");
/* harmony import */ var _lib_response_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/response-format */ "./lib/response-format.js");



async function loginUser(event) {
  try {
    let data = JSON.parse(event.body);
    console.log("registerOwner ", data);
    let result = await _components_authentication_controller_AuthenticationController__WEBPACK_IMPORTED_MODULE_1__["default"].loginUser(data);
    return _lib_response_format__WEBPACK_IMPORTED_MODULE_2__["default"].getResponseObject("success", _lib_response_format__WEBPACK_IMPORTED_MODULE_2__["default"].statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("handler :: loginUser :: Error ", err);
    return _lib_response_format__WEBPACK_IMPORTED_MODULE_2__["default"].getResponseObject("error", _lib_response_format__WEBPACK_IMPORTED_MODULE_2__["default"].statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

/***/ }),

/***/ "./lib/bcrypt.js":
/*!***********************!*\
  !*** ./lib/bcrypt.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const saltRounds = 10;

class Bcrypt {
  constructor() {
    _defineProperty(this, "bcryptPassword", plaintextPassword => {
      return new Promise((resolve, rejects) => {
        bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
          if (err) {
            rejects(err);
          }

          resolve(hash);
        });
      });
    });

    _defineProperty(this, "comparePassword", (plaintextPassword, hash) => {
      return new Promise((resolve, rejects) => {
        bcrypt.compare(plaintextPassword, hash, function (err, res) {
          if (err) {
            rejects(err);
          }

          if (res) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Bcrypt());

/***/ }),

/***/ "./lib/jwt.js":
/*!********************!*\
  !*** ./lib/jwt.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const saltRounds = 10;

var jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

class Jwt {
  constructor() {
    _defineProperty(this, "TOKEN_EXPIRY_TIME", 1440);

    _defineProperty(this, "signIn", data => {
      return new Promise((resolve, rejects) => {
        let token = jwt.sign(JSON.parse(JSON.stringify(data)), process.env.SECRET_KEY, {
          expiresIn: this.TOKEN_EXPIRY_TIME
        });
        resolve(token);
      });
    });

    _defineProperty(this, "verifyToken", token => {
      return new Promise((resolve, rejects) => {
        jwt.verify(token, process.env.SECRET_KEY, function (err, data) {
          if (err) {
            rejects("Invalid Token");
          } else {
            resolve("Valid Token");
          }
        });
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Jwt());

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

  getResponseObject(type, code, message, data) {
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

}

/* harmony default export */ __webpack_exports__["default"] = (new ResponseFormat());

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mysql");

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
//# sourceMappingURL=login-handler.js.map