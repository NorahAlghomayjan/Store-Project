import { Order, Status } from '../@types/store';
import client from '../database';

export class OrderRecord {
    /* helping methods */
    static async connection(sql: string, values: unknown[]): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const result = await conn.query(sql, values);

            conn.release();

            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    /* CRUD methods */

    //1
    async findAll(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders';
            const resultRows = await OrderRecord.connection(sql, []);

            return resultRows;
        } catch (err) {
            throw err;
        }
    }

    //2
    async findById(id: number): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const resultRows = await OrderRecord.connection(sql, [id]);

            return resultRows;
        } catch (err) {
            throw err;
        }
    }

    //3
    async findByUserIdAndStatus(
        user_id: number,
        status: Status
    ): Promise<Order[]> {
        try {
            const sql2 =
                'SELECT u.firstname , u.lastname, u.id AS user_id , o.id AS order_id , o.status FROM orders o INNER JOIN users u ON u.id = o.user_id WHERE user_id=($1) AND status=($2)';
            const resultRows = await OrderRecord.connection(sql2, [
                user_id,
                status,
            ]);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    async findByUserIdAndStatus2(
        user_id: number,
        status: Status
    ): Promise<Order[]> {
        try {
            const sql2 =
                'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const resultRows = await OrderRecord.connection(sql2, [
                user_id,
                status,
            ]);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    //4
    async create(order: Omit<Order, 'id'>): Promise<Order[]> {
        try {
            const sql =
                'INSERT INTO orders(status,user_id) VALUES ($1,$2) RETURNING *';

            const resultRows = await OrderRecord.connection(sql, [
                order.status,
                order.user_id,
            ]);

            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    //5
    async updateById(order: Order): Promise<Order[]> {
        try {
            const sql =
                'UPDATE orders SET status = ($1) WHERE id=($2)RETURNING *';
            const values = [order.status, order.id];

            const resultRows = await OrderRecord.connection(sql, values);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    async updateByUserId(order: Order): Promise<Order[]> {
        try {
            const sql =
                'UPDATE orders SET status = ($1) WHERE user_id=($2) RETURNING *';
            const values = [order.status, order.user_id];

            const resultRows = await OrderRecord.connection(sql, values);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }

    //6
    async delete(id: number): Promise<Order[]> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const resultRows = await OrderRecord.connection(sql, [id]);
            return resultRows;
        } catch (error) {
            throw error;
        }
    }
}
