"use strict";
exports.__esModule = true;
exports.orders_routes = void 0;
var order_1 = require("../controllers/order");
var store_1 = require("../middlewares/store");
var orders_routes = function (app) {
    app.get('/orders', store_1.authenticate, order_1.index);
    app.get('/orders/:id', store_1.authenticate, order_1.show);
    app.get('/orders/:userId/compeleted', store_1.authorizationViewOrder, order_1.compeletedOrders);
    app.get('/orders/:userId/current-order', store_1.authenticate, order_1.currentOrdersOfUser);
    app.get('/orders/:userId/current-order2', order_1.findCurrentOrderOfUser);
    app.post('/orders/new', store_1.authenticate, order_1.createOrder);
    app.post('/orders/newOrder', order_1.createOrder);
    app.put('/orders/update/:id', store_1.authorizationOrder, order_1.updateOrderById);
    app.put('/orders/update-order/', order_1.updateOrderByUserId);
    app["delete"]('/orders/delete/:id', store_1.authorizationOrder, order_1.deleteOrder);
    app["delete"]('/orders/delete-order/:id', order_1.deleteOrder);
};
exports.orders_routes = orders_routes;
