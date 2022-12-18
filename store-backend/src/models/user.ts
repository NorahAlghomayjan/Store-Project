import client from '../database';
import { User } from '../@types/store';

export class UserRecord {
    // 1. return all users.
    findAll = async (): Promise<User[]> => {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await client.connect();
            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`coudn't find users ${err}`);
        }
    };

    //2. find user by id.
    findById = async (id: number): Promise<User[]> => {
        try {
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            const users: User[] = result.rows;

            return users;
        } catch (error) {
            throw error;
        }
    };

    //3. find user by username.
    findByname = async (
        firstName: string,
        lastName: string | null
    ): Promise<User[]> => {
        try {
            const sql =
                'SELECT * FROM users WHERE firstname = ($1) AND lastname = ($2)';
            const conn = await client.connect();

            const result = await conn.query(sql, [firstName, lastName]);

            conn.release();
            console.log('result', result);
            console.log('firstName, lastName', firstName, lastName);

            return result.rows;
        } catch (err) {
            throw err;
        }
    };

    //4.find user by email

    findByEmail = async (email: string): Promise<User[]> => {
        try {
            const sql = 'SELECT * FROM users WHERE email = ($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [email]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw err;
        }
    };

    //4. create new user.
    create = async (user: Omit<User, 'id'>): Promise<User[]> => {
        try {
            const sql =
                'INSERT INTO users(firstName,lastName,password,email) VALUES ($1,$2,$3 ,$4) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.password,
                user.email,
            ]);
            conn.release();

            const users: User[] = result.rows;

            return users;
        } catch (err) {
            throw err;
        }
    };

    //5. update user.
    updateById = async (user: User): Promise<User[]> => {
        try {
            const sql =
                'UPDATE users SET firstname=($1),lastname=($2),password=($3),email=($4) WHERE id=($5) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.password,
                user.email,
                user.id,
            ]);

            conn.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    //6. delete user
    delete = async (id: number): Promise<User[]> => {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    };
}
