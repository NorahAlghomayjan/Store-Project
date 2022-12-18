import app from '../server';
import supertest from 'supertest';
import { Product, User, UserAndToken } from '../@types/store';
import { getRandom } from './userSpec';
import { ProductRecord } from '../models/product';
import { UserRecord } from '../models/user';

const request = supertest(app);

const productModel = new ProductRecord();
const userModel = new UserRecord();

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(productModel.findAll).toBeDefined();
    });
    it('should have a show method', () => {
        expect(productModel.findById).toBeDefined();
    });
    it('should have a create method', () => {
        expect(productModel.create).toBeDefined();
    });
});

describe('Testing Product Model Methods', () => {
    let newProduct: Product[];
    let newUser: User[];
    beforeAll(async () => {
        // 1. create user:
        const user: Omit<User, 'id'> = {
            firstname: 'Noor',
            lastname: 'Product',
            password: '1234',
            email: 'NoorProduct@email.com',
        };
        newUser = await userModel.create(user);

        const product: Omit<Product, 'id'> = {
            description: 'Biscreem ',
            name: 'Biscreem Biscuite',
            price: 2.0,
            category: 'chocolate',
            user_id: newUser[0].id,
            url: '',
        };

        newProduct = await productModel.create(product);
    });

    afterAll(async () => {
        await productModel.delete(newProduct[0].id);
    });

    it('index method should return a list', async () => {
        expect(await productModel.findAll()).not.toEqual([]);
    });

    it('product create should return list of created porducts', async () => {
        const product: Omit<Product, 'id'> = {
            description: 'Mammool ',
            name: 'Mammool dates',
            price: 2.0,
            category: 'desert',
            user_id: newUser[0].id,
            url: '',
        };

        expect(await productModel.create(product)).not.toEqual([]);
    });

    it('index show should return list of products that match the sent id', async () => {
        expect((await productModel.findById(newProduct[0].id)).id).toEqual(
            newProduct[0].id
        );
    });

    it('products by category product should return list of products that is under sent category.', async () => {
        expect(await productModel.findByCategory('chocolate')).not.toEqual([]);
    });
});

describe('Testing Products Endpoints', () => {
    let token: string;
    let userAndToken: UserAndToken;
    let initialProduct: Product;

    beforeAll(async () => {
        // 1. create user
        userAndToken = await createUserForProduct();
        token = userAndToken.token;
        //console.log('token in productSpec :', userAndToken.token);

        //2 create product
        initialProduct = await createProduct(userAndToken);
    });

    afterAll(async () => {
        // delete inital product

        await request
            .delete(`/products/delete/${initialProduct.id}`)
            .auth(token, { type: 'bearer' });

        // delete user.
        await request
            .delete(`/users/delete/${userAndToken.user.id}`)
            .auth(token, { type: 'bearer' });

        //console.log('deletedUser  :', deletedUser);
    });

    it('/products routes should be 200', async () => {
        await request.get('/products').expect(200);
    });

    it('/products/:id routes should be 200 ', async () => {
        await request.get(`/products/${initialProduct.id}`).expect(200);
    });

    it('/products/new routes should be 200', async () => {
        const products: Omit<Product, 'id'>[] = productsArray(userAndToken);
        const product = products[getRandom(1, 6)];

        //console.log(product);

        //1 create new product
        const res = await request
            .post('/products/new')
            .auth(token, {
                type: 'bearer',
            })
            .send(product)
            .expect(200);

        const createdProduct: Product = res.body[0];

        // 2 delete newly created product
        await request
            .delete(`/products/delete/${createdProduct.id}`)
            .auth(token, { type: 'bearer' });
    });

    it(`/products/category/:category routes should be 200`, async () => {
        const res = await request
            .get(`/products/category/${initialProduct.category}`)
            .expect(200);
        expect(res.body[0].category).toEqual(`${initialProduct.category}`);
    });
});

export function productsArray(userAndToken: UserAndToken) {
    const products: Omit<Product, 'id'>[] = [
        {
            description: 'Kit Kat chocolate 🍫  ',
            name: 'Kit Kat',
            price: 1.5,
            category: 'chocolate',
            user_id: userAndToken.user.id,
            url: '',
        },
        {
            description: 'Break chocolate 🍫  ',
            name: 'Break',
            price: 2,
            category: 'chocolate',
            user_id: userAndToken.user.id,
            url: '',
        },
        {
            description: 'Tuna  ',
            name: 'Sunrise Tuna',
            price: 3,
            category: 'Fish',
            user_id: userAndToken.user.id,
            url: '',
        },
        {
            description: 'pototo chips ',
            name: 'FishFash',
            price: 1,
            category: 'chips',
            user_id: userAndToken.user.id,
            url: '',
        },
        {
            description: 'rice ',
            name: 'rice',
            price: 10,
            category: 'carbs',
            user_id: userAndToken.user.id,
            url: '',
        },
        {
            description: 'cherry tomato  ',
            name: 'tomato',
            price: 1.5,
            category: 'vegetables',
            user_id: userAndToken.user.id,
            url: '',
        },
    ];

    return products;
}

export async function createProduct(userAndToken: UserAndToken) {
    const products: Omit<Product, 'id'>[] = productsArray(userAndToken);
    let random: number = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    const product = products[random];

    //console.log("product from createProduct():" , product);

    const res = await request
        .post('/products/new')
        .auth(userAndToken.token, {
            type: 'bearer',
        })
        .send(product);

    return res.body[0];
}

async function createUserForProduct() {
    const user: Omit<User, 'id'> = {
        firstname: `Noraht${getRandom(1, 100)}`,
        lastname: 'Product',
        password: '1234',
        email: `norahProduct${getRandom(1, 100)}@email.com`,
    };

    const res = await request
        .post('/users/new')
        .send(user)
        .set('Accept', 'application/json');

    //console.log('res.body :', res.body);

    return res.body;
}
