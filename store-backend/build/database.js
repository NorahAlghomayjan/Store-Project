"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _a = process.env, HOST = _a.HOST, DB = _a.DB, DB_TEST = _a.DB_TEST, PASSWORD = _a.PASSWORD, ENV = _a.ENV, USER = _a.USER;
var client;
if (ENV == 'test') {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_TEST,
        user: USER,
        password: PASSWORD
    });
}
else {
    client = new pg_1.Pool({
        host: HOST,
        database: DB,
        user: USER,
        password: PASSWORD
    });
}
console.log('--------- \n DB:', DB);
console.log('--------- \n ENV:', ENV);
exports["default"] = client;
