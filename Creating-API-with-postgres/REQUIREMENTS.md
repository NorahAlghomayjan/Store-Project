# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    ' /products ' [GET]
- Show  
    ' /products/:id ' [GET]
- Create [token required] 
    ( /products/new ) [POST]
- [OPTIONAL] Top 5 most popular products  
    ' /orders-products/topProducts/:number ' [GET]
- [OPTIONAL] Products by category (args: product category) 
    ' /products/category/:category ' [GET]

#### Users
- Index [token required] 
    ' /users ' [GET]
- Show [token required] 
    ' /users/:id ' [GET]
- Create N[token required] 
    ' /users/new ' [POST]

#### Orders
- Current Order by user (args: user id)[token required]  
    ' /orders/:userId/current-order ' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 
    ' /orders/:userId/compeleted ' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### status
- active
- compeleted

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### OrdersProducts
- id
- product_id
- order_id
- quantity


## Tables
####  Product
    products(
        id: serial primary key,
        description:text,
        name: varchar,
        price:decimal,
        category:varchar,
        user_id:bigint [foreign key to users table]
    )

#### User
    users(
        id: serial primary key,
        firstname: varchar,
        lastname: varchar,
        password: varchar,
        email: text,
    )

#### status
    order_status AS ENUM ('ACTIVE', 'COMPELETED')

#### orders
    orders (
        id: serial primary key,
        status: order-status ,
        user_id: bigint [foreign key to users table]
    )

#### orders_products
    orders_products(
        id: serial primary key,
        quantity: integer,
        order_id: bigint [foreign key to orders table],
        product_id: bigint [foreign key to products table]
    )

