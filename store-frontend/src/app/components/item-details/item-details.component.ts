import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
    @Input() product: Product;
    @Input() details = true;
    amount: number;

    constructor(
        private productServ: ProductService,
        private cartServ: CartService,
        private userServ: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.product = {
            id: 0,
            name: '',
            price: 0.0,
            url: '',
            description: '',
            category: '',
        };
        this.amount = 1;
    }

    ngOnInit(): void {
        let id: number = 0;
        if (this.details) {
            this.route.paramMap.subscribe((params: ParamMap) => {
                id = parseInt(params.get('id') as string);
            });
            this.productServ.getProductById(id).subscribe((res) => {
                this.product = res;
            });
        }
    }

    addToCart(product: Product) {
        // 1 check if user is created.
        const loggedInUser = JSON.parse(
            localStorage.getItem('user') || '{"user":""}'
        );

        if (loggedInUser == undefined || loggedInUser.user == '') {
            this.userServ.craateDummyUser().subscribe((res) => {
                UserService.user = { ...res.user };

                localStorage.setItem('user', JSON.stringify(res.user));

                // 2 add product to the user order
                this.addToUserCart(product, UserService.user);
            });
        } else {
            this.addToUserCart(product, loggedInUser);
        }
    }

    addToUserCart(product: Product, user: User) {
        // 3 check if user alreaady has order

        this.cartServ.getOrderOfUser(user.id).subscribe((orders) => {
            // if user doesn't have  an order then open new one
            if (!orders.length) {
                this.cartServ.createNewOrder(user.id).subscribe((orders) => {
                    this.cartServ.setOrder(orders[0]);

                    this.addProductToOder(orders[0], product, user);
                });
            } else {
                this.cartServ.setOrder(orders[0]);
                this.addProductToOder(orders[0], product, user);
            }
        });
    }

    addProductToOder(order: Order, product: Product, user: User) {
        //const loggedInUser = JSON.parse( localStorage.getItem('user') || '{"user":""}')

        this.cartServ
            .addProductToOrder(product, this.amount, order.id, user.id)
            .subscribe((productOfOrder) => {
                alert(
                    `product ${product.name}  with id: ${productOfOrder[0].id}  added to your cart`
                );
            });
    }

    viewDetails(id: number) {
        this.router.navigate([`/product/${id}`]);
    }
}
