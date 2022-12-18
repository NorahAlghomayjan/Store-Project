"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const store_1 = require("../@types/store");
const userSpec_1 = require("./userSpec");
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
const orderModel = new order_1.OrderRecord();
const userModel = new user_1.UserRecord();
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(orderModel.findAll).toBeDefined();
    });
    it('should have a current order method', () => {
        expect(orderModel.findByUserIdAndStatus).toBeDefined();
    });
    it('should have a create order method', () => {
        expect(orderModel.create).toBeDefined();
    });
});
describe('Testing Order Model Methods', () => {
    let newOrder;
    let newUser;
    beforeAll(async () => {
        // 1. create user:
        const user = {
            firstname: 'Noor',
            lastname: 'Order',
            password: '1234',
            email: 'NoorOrder@email.com',
        };
        newUser = await userModel.create(user);
        // 2. create new order
        const order = {
            status: store_1.Status.active,
            user_id: newUser[0].id,
        };
        newOrder = await orderModel.create(order);
    });
    afterAll(async () => {
        await orderModel.delete(newOrder[0].id);
        //await userModel.delete(newUser[0].id);
    });
    it('index method should return a list', async () => {
        expect(await orderModel.findAll()).not.toEqual([]);
    });
    it('create method should return list of created ordres', async () => {
        const order = {
            status: store_1.Status.compeleted,
            user_id: newUser[0].id,
        };
        const createdOrder = await orderModel.create(order);
        expect(await orderModel.create(order)).not.toEqual([]);
        await orderModel.delete(createdOrder[0].id);
    });
    it('Current Orders by user', async () => {
        expect((await orderModel.findByUserIdAndStatus(newUser[0].id, store_1.Status.active)).pop()?.user_id).toBeGreaterThanOrEqual(1);
    });
    it('Completed Orders by user', async () => {
        const orders = await orderModel.findByUserIdAndStatus(newUser[0].id, store_1.Status.compeleted);
        expect(orders.length).toBeGreaterThanOrEqual(0);
    });
});
describe('Testing Order Endpoints', () => {
    let userAndToken;
    let initialOrder;
    beforeAll(async () => {
        // 1. create user
        userAndToken = await createUserForOrder();
        //console.log('token in productSpec :', userAndToken.token);
        // 2. create order
        initialOrder = await createOrder(userAndToken);
    });
    afterAll(async () => {
        // 1. delete iniital order
        await request
            .delete(`/orders/delete/${initialOrder.id}`)
            .auth(userAndToken.token, { type: 'bearer' });
        // 2. delete user.
        await request
            .delete(`/users/delete/${userAndToken.user.id}`)
            .auth(userAndToken.token, { type: 'bearer' });
        //console.log('deletedUser  :', deletedUser);
    });
    it('/orders/:userId/current-order route to be 200 ', () => {
        request.get(`/orders/${userAndToken.user.id}/current-order`)
            .auth(userAndToken.token, {
            type: 'bearer'
        })
            .expect(200);
    });
    it('/orders/:userId/compeleted route to be 200 ', async () => {
        initialOrder.status = store_1.Status.compeleted;
        await request.get(`/orders/${userAndToken.user.id}/compeleted`)
            .auth(userAndToken.token, {
            type: 'bearer'
        })
            .expect(200);
    });
});
async function createOrder(userAndToken) {
    const res = await request
        .post('/orders/new')
        .auth(userAndToken.token, { type: 'bearer' })
        .send({
        status: store_1.Status.active
    });
    return res.body[0];
}
exports.createOrder = createOrder;
async function createUserForOrder() {
    const user = {
        firstname: `Norah${(0, userSpec_1.getRandom)(1, 100)}`,
        lastname: 'Order',
        password: '1234',
        email: `norahOrder${(0, userSpec_1.getRandom)(1, 100)}@email.com`,
    };
    const res = await request.post('/users/new')
        .send(user)
        .set('Accept', 'application/json');
    //console.log('res.body :', res.body);
    return res.body;
}
