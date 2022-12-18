import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    name = '';
    total = 0.0;
    constructor(private cartServ: CartService, private userServ: UserService) {}
    /*
TODO: return total from cart.serv
*/
    ngOnInit(): void {
        const loggedInUser = JSON.parse(
            localStorage.getItem('user') || '{"user":""}'
        );

        this.name =
            'mr/ms. ' + loggedInUser.firstname + ' ' + loggedInUser.lastname;
        this.total = this.cartServ.total;

        this.cartServ.closeOrder(loggedInUser.id).subscribe((updatedOrders) => {
            this.cartServ.reset();
            this.userServ.reset();
        });
    }
}
