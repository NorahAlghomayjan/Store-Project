import app from '../server';
import supertest from 'supertest';
import {
    Order,
    OrdersProducts,
    Product,
    Status,
    User,
    UserAndToken,
} from '../@types/store';
import { getRandom } from './userSpec';
import { createOrder } from './orderSpec';
import { createProduct } from './productSpec';
import { OrdersProductsRecord } from '../models/orders_products';

const request = supertest(app);

const productModel = new OrdersProductsRecord();

describe('Top 5 most popular products', () => {
    it('index method should return a list', async () => {
        expect(
            (await productModel.topOrderedProducts(5)).length
        ).toBeLessThanOrEqual(5);
    });
});

describe('Testing Products Endpoints', () => {
    let userAndToken: UserAndToken;
    let initalOrdersProduct: OrdersProducts;
    let initialOrder: Order;
    let initialProduct: Product;

    beforeAll(async () => {
        // 1. create user
        userAndToken = await createUserForOrders_products();

        //2. create order
        initialOrder = await createOrder(userAndToken);

        //3. create product
        initialProduct = await createProduct(userAndToken);

        //4. add product to order

        const productToOrder: Omit<OrdersProducts, 'id'> = {
            quantity: 5,
            product_id: initialProduct.id,
            order_id: initialOrder.id,
        };

        let res = await request
            .post('/orders-products/addProduct')
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
        const res = await request
            .get('/orders-products/topProducts/5')
            .expect(200);

        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

async function createUserForOrders_products() {
    const user: Omit<User, 'id'> = {
        firstname: `Norah${getRandom(1, 100)}`,
        lastname: 'OrdersProduct',
        password: '1234',
        email: `norahOrdersProduct${getRandom(1, 100)}@email.com`,
    };

    const res = await request
        .post('/users/new')
        .send(user)
        .set('Accept', 'application/json');

    //console.log('res.body :', res.body);

    return res.body;
}
