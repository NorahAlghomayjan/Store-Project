"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserRecord = void 0;
var database_1 = __importDefault(require("../database"));
var UserRecord = /** @class */ (function () {
    function UserRecord() {
        var _this = this;
        // 1. return all users.
        this.findAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("coudn't find users ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //2. find user by id.
        this.findById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE id = ($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        users = result.rows;
                        return [2 /*return*/, users];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //3. find user by username.
        this.findByname = function (firstName, lastName) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE firstname = ($1) AND lastname = ($2)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [firstName, lastName])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        console.log('result', result);
                        console.log('firstName, lastName', firstName, lastName);
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //4.find user by email
        this.findByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE email = ($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //4. create new user.
        this.create = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, users, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO users(firstName,lastName,password,email) VALUES ($1,$2,$3 ,$4) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.password,
                                user.email,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        users = result.rows;
                        return [2 /*return*/, users];
                    case 3:
                        err_4 = _a.sent();
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //5. update user.
        this.updateById = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE users SET firstname=($1),lastname=($2),password=($3),email=($4) WHERE id=($5) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.password,
                                user.email,
                                user.id,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //6. delete user
        this["delete"] = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var sql, conn, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserRecord;
}());
exports.UserRecord = UserRecord;
