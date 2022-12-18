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
exports.removeProduct = exports.changeQuantity = exports.getAllProductsOfOrder = exports.addProductToOrder = exports.topProducts = exports.findAllOrderedProducts = void 0;
var store_1 = require("../@types/store");
var order_1 = require("../models/order");
var orders_products_1 = require("../models/orders_products");
var ordersProductsModel = new orders_products_1.OrdersProductsRecord();
var orderModel = new order_1.OrderRecord();
/*
    this controller holds any request that's shared between two tables.
*/
// 1
var findAllOrderedProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ordersProductsModel.findAllOrderedProducts()];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_1
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findAllOrderedProducts = findAllOrderedProducts;
// 2
var topProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var numberOfProducts, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                numberOfProducts = parseInt(req.params.number);
                return [4 /*yield*/, ordersProductsModel.topOrderedProducts(numberOfProducts)];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.topProducts = topProducts;
// 3
/*
    to add product to order, WEE HAVE TO:

    check if order exist by looking in database by order id:
        1. if order exist AND status == active:

                1.1 check if product exist in the order:

                    - if product exist in the order
                        => increase product quantity.

                    - if product doesn't exist in the order
                        => add product to the order.

        2. if order doesn't exist OR status == compeleted.

                => created new order.
                => add product to this order.
*/
var addProductToOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, quantity, product_id, order_id, user_id, orders, productOfOrder, orderProduct, result, newOrder, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, quantity = _a.quantity, product_id = _a.product_id, order_id = _a.order_id, user_id = _a.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                return [4 /*yield*/, orderModel.findById(order_id)];
            case 2:
                orders = _b.sent();
                if (!(orders.length &&
                    orders[0].user_id == parseInt(user_id) &&
                    orders[0].status == store_1.Status.active)) return [3 /*break*/, 8];
                return [4 /*yield*/, ordersProductsModel.checkIfProductExistInOrder(order_id, product_id)];
            case 3:
                productOfOrder = _b.sent();
                if (!productOfOrder.length) return [3 /*break*/, 5];
                return [4 /*yield*/, ordersProductsModel.changeQuantity(quantity + productOfOrder[0].quantity, productOfOrder[0].id)];
            case 4:
                orderProduct = _b.sent();
                res.status(200).json(orderProduct);
                return [2 /*return*/];
            case 5: return [4 /*yield*/, ordersProductsModel.addProductToOrder(quantity, product_id, order_id)];
            case 6:
                result = _b.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 7: return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, orderModel.create({
                    status: store_1.Status.active,
                    user_id: user_id
                })];
            case 9:
                newOrder = _b.sent();
                return [4 /*yield*/, ordersProductsModel.addProductToOrder(quantity, product_id, newOrder[0].id)];
            case 10:
                result = _b.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_3 = _b.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_3
                });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.addProductToOrder = addProductToOrder;
//4
var getAllProductsOfOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params.order_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ordersProductsModel.getAllProductsOfOrder(order_id)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 3:
                error_4 = _a.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_4
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllProductsOfOrder = getAllProductsOfOrder;
//5
var changeQuantity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item_id, quantity, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                item_id = parseInt(req.body.item_id);
                quantity = parseInt(req.body.quantity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ordersProductsModel.changeQuantity(quantity, item_id)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 3:
                error_5 = _a.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_5
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeQuantity = changeQuantity;
var removeProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item_id, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                item_id = parseInt(req.params.item_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ordersProductsModel.removeProduct(item_id)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 3:
                error_6 = _a.sent();
                res.status(400).json({
                    message: 'Error',
                    error: error_6
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeProduct = removeProduct;
