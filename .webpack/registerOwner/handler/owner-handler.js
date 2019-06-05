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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 3 */
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
        'dbResponse': []
      };
      console.log(query, 'values =', value);
      return new Promise((resolve, reject) => {
        database_mysql.connection.getConnection((err, connection) => {
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

/* harmony default export */ var utility_QueryMediator = (new QueryMediator_QueryMediator());
// CONCATENATED MODULE: ./components/owner/model/OwnerModel.js


function OwnerModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class OwnerModel_SocietyModel {
  constructor() {
    OwnerModel_defineProperty(this, "registerOwner", async body => {
      try {
        console.log("SocietyModel:: registerOwner : ");
        let query = `insert into owner(ownername,type,phonenumber,email, dateOfBirth, gender, password) values ('${body.ownerName}',${body.type}, '${body.phoneNumber}','${body.email}','${body.dateOfBirth}',${body.gender}, '${body.password}')`;
        let result = await utility_QueryMediator.queryConnection(query);
        return result.dbResponse[0];
      } catch (err) {
        console.log("SocietyModel:: registerOwner Error : ", err);
        throw new Error(err);
      }
    });

    console.log("inside SocietyModel");
  }

}

/* harmony default export */ var OwnerModel = (new OwnerModel_SocietyModel());
// CONCATENATED MODULE: ./lib/bcrypt.js


function bcrypt_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const bcrypt = __webpack_require__(2);

const saltRounds = 10;

class Bcrypt {
  constructor() {
    bcrypt_defineProperty(this, "bcryptPassword", plaintextPassword => {
      return new Promise((resolve, rejects) => {
        bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
          if (err) {
            rejects(err);
          }

          resolve(hash);
        });
      });
    });

    bcrypt_defineProperty(this, "comparePassword", (plaintextPassword, hash) => {
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

/* harmony default export */ var lib_bcrypt = (new Bcrypt());
// CONCATENATED MODULE: ./components/owner/controller/OwnerController.js


function OwnerController_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class OwnerController_SocietyController {
  constructor() {
    OwnerController_defineProperty(this, "registerOwner", async body => {
      try {
        console.log("SocietyController :: registerOwner");
        body.password = await lib_bcrypt.bcryptPassword(body.password);
        let result = await OwnerModel.registerOwner(body);
        return result;
      } catch (err) {
        console.log("SocietyController :: registerOwner :: Error", err);
        throw new Error(err);
      }
    });

    console.log("inside SocietyController");
  }

}

/* harmony default export */ var OwnerController = (new OwnerController_SocietyController());
// CONCATENATED MODULE: ./lib/response-format.js


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
      }, null, 2)
    };
    return resObject;
  }

}

/* harmony default export */ var response_format = (new ResponseFormat());
// CONCATENATED MODULE: ./handler/owner-handler.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerOwner", function() { return registerOwner; });



async function registerOwner(event) {
  try {
    let data = JSON.parse(event.body);
    console.log("registerOwner ", data);
    let result = await OwnerController.registerOwner(data);
    return response_format.getResponseObject("success", response_format.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("handler :: registerOwner :: Error ", err);
    return response_format.getResponseObject("error", response_format.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=owner-handler.js.map