import express from 'express';
import {
    index,
    createProduct,
    deleteProduct,
    prodcutsByCategory,
    show,
    updateProductById,
} from '../controllers/product';
import { authenticate, authorizationProduct } from '../middlewares/store';

const product_routes = (app: express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/category/:category', prodcutsByCategory);
    app.post('/products/new', authenticate, createProduct);
    app.post('/products/new-product', createProduct);
    app.put('/products/update/:id', authorizationProduct, updateProductById);
    app.delete('/products/delete/:id', authorizationProduct, deleteProduct);
    app.delete('/products/delete-prodduct/:id', deleteProduct);
};

export default product_routes;
