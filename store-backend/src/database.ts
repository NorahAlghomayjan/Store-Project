import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, DB, DB_TEST, PASSWORD, ENV, USER } = process.env;

let client: Pool;

if (ENV == 'test') {
    client = new Pool({
        host: HOST,
        database: DB_TEST,
        user: USER,
        password: PASSWORD,
    });
} else {
    client = new Pool({
        host: HOST,
        database: DB,
        user: USER,
        password: PASSWORD,
    });
}

console.log('--------- \n DB:', DB);
console.log('--------- \n ENV:', ENV);
export default client;
