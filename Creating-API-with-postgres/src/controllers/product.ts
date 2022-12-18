import express from 'express';
import { ProductRecord } from '../models/product';

const productModel = new ProductRecord();

//1
export const index = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const users = await productModel.findAll();

    res.status(200).json(users);
};

//2
export const show = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const product = await productModel.findById(parseInt(req.params.id));
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

//3
export const createProduct = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { description, name, price, category, user_id, url } = req.body;

    //console.log('user_id :', user_id);

    const newProduct = {
        description: description,
        name: name,
        price: price,
        category: category,
        user_id: user_id,
        url: url,
    };

    try {
        const savedProduct = await productModel.create(newProduct);
        res.status(200).json(savedProduct);
    } catch (err) {
        console.log('error in crerate product');
        res.status(400).json({ error: err });
    }
};

//4
export const updateProductById = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { description, name, price, category, user_id, url } = req.body;

    const newProduct = {
        id: parseInt(req.params.id),
        description: description,
        name: name,
        price: price,
        category: category,
        user_id: user_id,
        url: url,
    };

    try {
        const updatedProduct = await productModel.updateById(newProduct);
        res.status(200).json({
            message: 'product updated successfully',
            prodcut: updatedProduct,
        });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

//5
export const deleteProduct = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const deletedProduct = await productModel.delete(
            parseInt(req.params.id)
        );
        res.status(200).json({
            message: 'product deleted successfully',
            prodcut: deletedProduct,
        });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

//6
export const prodcutsByCategory = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const productsOfCategory = await productModel.findByCategory(
            req.params.category
        );
        res.status(200).json(productsOfCategory);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};
