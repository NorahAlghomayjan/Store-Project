"use strict";
exports.__esModule = true;
exports.orders_products_routes = void 0;
var orders_products_1 = require("../controllers/orders_products");
var orders_products_routes = function (app) {
    app.get('/orders-products/allProducts', orders_products_1.findAllOrderedProducts);
    app.post('/orders-products/addProduct', orders_products_1.addProductToOrder);
    app.put('/orders-products/change-quantity', orders_products_1.changeQuantity);
    app.get('/orders-products/topProducts/:number', orders_products_1.topProducts);
    app.get('/orders-products/all-products-order/:order_id', orders_products_1.getAllProductsOfOrder);
    app["delete"]('/orders-products/remove-product/:item_id', orders_products_1.removeProduct);
};
exports.orders_products_routes = orders_products_routes;
