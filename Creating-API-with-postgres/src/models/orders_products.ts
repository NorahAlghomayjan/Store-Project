import { OrdersProducts } from '../@types/store';
import client from '../database';

export class OrdersProductsRecord {
    /* helping methods */
    static async connection(
        sql: string,
        values: unknown[]
    ): Promise<OrdersProducts[]> {
        try {
            const conn = await client.connect();
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    /* CRUD methods */

    /* 1 - return all orders and products*/
    async findAll(): Promise<OrdersProducts[]> {
        try {
            const sql = 'SELECT * FROM orders_products';
            const resultRows = await OrdersProductsRecord.connection(sql, []);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 2 - return all ordered products */
    async findAllOrderedProducts(): Promise<OrdersProducts[]> {
        try {
            const sql =
                'SELECT DISTINCT op.product_id , p.name , p.category FROM orders_products op INNER JOIN products p ON p.id=op.product_id ORDER BY op.product_id ASC';
            const resultRows = await OrdersProductsRecord.connection(sql, []);
            console.log('resultRows', resultRows);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 3 - find product_id where order_id */
    async checkIfProductExistInOrder(
        order_id: number,
        product_id: number
    ): Promise<OrdersProducts[]> {
        try {
            const sql =
                'SELECT * FROM orders_products WHERE order_id=($1) AND product_id=($2)';
            const resultRows = await OrdersProductsRecord.connection(sql, [
                order_id,
                product_id,
            ]);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 4 - add product to order */
    async addProductToOrder(
        quantity: number,
        product_id: number,
        order_id: number
    ): Promise<OrdersProducts[]> {
        try {
            const sql =
                'INSERT INTO orders_products(quantity,product_id,order_id) VALUES ($1,$2,$3) RETURNING *';
            const resultRows = await OrdersProductsRecord.connection(sql, [
                quantity,
                product_id,
                order_id,
            ]);

            console.log('resultRows', resultRows);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 5 - increase quantity */

    async changeQuantity(
        quantity: number,
        id: number
    ): Promise<OrdersProducts[]> {
        try {
            const sql =
                'UPDATE orders_products SET quantity = ($1) WHERE id=($2) RETURNING *';
            const resultRows = await OrdersProductsRecord.connection(sql, [
                quantity,
                id,
            ]);

            console.log('resultRows', resultRows);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }
    // `SELECT (p.id AS id , p.name AS name , p.price AS price , p.url AS url , p.description AS description , p.category AS category) AS product , op.quantity AS amount FROM orders_products op JOIN products p ON  op.product_id = p.id  WHERE order_id= ($1)`;

    async getAllProductsOfOrder(order_id: number): Promise<OrdersProducts[]> {
        try {
            const sql = `SELECT p.id AS product_id , p.name  , p.price  , p.url , p.description  , p.category , op.id AS item_id , op.quantity AS amount FROM orders_products op JOIN products p ON  op.product_id = p.id  WHERE order_id= ($1)`;
            const resultRows = await OrdersProductsRecord.connection(sql, [
                order_id,
            ]);

            console.log('resultRows', resultRows);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 6 - top ordered produts */

    async topOrderedProducts(number: number): Promise<OrdersProducts[]> {
        try {
            const sql =
                'SELECT * FROM products p INNER JOIN ( SELECT op.product_id , COUNT(op.product_id) AS ordered_times FROM orders_products op GROUP BY op.product_id)op ON p.id=op.product_id ORDER BY op.ordered_times DESC LIMIT ($1)';
            const resultRows = await OrdersProductsRecord.connection(sql, [
                number,
            ]);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(item_id: number) {
        try {
            const sql =
                'DELETE FROM orders_products op WHERE op.id = ($1) RETURNING *';
            const resultRows = await OrdersProductsRecord.connection(sql, [
                item_id,
            ]);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }
}
