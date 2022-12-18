export enum Status {
    active = 'ACTIVE',
    compeleted = 'COMPELETED',
}
export type Order = {
    id: number;
    status: Status;
    user_id: number;
};

export type OrdersProducts = {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
};

export type Product = {
    id: number;
    description: string;
    name: string;
    price: number;
    category: string;
    user_id: number;
    url: string;
};

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
};

export type UserAndToken = {
    token: string;
    user: User;
};
