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
exports.__esModule = true;
exports.findCurrentOrderOfUser = exports.deleteOrder = exports.updateOrderByUserId = exports.updateOrderById = exports.createOrder = exports.currentOrdersOfUser = exports.compeletedOrders = exports.show = exports.index = void 0;
var order_1 = require("../models/order");
var store_1 = require("../@types/store");
var orderModel = new order_1.OrderRecord();
// 1
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderModel.findAll()];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_1
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
// 2
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundOrder, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, orderModel.findById(id)];
            case 1:
                foundOrder = _a.sent();
                res.status(200).json(foundOrder);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
// 3
var compeletedOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundOrders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.userId);
                return [4 /*yield*/, orderModel.findByUserIdAndStatus(id, store_1.Status.compeleted)];
            case 1:
                foundOrders = _a.sent();
                res.status(200).json(foundOrders);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_3
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.compeletedOrders = compeletedOrders;
// 4
var currentOrdersOfUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundOrders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.userId);
                return [4 /*yield*/, orderModel.findByUserIdAndStatus(id, store_1.Status.active)];
            case 1:
                foundOrders = _a.sent();
                res.status(200).json(foundOrders);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_4
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.currentOrdersOfUser = currentOrdersOfUser;
// 5
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status_1, user_id, order, newOrder, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, status_1 = _a.status, user_id = _a.user_id;
                order = {
                    status: status_1,
                    user_id: user_id
                };
                return [4 /*yield*/, orderModel.create(order)];
            case 1:
                newOrder = _b.sent();
                res.status(200).json(newOrder);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_5
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
// 6
var updateOrderById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status_2, user_id, order, updatedOrder, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, status_2 = _a.status, user_id = _a.user_id;
                order = {
                    id: parseInt(req.params.id),
                    status: status_2,
                    user_id: user_id
                };
                return [4 /*yield*/, orderModel.updateById(order)];
            case 1:
                updatedOrder = _b.sent();
                res.status(200).json(updatedOrder);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_6
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderById = updateOrderById;
// 6
var updateOrderByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status_3, user_id, order, updatedOrder, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, status_3 = _a.status, user_id = _a.user_id;
                order = {
                    id: parseInt(req.params.id),
                    status: status_3,
                    user_id: user_id
                };
                return [4 /*yield*/, orderModel.updateByUserId(order)];
            case 1:
                updatedOrder = _b.sent();
                res.status(200).json(updatedOrder);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_7
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderByUserId = updateOrderByUserId;
// 7
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedOrder, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, orderModel["delete"](id)];
            case 1:
                deletedOrder = _a.sent();
                res.status(200).json(deletedOrder);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_8
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrder = deleteOrder;
//8
var findCurrentOrderOfUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, orders, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = parseInt(req.params.userId);
                return [4 /*yield*/, orderModel.findByUserIdAndStatus2(user_id, store_1.Status.active)];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(400).json({
                    message: 'error',
                    error: error_9
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCurrentOrderOfUser = findCurrentOrderOfUser;
// module.exports = {
//     allOrders,
//     orderById,
//     createOrder,
//     updateOrderById,
//     deleteOrder
// }
