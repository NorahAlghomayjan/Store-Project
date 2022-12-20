import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
    @Input() userChild: User = {
        id: 0,
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        address: '',
        creditCard: '',
    };
    @Output() setUserEvent: EventEmitter<User> = new EventEmitter();
    creditValid = true;

    /* --------------------- */
    constructor(private router: Router, private cartServ: CartService) { }

    ngOnInit(): void {
        this.userChild.password = '';
    }

    setUser(user: User) {
        this.setUserEvent.emit(user);
    }

    numberOnly() {
        if (! /^[0-9]+$/.test(this.userChild.creditCard)) {
            this.creditValid = false;
        } else{
            this.creditValid = true;
        }

    }
}
