import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productServ: ProductService) {}

    ngOnInit(): void {
        this.productServ.getProducts().subscribe((res) => {
            this.products = res;
        });
    }
}
