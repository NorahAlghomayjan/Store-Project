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
exports.OrdersProductsRecord = void 0;
var database_1 = __importDefault(require("../database"));
var OrdersProductsRecord = /** @class */ (function () {
    function OrdersProductsRecord() {
    }
    /* helping methods */
    OrdersProductsRecord.connection = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /* CRUD methods */
    /* 1 - return all orders and products*/
    OrdersProductsRecord.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM orders_products';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 2 - return all ordered products */
    OrdersProductsRecord.prototype.findAllOrderedProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT DISTINCT op.product_id , p.name , p.category FROM orders_products op INNER JOIN products p ON p.id=op.product_id ORDER BY op.product_id ASC';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [])];
                    case 1:
                        resultRows = _a.sent();
                        console.log('resultRows', resultRows);
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 3 - find product_id where order_id */
    OrdersProductsRecord.prototype.checkIfProductExistInOrder = function (order_id, product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM orders_products WHERE order_id=($1) AND product_id=($2)';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                order_id,
                                product_id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 4 - add product to order */
    OrdersProductsRecord.prototype.addProductToOrder = function (quantity, product_id, order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'INSERT INTO orders_products(quantity,product_id,order_id) VALUES ($1,$2,$3) RETURNING *';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                quantity,
                                product_id,
                                order_id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        console.log('resultRows', resultRows);
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 5 - increase quantity */
    OrdersProductsRecord.prototype.changeQuantity = function (quantity, id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'UPDATE orders_products SET quantity = ($1) WHERE id=($2) RETURNING *';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                quantity,
                                id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        console.log('resultRows', resultRows);
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_6 = _a.sent();
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // `SELECT (p.id AS id , p.name AS name , p.price AS price , p.url AS url , p.description AS description , p.category AS category) AS product , op.quantity AS amount FROM orders_products op JOIN products p ON  op.product_id = p.id  WHERE order_id= ($1)`;
    OrdersProductsRecord.prototype.getAllProductsOfOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "SELECT p.id AS product_id , p.name  , p.price  , p.url , p.description  , p.category , op.id AS item_id , op.quantity AS amount FROM orders_products op JOIN products p ON  op.product_id = p.id  WHERE order_id= ($1)";
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                order_id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        console.log('resultRows', resultRows);
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_7 = _a.sent();
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 6 - top ordered produts */
    OrdersProductsRecord.prototype.topOrderedProducts = function (number) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM products p INNER JOIN ( SELECT op.product_id , COUNT(op.product_id) AS ordered_times FROM orders_products op GROUP BY op.product_id)op ON p.id=op.product_id ORDER BY op.ordered_times DESC LIMIT ($1)';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                number,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_8 = _a.sent();
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersProductsRecord.prototype.removeProduct = function (item_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'DELETE FROM orders_products op WHERE op.id = ($1) RETURNING *';
                        return [4 /*yield*/, OrdersProductsRecord.connection(sql, [
                                item_id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_9 = _a.sent();
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersProductsRecord;
}());
exports.OrdersProductsRecord = OrdersProductsRecord;
