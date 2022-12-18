import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from './components/home-page/product-list/product-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CartComponent } from './components/cart-page/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './components/cart-page/customer-details/customer-details.component';
import { OrderComponent } from './components/cart-page/order/order.component';
import { ProductItemComponent } from './components/home-page/product-item/product-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductListComponent,
        ProductItemComponent,
        ItemDetailsComponent,
        CartComponent,
        CustomerDetailsComponent,
        OrderComponent,
        CheckoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
