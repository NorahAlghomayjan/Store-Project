"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = __importDefault(require("./routes/user"));
var product_1 = __importDefault(require("./routes/product"));
var order_1 = require("./routes/order");
var orders_products_1 = require("./routes/orders_products");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.send('Hello from 2 project!');
});
(0, user_1["default"])(app);
(0, product_1["default"])(app);
(0, order_1.orders_routes)(app);
(0, orders_products_1.orders_products_routes)(app);
app.listen(process.env.PORT, function () {
    console.log("starting app on: ".concat(process.env.ADDRESS));
});
exports["default"] = app;
