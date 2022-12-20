import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart-page/cart/cart.component';
import { ProductListComponent } from './components/home-page/product-list/product-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent,
    },
    {
        path: 'product/:id',
        component: ItemDetailsComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
