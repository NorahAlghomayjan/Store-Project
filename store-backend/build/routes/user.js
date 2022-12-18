"use strict";
exports.__esModule = true;
var user_1 = require("../controllers/user");
var store_1 = require("../middlewares/store");
var user_routes = function (app) {
    app.get('/users', store_1.authenticate, user_1.index);
    app.get('/users/:id', store_1.authenticate, user_1.show);
    app.post('/users/new', user_1.createUser);
    app.post('/users/login', user_1.loginByname);
    app.post('/users/loginByEmail', user_1.loginByEmail);
    app.put('/users/update/:id', store_1.authorizationUser, user_1.updateUserById);
    app.put('/users/update-user/:id', user_1.updateUserById);
    app["delete"]('/users/delete/:id', store_1.authorizationUser, user_1.deleteUser);
    app["delete"]('/users/delete-user/:id', user_1.deleteUser);
};
exports["default"] = user_routes;
