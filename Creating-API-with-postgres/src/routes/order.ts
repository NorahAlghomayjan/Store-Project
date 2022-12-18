import express from 'express';
import {
    index,
    compeletedOrders,
    createOrder,
    currentOrdersOfUser,
    deleteOrder,
    show,
    updateOrderById,
    findCurrentOrderOfUser,
    updateOrderByUserId,
} from '../controllers/order';
import {
    authenticate,
    authorizationOrder,
    authorizationViewOrder,
} from '../middlewares/store';

export const orders_routes = (app: express.Application): void => {
    app.get('/orders', authenticate, index);
    app.get('/orders/:id', authenticate, show);
    app.get(
        '/orders/:userId/compeleted',
        authorizationViewOrder,
        compeletedOrders
    );
    app.get('/orders/:userId/current-order', authenticate, currentOrdersOfUser);
    app.get('/orders/:userId/current-order2', findCurrentOrderOfUser);
    app.post('/orders/new', authenticate, createOrder);
    app.post('/orders/newOrder', createOrder);
    app.put('/orders/update/:id', authorizationOrder, updateOrderById);
    app.put('/orders/update-order/', updateOrderByUserId);
    app.delete('/orders/delete/:id', authorizationOrder, deleteOrder);
    app.delete('/orders/delete-order/:id', deleteOrder);
};
