/* Replace with your SQL commands */
CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        description TEXT,
        name VARCHAR(250),
        price DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
        category VARCHAR(250),
        url TEXT,
        user_id BIGINT REFERENCES users (id)
    );