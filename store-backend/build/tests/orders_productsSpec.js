"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const userSpec_1 = require("./userSpec");
const orderSpec_1 = require("./orderSpec");
const productSpec_1 = require("./productSpec");
const orders_products_1 = require("../models/orders_products");
const request = (0, supertest_1.default)(server_1.default);
const productModel = new orders_products_1.OrdersProductsRecord();
describe('Top 5 most popular products', () => {
    it('index method should return a list', async () => {
        expect((await productModel.topOrderedProducts(5)).length).toBeLessThanOrEqual(5);
    });
});
describe('Testing Products Endpoints', () => {
    let userAndToken;
    let initalOrdersProduct;
    let initialOrder;
    let initialProduct;
    beforeAll(async () => {
        // 1. create user
        userAndToken = await createUserForOrders_products();
        //2. create order
        initialOrder = await (0, orderSpec_1.createOrder)(userAndToken);
        //3. create product
        initialProduct = await (0, productSpec_1.createProduct)(userAndToken);
        //4. add product to order
        const productToOrder = {
            "quantity": 5,
            "product_id": initialProduct.id,
            "order_id": initialOrder.id,
        };
        let res = await request.post('/orders-products/addProduct')
            .send(productToOrder)
            .set('Accept', 'application/json');
        initalOrdersProduct = res.body[0];
    });
    afterAll(async () => {
        // 1. delete initial product
        await request
            .delete(`/products/delete/${initialProduct.id}`)
            .auth(userAndToken.token, { type: 'bearer' });
        // 2. delete iniital order
        await request
            .delete(`/orders/delete/${initialOrder.id}`)
            .auth(userAndToken.token, { type: 'bearer' });
        // 3. delete user.
        await request
            .delete(`/users/delete/${userAndToken.user.id}`)
            .auth(userAndToken.token, { type: 'bearer' });
    });
    it('/orders-products/topProducts/:number routes should be 200', async () => {
        const res = await request.get('/orders-products/topProducts/5')
            .expect(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});
async function createUserForOrders_products() {
    const user = {
        firstname: `Norah${(0, userSpec_1.getRandom)(1, 100)}`,
        lastname: 'OrdersProduct',
        password: '1234',
        email: `norahOrdersProduct${(0, userSpec_1.getRandom)(1, 100)}@email.com`,
    };
    const res = await request.post('/users/new')
        .send(user)
        .set('Accept', 'application/json');
    //console.log('res.body :', res.body);
    return res.body;
}
