import express from 'express';
import { Order, OrdersProducts, Status } from '../@types/store';
import { OrderRecord } from '../models/order';
import { OrdersProductsRecord } from '../models/orders_products';

const ordersProductsModel = new OrdersProductsRecord();
const orderModel = new OrderRecord();

/*
    this controller holds any request that's shared between two tables.
*/

// 1
export const findAllOrderedProducts = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const result = await ordersProductsModel.findAllOrderedProducts();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};

// 2
export const topProducts = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const numberOfProducts: number = parseInt(req.params.number);
        const result = await ordersProductsModel.topOrderedProducts(
            numberOfProducts
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};

// 3

/*
    to add product to order, WEE HAVE TO:

    check if order exist by looking in database by order id:
        1. if order exist AND status == active:

                1.1 check if product exist in the order:

                    - if product exist in the order
                        => increase product quantity.

                    - if product doesn't exist in the order
                        => add product to the order.

        2. if order doesn't exist OR status == compeleted.

                => created new order.
                => add product to this order.
*/
export const addProductToOrder = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { quantity, product_id, order_id, user_id } = req.body;

    try {
        // look for  order
        const orders: Order[] = await orderModel.findById(order_id);

        // check if order exist and its status is active.
        if (
            orders.length &&
            orders[0].user_id == parseInt(user_id) &&
            orders[0].status == Status.active
        ) {
            const productOfOrder: OrdersProducts[] =
                await ordersProductsModel.checkIfProductExistInOrder(
                    order_id,
                    product_id
                );

            // check if product exist in the found order.
            if (productOfOrder.length) {
                // if exist => increase quantity of the product.

                const orderProduct: OrdersProducts[] =
                    await ordersProductsModel.changeQuantity(
                        quantity + productOfOrder[0].quantity,
                        productOfOrder[0].id
                    );

                res.status(200).json(orderProduct);
                return;
            } else {
                // if not exist => add product to order
                const result: OrdersProducts[] =
                    await ordersProductsModel.addProductToOrder(
                        quantity,
                        product_id,
                        order_id
                    );

                res.status(200).json(result);
                return;
            }
        } else {
            // if order is not exist or its status is compeleted => open new order

            const newOrder: Order[] = await orderModel.create({
                status: Status.active,
                user_id: user_id,
            });
            const result = await ordersProductsModel.addProductToOrder(
                quantity,
                product_id,
                newOrder[0].id
            );
            res.status(200).json(result);
            return;
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};
//4

export const getAllProductsOfOrder = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const order_id = parseInt(req.params.order_id);

    try {
        const result = await ordersProductsModel.getAllProductsOfOrder(
            order_id
        );
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};

//5

export const changeQuantity = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const item_id = parseInt(req.body.item_id);
    const quantity = parseInt(req.body.quantity);

    try {
        const result = await ordersProductsModel.changeQuantity(
            quantity,
            item_id
        );
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};

export const removeProduct = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const item_id = parseInt(req.params.item_id);

    try {
        const result = await ordersProductsModel.removeProduct(item_id);
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error,
        });
    }
};
