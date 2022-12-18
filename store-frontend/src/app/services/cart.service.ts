import { Injectable } from '@angular/core';
import { CartItems } from '../models/CartItems';
import { Order, Status } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrdersProducts } from '../models/OrdersProducts';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    total = 0.0;
    idCount = 1;
    Order: Order = { id: 0, status: Status.active };

    constructor(private http: HttpClient) {}

    /*-------------------*/

    /* 1 */
    getOrderOfUser(userId: number): Observable<Order[]> {
        if (userId) {
            return this.http.get<Order[]>(
                `http://localhost:3000/orders/${userId}/current-order2`
            );
        } else {
            console.log('Error user id not created');
            return new Observable<[]>();
        }
    }

    /* 2 */
    createNewOrder(userId: number): Observable<Order[]> {
        const newOrder = {
            user_id: userId,
            status: Status.active,
        };
        return this.http.post<Order[]>(
            `http://localhost:3000/orders/newOrder`,
            newOrder
        );
    }

    /* 3 */
    addProductToOrder(
        product: Product,
        amount: number,
        order_id: number,
        userId: number
    ): Observable<OrdersProducts[]> {
        const newList = {
            quantity: amount,
            product_id: product.id,
            order_id: order_id,
            user_id: userId,
        };

        return this.http.post<OrdersProducts[]>(
            'http://localhost:3000/orders-products/addProduct',
            newList
        );
    }

    /* 6 */
    getItems(order_id: number): Observable<CartItems[]> {
        return this.http.get<CartItems[]>(
            `http://localhost:3000/orders-products/all-products-order/${order_id}`
        );
    }

    /* 7 */
    changeQuantity(item_id: number, quantity: number) {
        return this.http.put<object[]>(
            `http://localhost:3000/orders-products/change-quantity`,
            { item_id: item_id, quantity: quantity }
        );
    }

    /* 8 */

    removeItem(item_id: number): Observable<OrdersProducts[]> {
        return this.http.delete<OrdersProducts[]>(
            `http://localhost:3000/orders-products/remove-product/${item_id}`
        );
    }

    /* 8 */
    setTotal(total: number) {
        this.total = total;
    }

    /* 9 */
    setOrder(order: Order) {
        this.Order = order;
    }

    /* 10 */
    reset() {
        this.total = 0.0;
    }
    /* 11 */
    closeOrder(userId: number): Observable<object[]> {
        return this.http.put<object[]>(
            `http://localhost:3000/orders/update-order`,
            { status: 'COMPELETED', user_id: userId }
        );
    }
}
