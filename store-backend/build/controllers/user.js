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
exports.deleteUser = exports.updateUserById = exports.loginByEmail = exports.loginByname = exports.createUser = exports.show = exports.index = void 0;
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var users_model = new user_1.UserRecord();
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUND = _a.SALT_ROUND, TOKEN_SECRET = _a.TOKEN_SECRET;
/* 1 */
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_model.findAll()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
/* 2 */
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, users_model.findById(id)];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
/* 3 */
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, password, email, hashedPass, newUser, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, password = _a.password, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                hashedPass = bcrypt_1["default"].hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUND || '10'));
                return [4 /*yield*/, users_model.create({
                        firstname: firstname,
                        lastname: lastname,
                        password: hashedPass,
                        email: email
                    })];
            case 2:
                newUser = _b.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser[0] }, TOKEN_SECRET || '');
                res.status(200).json({ token: token, user: newUser[0] });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.status(400).json({ error: err_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
/* 4 */
var loginByname = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, password, result, foundUser, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, password = _a.password;
                return [4 /*yield*/, users_model.findByname(firstname, lastname)];
            case 1:
                result = _b.sent();
                if (result.length) {
                    foundUser = {
                        firstname: result[0].firstname,
                        lastname: result[0].lastname,
                        password: result[0].password,
                        email: result[0].email,
                        id: result[0].id
                    };
                    if (bcrypt_1["default"].compareSync(password + BCRYPT_PASSWORD, foundUser.password)) {
                        token = jsonwebtoken_1["default"].sign({ user: foundUser }, TOKEN_SECRET || '');
                        res.status(200).json({
                            user: "".concat(foundUser.firstname, " ").concat(foundUser.lastname),
                            token: token
                        });
                    }
                    else {
                        res.status(401).json('Password is Wrong');
                    }
                }
                else {
                    res.status(401).json('First Name is not found');
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                res.status(400).json({ error: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginByname = loginByname;
/* 5 */
var loginByEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, result, foundUser, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, users_model.findByEmail(email)];
            case 1:
                result = _b.sent();
                if (result.length) {
                    foundUser = {
                        firstname: result[0].firstname,
                        lastname: result[0].lastname,
                        password: result[0].password,
                        email: result[0].email,
                        id: result[0].id
                    };
                    if (bcrypt_1["default"].compareSync(password + BCRYPT_PASSWORD, foundUser.password)) {
                        token = jsonwebtoken_1["default"].sign({ user: foundUser }, TOKEN_SECRET || '');
                        res.status(200).json({
                            user: "".concat(foundUser.firstname, " ").concat(foundUser.lastname),
                            token: token
                        });
                    }
                    else {
                        res.status(401).json('Password is Wrong');
                    }
                }
                else {
                    res.status(401).json('Email not found');
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(400).json({ error: err_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginByEmail = loginByEmail;
/* 6 */
var updateUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, password, email, hashedPass, updatedUser, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, password = _a.password, email = _a.email;
                if (!(firstname && lastname)) {
                    res.status(401).json('First Name and Last Name are required.');
                    return [2 /*return*/];
                }
                hashedPass = bcrypt_1["default"].hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUND || '10'));
                return [4 /*yield*/, users_model.updateById({
                        id: parseInt(req.params.id),
                        firstname: firstname,
                        lastname: lastname,
                        password: hashedPass,
                        email: email
                    })];
            case 1:
                updatedUser = _b.sent();
                token = jsonwebtoken_1["default"].sign({ user: updatedUser }, TOKEN_SECRET || '');
                res.status(200).json({
                    updatedUser: updatedUser,
                    token: token
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(400).json({ error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserById = updateUserById;
/* 7 */
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_model["delete"](parseInt(req.params.id))];
            case 1:
                deletedUser = _a.sent();
                res.status(200).json(deletedUser);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
