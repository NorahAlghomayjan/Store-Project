"use strict";
// import { UserRecord } from "../models/user"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.login = void 0;
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
const userModel = new user_1.UserRecord();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(userModel.findAll).toBeDefined();
    });
    it('should have a show method', () => {
        expect(userModel.findById).toBeDefined();
    });
    it('should have a create method', () => {
        expect(userModel.create).toBeDefined();
    });
});
describe('Testing User Model Methods', () => {
    let userAndToken;
    let createdUser;
    beforeAll(async () => {
        // 1. create user:
        const user = {
            firstname: 'Noor',
            lastname: 'user',
            password: '1234',
            email: 'noorUser@email.com',
        };
        createdUser = await userModel.create(user);
    });
    afterAll(async () => {
        const deletedUser = await userModel.delete(createdUser[0].id);
        //console.log('deletedUser  :', deletedUser);
    });
    it('index method should return a list', async () => {
        expect((await userModel.findAll()).length).toBeGreaterThanOrEqual(1);
    });
    it('index create should return list of created users', async () => {
        // create user
        const user = {
            firstname: 'NoorTest',
            lastname: 'User',
            password: '1234',
            email: 'NoorTestUser@email.com',
        };
        const createdUser = await userModel.create(user);
        expect(createdUser).not.toEqual([]);
        //delete user
        await userModel.delete(createdUser[0].id);
    });
    it('index show should return list of users that match the sent id', async () => {
        expect((await userModel.findById(createdUser[0].id)).pop()?.firstname).toEqual('Noor');
    });
});
describe('Testing User Endpoints', () => {
    let userAndToken;
    beforeAll(async () => {
        // 1. create user:
        userAndToken = await createUser();
    });
    afterAll(async () => {
        const deletedUser = await request
            .delete(`/users/delete/${userAndToken.user.id}`)
            .auth(userAndToken.token, { type: 'bearer' })
            .expect(200);
        //console.log('deletedUser  :', deletedUser);
    });
    /* 1 */
    it('/users method should return 200 ', async () => {
        const res = await request
            .get('/users')
            .auth(userAndToken.token, { type: 'bearer' })
            .expect(200);
    });
    /* 2 */
    it('/users/:id route should return 200', async () => {
        const res = await request
            .get(`/users/${userAndToken.user.id}`)
            .auth(userAndToken.token, { type: 'bearer' })
            .expect(200);
    });
    /* 3 */
    it('/users/new route should return 200', async () => {
        const random = getRandom(1, 100);
        const user = {
            firstname: `Norah${random}`,
            lastname: 'Gh',
            password: '1234',
            email: `norah${random}@email.com`,
        };
        const res = await request.post('/users/new')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200);
        const createdUser = res.body;
        const deletedUser = await request
            .delete(`/users/delete/${createdUser.user.id}`)
            .auth(createdUser.token, { type: 'bearer' })
            .expect(200);
    });
});
/* Helping Methods */
/* 1 */
async function login() {
    const user = {
        firstname: `Norah${getRandom(1, 100)}`,
        lastname: 'Gh',
        password: '1234',
        email: `norah${getRandom(1, 100)}@email.com`,
    };
    const res = await request.post('/users/loginByEmail')
        .send(user)
        .set('Accept', 'application/json');
    return res.body.token;
}
exports.login = login;
/* 2 */
async function createUser() {
    const user = {
        firstname: `Norah${getRandom(1, 100)}`,
        lastname: 'User',
        password: '1234',
        email: `norahUser${getRandom(1, 100)}@email.com`,
    };
    const res = await request.post('/users/new')
        .send(user)
        .set('Accept', 'application/json');
    //console.log('res.body :', res.body);
    return res.body;
}
/* 3 */
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = (Math.floor(Math.random() * (max - min + 1) + min));
    //console.log('random =' , random);
    return random; // The maximum is inclusive and the minimum is inclusive
}
exports.getRandom = getRandom;
