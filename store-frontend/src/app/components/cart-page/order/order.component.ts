import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItems } from 'src/app/models/CartItems';
import { Order, Status } from 'src/app/models/Order';
import { ProductOrders } from 'src/app/models/ProductOrders';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
    @Input() items: CartItems[] = [];
    @Input() total = 0.0;
    @Output() changeTotalChild: EventEmitter<{
        itemId: number;
        amount: number;
    }> = new EventEmitter();
    @Output() removeItemChild: EventEmitter<number> = new EventEmitter();

    constructor(private cartServ: CartService) {}

    /*
    TODO: return all the products of order by order_id.
    TODO: calc the total of these product that returend.
  */
    ngOnInit(): void {}

    changeTotal(itemId: number, amount: number) {
        if (amount == 0) {
            this.removeItemChild.emit(itemId);
        } else {
            this.changeTotalChild.emit({ itemId: itemId, amount: amount });
        }
    }
}
