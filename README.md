# Storefront & Backend Project

```
THE DATABASE IS RUNNING ON PORT 5432
THE BACK-END APPLICATION RUN ON PORT 3000
THE FRONT-END APPLICATION RUN ON PORT 4200
```

## Getting Started
First, cd to (store-backend):
    * install dependencies.
    * setup .env file
    * create the realted databases.
    * run migrations.
    * create the products needed to be shown in the store.
Then cd to (store-frontend):
    * install dependencies.
    * run (ng serve)

### store-backend


1. run the following command to install all dependencies:
    ```npm i```

2. create 2 databases:
    ```
    CREATE DATABASE db_name_dev;
    CREATE DATABASE db_name_test;

    GRANT ALL PRIVILEGES ON DATABASE db_name_dev TO username;
    GRANT ALL PRIVILEGES ON DATABASE db_name_test TO username;
    ```

3. create .env file and write inside it the following and change(db_name_dev , db_name_tes , username , password);

    ```
    HOST=127.0.0.1
    DB=db_name_dev
    DB_TEST=db_name_tes
    USER=username
    PASSWORD=password
    PORT=3000
    ENV=test
    BCRYPT_PASSWORD= your-secret-password 
    SALT_ROUND=10
    TOKEN_SECRET=token1234
    ADDRESS=0.0.0.0:3000
    ```

3. run migrations:
    to run migration in dev mode:
    ```ENV=dev db-migrate up```

    to run migration in test mode (default mode):
    ```db-migrate up```

4. to run tests:
    ```run npm test```

5. to run in dev mode:
    ```ENV=dev npm run watch```

6.To run front-end, products need to be created.
    cd to store-backend.
    Using (postman) go the route:
    ( /products/new-product ) [POST] like the follwing image:

![Alt text](assets/creating-product.png"how to add new product..")

#### Tables in databaase:
there are 4 tables:

##### users
    id
    firstname
    lastname
    password
    email (should be unique)

##### orders
    id
    status
    user_id

##### products
    id
    description
    name
    price
    category
    user_id
    url

##### orders_products
    id
    quantity
    order_id
    product_id


### store-fontend

1. cd to store-fontend.
2. install dependencies:
```
    npm i
``` 
3. run the application:
    ng serve.
#### Routes needed to run front-end (Without Auth):

start by creating products using (postman) using the follwing route:

##### products Route:

- Create [authentication required] 
    ( /products/new-product ) [POST]

![Alt text](assets/creating-product.png "how to add body to create new product")