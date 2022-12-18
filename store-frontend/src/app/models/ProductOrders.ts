import { Order, Status } from './Order';
import { Product } from './Product';

export class ProductOrders {
    id: number;
    product: Product;
    order: Order;
    amount: number;
    constructor() {
        this.id = 1;
        this.product = {
            id: 1,
            name: '',
            price: 0.0,
            url: '',
            description: '',
            category: '',
        };
        this.order = {
            id: 0,
            status: Status.active,
        };
        this.amount = 1;
    }
}
