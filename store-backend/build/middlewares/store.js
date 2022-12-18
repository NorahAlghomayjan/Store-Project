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
exports.authorizationUser = exports.authorizationProduct = exports.authorizationOrder = exports.authorizationViewOrder = exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var order_1 = require("../models/order");
var product_1 = require("../models/product");
var product_model = new product_1.ProductRecord();
var orderModel = new order_1.OrderRecord();
/* helping method */
var extractUserId = function (req) {
    try {
        var authorizationHeader = req.headers.authorization || '';
        var token = authorizationHeader.split(' ')[1];
        var secretToken = process.env.TOKEN_SECRET || '';
        var decode = jsonwebtoken_1["default"].verify(token, secretToken);
        return decode;
    }
    catch (error) {
        throw error;
    }
};
/* check if user is logged or signed-up */
var authenticate = function (req, res, next) {
    try {
        var header = req.headers.authorization || '';
        var token = header.split(' ')[1];
        var secretToken = process.env.TOKEN_SECRET || '';
        var decode = jsonwebtoken_1["default"].verify(token, secretToken);
        req.body.user_id = decode.user.id;
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, user should login, invalid token , error: ".concat(err));
    }
};
exports.authenticate = authenticate;
/* check if user is allowed to view order (user should be the one who owns the order) */
var authorizationViewOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decode, userId, user_id;
    return __generator(this, function (_a) {
        try {
            decode = extractUserId(req);
            userId = decode.user.id;
            user_id = parseInt(req.params.userId);
            if (userId !== user_id) {
                res.status(400).json({
                    meessge: 'user is not authorized to view orders'
                });
                return [2 /*return*/];
            }
            next();
        }
        catch (err) {
            console.log('catch authorizing ORDER..');
            res.status(401).json({ error: "".concat(err) });
        }
        return [2 /*return*/];
    });
}); };
exports.authorizationViewOrder = authorizationViewOrder;
/* check if user is allowed to update order (user should be the one who owns the order) */
var authorizationOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decode, userId, orderId, order, orderUserId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                decode = extractUserId(req);
                userId = decode.user.id;
                orderId = parseInt(req.params.id);
                return [4 /*yield*/, orderModel.findById(orderId)];
            case 1:
                order = _a.sent();
                if (!order.length) {
                    res.status(400).json({
                        meessge: 'not found order'
                    });
                    return [2 /*return*/];
                }
                orderUserId = order[0].user_id;
                if (userId !== parseInt(orderUserId)) {
                    res.status(400).json({
                        meessge: 'user is not authorized to view or edit this order'
                    });
                    return [2 /*return*/];
                }
                req.body.user_id = userId;
                next();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('catch authorizing ORDER..');
                res.status(401).json({ error: "".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authorizationOrder = authorizationOrder;
/* check if user is allowed to update product (user should be the one who created the product) */
var authorizationProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decode, product, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                decode = extractUserId(req);
                return [4 /*yield*/, product_model.findById(parseInt(req.params.id))];
            case 1:
                product = _a.sent();
                if (decode.user.id != product.user_id) {
                    console.log('decode.user.id:', decode.user.id, 'product.user_id', product.user_id);
                    res.status(400).json({
                        meessge: 'user is not authorized to edit or delete this product'
                    });
                    return [2 /*return*/];
                }
                console.log('finished authorizing..');
                next();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log('catch authorizing PRODUCT..');
                res.status(401);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authorizationProduct = authorizationProduct;
/* check if user is allowed to update user (user should be himself/herself ) */
var authorizationUser = function (req, res, next) {
    try {
        var header = req.headers.authorization || '';
        var token = header.split(' ')[1];
        var secretToken = process.env.TOKEN_SECRET || '';
        var decode = jsonwebtoken_1["default"].verify(token, secretToken);
        if (decode.user.id !== parseInt(req.params.id)) {
            res.status(401).json({
                message: 'user is not allowed to edit or view this user'
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied, user should login, invalid token , error: ".concat(error));
    }
};
exports.authorizationUser = authorizationUser;
