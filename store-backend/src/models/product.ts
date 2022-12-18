import { Product } from '../@types/store';
import client from '../database';

export class ProductRecord {
    /* helping method */
    static async connection(
        sql: string,
        values: unknown[]
    ): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const result = await conn.query(sql, values);

            conn.release();

            return result.rows;
        } catch (err) {
            console.log('error in connection product model.');

            throw err;
        }
    }

    /* 1 */
    async findAll(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const resultRows = await ProductRecord.connection(sql, []);
            const products: Product[] = resultRows;
            return products;
        } catch (err) {
            throw err;
        }
    }

    /* 2 */
    async findById(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const resultRows = await ProductRecord.connection(sql, [id]);

            return resultRows[0];
        } catch (err) {
            throw err;
        }
    }

    /* 3 */
    async findByCategory(category: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const resultRows = await ProductRecord.connection(sql, [category]);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    /* 4 */
    async create(product: Omit<Product, 'id'>): Promise<Product[]> {
        try {
            const sql =
                'INSERT INTO products(description,name,price,category,url,user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';

            const resultRows = await ProductRecord.connection(sql, [
                product.description,
                product.name,
                product.price,
                product.category,
                product.url,
                product.user_id,
            ]);

            return resultRows;
        } catch (err) {
            console.log('error in creating product models.');

            throw err;
        }
    }

    /* 5 */
    async updateById(product: Product): Promise<Product[]> {
        try {
            const sql =
                'UPDATE products SET description = ($1) , name = ($2) , price = ($3) , category = ($4)   WHERE id = ($5) RETURNING *';
            const values = [
                product.description,
                product.name,
                product.price,
                product.category,
                product.id,
            ];

            const resultRows = await ProductRecord.connection(sql, values);
            return resultRows;
        } catch (err) {
            throw err;
        }
    }

    /* 6 */
    async delete(id: number): Promise<Product[]> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';

            const resultRows = await ProductRecord.connection(sql, [id]);
            return resultRows;
        } catch (err) {
            throw err;
        }
    }
}
