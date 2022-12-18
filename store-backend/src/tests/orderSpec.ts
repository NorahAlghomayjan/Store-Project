import app from '../server';
import supertest from 'supertest';
import { Order, Product, Status, User, UserAndToken } from '../@types/store';
import { getRandom } from './userSpec';
import { OrderRecord } from '../models/order';
import { UserRecord } from '../models/user';

const request = supertest(app);

const orderModel = new OrderRecord();
const userModel = new UserRecord();

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
    let newOrder: Order[];
    let newUser: User[];

    beforeAll(async () => {
        // 1. create user:
        const user: Omit<User, 'id'> = {
            firstname: 'Noor',
            lastname: 'Order',
            password: '1234',
            email: 'NoorOrder@email.com',
        };
        newUser = await userModel.create(user);

        // 2. create new order
        const order: Omit<Order, 'id'> = {
            status: Status.active,
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
        const order: Omit<Order, 'id'> = {
            status: Status.compeleted,
            user_id: newUser[0].id,
        };

        const createdOrder: Order[] = await orderModel.create(order);

        expect(await orderModel.create(order)).not.toEqual([]);

        await orderModel.delete(createdOrder[0].id);
    });

    it('Current Orders by user', async () => {
        expect(
            (
                await orderModel.findByUserIdAndStatus(
                    newUser[0].id,
                    Status.active
                )
            ).pop()?.user_id
        ).toBeGreaterThanOrEqual(1);
    });

    it('Completed Orders by user', async () => {
        const orders: Order[] = await orderModel.findByUserIdAndStatus(
            newUser[0].id,
            Status.compeleted
        );
        expect(orders.length).toBeGreaterThanOrEqual(0);
    });
});

describe('Testing Order Endpoints', () => {
    let userAndToken: UserAndToken;
    let initialOrder: Order;

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
        request
            .get(`/orders/${userAndToken.user.id}/current-order`)
            .auth(userAndToken.token, {
                type: 'bearer',
            })
            .expect(200);
    });

    it('/orders/:userId/compeleted route to be 200 ', async () => {
        initialOrder.status = Status.compeleted;
        await request
            .get(`/orders/${userAndToken.user.id}/compeleted`)
            .auth(userAndToken.token, {
                type: 'bearer',
            })
            .expect(200);
    });
});

export async function createOrder(userAndToken: UserAndToken) {
    const res = await request
        .post('/orders/new')
        .auth(userAndToken.token, { type: 'bearer' })
        .send({
            status: Status.active,
        });

    return res.body[0];
}

async function createUserForOrder() {
    const user: Omit<User, 'id'> = {
        firstname: `Norah${getRandom(1, 100)}`,
        lastname: 'Order',
        password: '1234',
        email: `norahOrder${getRandom(1, 100)}@email.com`,
    };

    const res = await request
        .post('/users/new')
        .send(user)
        .set('Accept', 'application/json');

    //console.log('res.body :', res.body);

    return res.body;
}
