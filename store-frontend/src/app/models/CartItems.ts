import { Product } from './Product';

export type CartItems = {
    product_id: number;
    item_id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    category: string;
    amount: number;
};
