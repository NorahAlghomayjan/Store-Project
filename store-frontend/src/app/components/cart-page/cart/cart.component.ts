import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems as CartItems } from 'src/app/models/CartItems';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order, Status } from '../../../models/Order';
import { ProductOrders } from '../../../models/ProductOrders';
import { User } from '../../../models/User';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    user: User = {
        id: 0,
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        address: '',
        creditCard: '',
    };
    total = 0.0;
    items: CartItems[] = [];

    constructor(
        private router: Router,
        private cartServ: CartService,
        private userServ: UserService
    ) {}

    ngOnInit(): void {
        // 1 return user from localStorage.
        const loggedInUser = JSON.parse(
            localStorage.getItem('user') || '{"user":""}'
        );

        this.user = { ...loggedInUser };

        // 2 Get open order for this user.
        this.cartServ.getOrderOfUser(this.user.id).subscribe((orders) => {
            // 3 if there is an order
            if (orders.length) {
                // 4 get the items of that order
                this.cartServ
                    .getItems(orders[0].id)
                    .subscribe((productsAndQuantity) => {
                        // 4 fill the items of the component to view them.
                        this.items = productsAndQuantity;

                        // 4 calc total.
                        const totalArr: number[] = this.items.map(
                            (item) => item.amount * item.price
                        );

                        this.total = totalArr.length
                            ? Math.round(
                                  totalArr.reduce(
                                      (accum, next) => accum + next
                                  ) * 100
                              ) / 100
                            : 0.0;

                        this.cartServ.setTotal(this.total);
                        this.cartServ.setOrder(orders[0]);
                    });
            }
        });
    }

    /* ----------------------- */

    /* 1 */
    setUser(user: User) {
        // 1 return user from local storage
        const loggedInUser = JSON.parse(
            localStorage.getItem('user') || '{"user":""}'
        );
        this.user = { ...user, id: loggedInUser.id };

        // 2 update user
        this.userServ.setUser(this.user).subscribe((res) => {
            localStorage.setItem('user', JSON.stringify(user));
            alert(
                `user is setted, with firstname = ${res.updatedUser[0].firstname}`
            );
            this.router.navigate([`/checkout`]);
        });
    }

    /* 2 */
    changeTotal(itemAndAmount: { itemId: number; amount: number }) {
        // 1 if user change the amount of the ordered item.
        this.cartServ
            .changeQuantity(itemAndAmount.itemId, itemAndAmount.amount)
            .subscribe((res) => {
                this.updatingTotal();
            });
    }

    /* 3 */

    removeItem(itemId: number) {
        this.cartServ.removeItem(itemId).subscribe((deletedItems) => {
            console.log('deletedItems', deletedItems);

            this.items = this.items.filter(
                (item) => item.item_id != deletedItems[0].id
            );
            this.updatingTotal();
        });
    }

    updatingTotal() {
        const totalArr: number[] = this.items.map(
            (item) => item.amount * item.price
        );
        this.total = totalArr.length
            ? Math.floor(totalArr.reduce((accum, next) => accum + next) * 100) /
              100
            : 0.0;
        this.cartServ.setTotal(this.total);
    }
}
