import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Order, User } from '../@types/store';
import { OrderRecord } from '../models/order';
import { ProductRecord } from '../models/product';

const product_model = new ProductRecord();
const orderModel = new OrderRecord();

type Decode = {
    user: User;
    iat: number;
};

/* helping method */
const extractUserId = (req: express.Request): Decode => {
    try {
        const authorizationHeader = req.headers.authorization || '';
        const token = authorizationHeader.split(' ')[1];
        const secretToken: string = process.env.TOKEN_SECRET || '';
        const decode = jwt.verify(token, secretToken) as Decode;

        return decode;
    } catch (error) {
        throw error;
    }
};

/* check if user is logged or signed-up */
export const authenticate = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): void => {
    try {
        const header = req.headers.authorization || '';
        const token = header.split(' ')[1];
        const secretToken = process.env.TOKEN_SECRET || '';

        const decode = jwt.verify(token, secretToken) as {
            user: User;
            iat: number;
        };
        req.body.user_id = decode.user.id;

        next();
    } catch (err) {
        res.status(401);
        res.json(
            `Access denied, user should login, invalid token , error: ${err}`
        );
    }
};

/* check if user is allowed to view order (user should be the one who owns the order) */
export const authorizationViewOrder = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): Promise<void> => {
    try {
        const decode: Decode = extractUserId(req);

        const userId: number = decode.user.id;
        const user_id: number = parseInt(req.params.userId);

        if (userId !== user_id) {
            res.status(400).json({
                meessge: 'user is not authorized to view orders',
            });
            return;
        }

        next();
    } catch (err) {
        console.log('catch authorizing ORDER..');
        res.status(401).json({ error: `${err}` });
    }
};

/* check if user is allowed to update order (user should be the one who owns the order) */
export const authorizationOrder = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): Promise<void> => {
    try {
        const decode: Decode = extractUserId(req);

        const userId: number = decode.user.id;
        const orderId: number = parseInt(req.params.id);

        const order: Order[] = await orderModel.findById(orderId);
        if (!order.length) {
            res.status(400).json({
                meessge: 'not found order',
            });
            return;
        }
        const orderUserId = order[0].user_id as unknown as string;

        if (userId !== parseInt(orderUserId)) {
            res.status(400).json({
                meessge: 'user is not authorized to view or edit this order',
            });
            return;
        }
        req.body.user_id = userId;

        next();
    } catch (err) {
        console.log('catch authorizing ORDER..');
        res.status(401).json({ error: `${err}` });
    }
};

/* check if user is allowed to update product (user should be the one who created the product) */
export const authorizationProduct = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): Promise<void> => {
    try {
        const decode: Decode = extractUserId(req);

        const product = await product_model.findById(parseInt(req.params.id));

        if (decode.user.id != product.user_id) {
            console.log(
                'decode.user.id:',
                decode.user.id,
                'product.user_id',
                product.user_id
            );

            res.status(400).json({
                meessge:
                    'user is not authorized to edit or delete this product',
            });
            return;
        }
        console.log('finished authorizing..');

        next();
    } catch (err) {
        console.log('catch authorizing PRODUCT..');

        res.status(401);
        res.json(err);
    }
};

/* check if user is allowed to update user (user should be himself/herself ) */

export const authorizationUser = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): void => {
    try {
        const header = req.headers.authorization || '';
        const token = header.split(' ')[1];
        const secretToken = process.env.TOKEN_SECRET || '';

        const decode = jwt.verify(token, secretToken) as {
            user: User;
            iat: number;
        };

        if (decode.user.id !== parseInt(req.params.id)) {
            res.status(401).json({
                message: 'user is not allowed to edit or view this user',
            });
            return;
        }

        next();
    } catch (error) {
        res.status(401);
        res.json(
            `Access denied, user should login, invalid token , error: ${error}`
        );
    }
};
