import express from 'express';
import {
    addProductToOrder,
    changeQuantity,
    findAllOrderedProducts,
    getAllProductsOfOrder,
    removeProduct,
    topProducts,
} from '../controllers/orders_products';

export const orders_products_routes = (app: express.Application): void => {
    app.get('/orders-products/allProducts', findAllOrderedProducts);
    app.post('/orders-products/addProduct', addProductToOrder);
    app.put('/orders-products/change-quantity', changeQuantity);
    app.get('/orders-products/topProducts/:number', topProducts);
    app.get(
        '/orders-products/all-products-order/:order_id',
        getAllProductsOfOrder
    );
    app.delete('/orders-products/remove-product/:item_id', removeProduct);
};
