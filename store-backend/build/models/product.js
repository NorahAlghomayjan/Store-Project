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
exports.ProductRecord = void 0;
var database_1 = __importDefault(require("../database"));
var ProductRecord = /** @class */ (function () {
    function ProductRecord() {
    }
    /* helping method */
    ProductRecord.connection = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, err_1;
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
                        err_1 = _a.sent();
                        console.log('error in connection product model.');
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /* 1 */
    ProductRecord.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, products, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM products';
                        return [4 /*yield*/, ProductRecord.connection(sql, [])];
                    case 1:
                        resultRows = _a.sent();
                        products = resultRows;
                        return [2 /*return*/, products];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 2 */
    ProductRecord.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM products WHERE id=($1)';
                        return [4 /*yield*/, ProductRecord.connection(sql, [id])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows[0]];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 3 */
    ProductRecord.prototype.findByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'SELECT * FROM products WHERE category=($1)';
                        return [4 /*yield*/, ProductRecord.connection(sql, [category])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 4 */
    ProductRecord.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'INSERT INTO products(description,name,price,category,url,user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
                        return [4 /*yield*/, ProductRecord.connection(sql, [
                                product.description,
                                product.name,
                                product.price,
                                product.category,
                                product.url,
                                product.user_id,
                            ])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        err_4 = _a.sent();
                        console.log('error in creating product models.');
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 5 */
    ProductRecord.prototype.updateById = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, resultRows, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'UPDATE products SET description = ($1) , name = ($2) , price = ($3) , category = ($4)   WHERE id = ($5) RETURNING *';
                        values = [
                            product.description,
                            product.name,
                            product.price,
                            product.category,
                            product.id,
                        ];
                        return [4 /*yield*/, ProductRecord.connection(sql, values)];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* 6 */
    ProductRecord.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, resultRows, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, ProductRecord.connection(sql, [id])];
                    case 1:
                        resultRows = _a.sent();
                        return [2 /*return*/, resultRows];
                    case 2:
                        err_6 = _a.sent();
                        throw err_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductRecord;
}());
exports.ProductRecord = ProductRecord;