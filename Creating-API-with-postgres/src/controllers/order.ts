import { OrderRecord } from '../models/order';
import express from 'express';
import { Order, Status } from '../@types/store';

const orderModel = new OrderRecord();

// 1
export const index = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const orders = await orderModel.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 2
export const show = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const foundOrder = await orderModel.findById(id);
        res.status(200).json(foundOrder);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 3
export const compeletedOrders = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.userId);
        //console.log('id :', id);
        //console.log('Status.compeleted :', Status.compeleted);

        const foundOrders = await orderModel.findByUserIdAndStatus(
            id,
            Status.compeleted
        );
        res.status(200).json(foundOrders);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 4
export const currentOrdersOfUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.userId);
        //console.log('id :', id);
        //console.log('Status.compeleted :', Status.active);

        const foundOrders = await orderModel.findByUserIdAndStatus(
            id,
            Status.active
        );
        res.status(200).json(foundOrders);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 5
export const createOrder = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { status, user_id } = req.body;

        const order: Omit<Order, 'id'> = {
            status: status,
            user_id: user_id,
        };
        const newOrder: Order[] = await orderModel.create(order);

        res.status(200).json(newOrder);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 6
export const updateOrderById = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { status, user_id } = req.body;

        const order: Order = {
            id: parseInt(req.params.id),
            status: status,
            user_id: user_id,
        };
        const updatedOrder = await orderModel.updateById(order);

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 6
export const updateOrderByUserId = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { status, user_id } = req.body;

        const order: Order = {
            id: parseInt(req.params.id),
            status: status,
            user_id: user_id,
        };
        const updatedOrder = await orderModel.updateByUserId(order);

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// 7
export const deleteOrder = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);

        const deletedOrder = await orderModel.delete(id);

        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

//8

export const findCurrentOrderOfUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const user_id: number = parseInt(req.params.userId);

        const orders = await orderModel.findByUserIdAndStatus2(
            user_id,
            Status.active
        );

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        });
    }
};

// module.exports = {
//     allOrders,
//     orderById,
//     createOrder,
//     updateOrderById,
//     deleteOrder
// }
