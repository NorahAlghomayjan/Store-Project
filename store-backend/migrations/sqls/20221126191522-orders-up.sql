/* Replace with your SQL commands */

CREATE TYPE order_status AS ENUM ('ACTIVE', 'COMPELETED');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status order_status ,
    user_id BIGINT REFERENCES users(id)
);