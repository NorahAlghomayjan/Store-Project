import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;
    constructor(private router: Router) {
        this.product = {
            id: 1,
            name: '',
            price: 0.0,
            url: '',
            description: '',
            category: '',
        };
    }
    ngOnInit(): void {}

    viewDetails(id: number) {
        this.router.navigate([`/product/${id}`]);
    }
}
