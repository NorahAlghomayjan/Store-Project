"use strict";
exports.__esModule = true;
var product_1 = require("../controllers/product");
var store_1 = require("../middlewares/store");
var product_routes = function (app) {
    app.get('/products', product_1.index);
    app.get('/products/:id', product_1.show);
    app.get('/products/category/:category', product_1.prodcutsByCategory);
    app.post('/products/new', store_1.authenticate, product_1.createProduct);
    app.post('/products/new-product', product_1.createProduct);
    app.put('/products/update/:id', store_1.authorizationProduct, product_1.updateProductById);
    app["delete"]('/products/delete/:id', store_1.authorizationProduct, product_1.deleteProduct);
    app["delete"]('/products/delete-prodduct/:id', product_1.deleteProduct);
};
exports["default"] = product_routes;
