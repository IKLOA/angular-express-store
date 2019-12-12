import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {StoreLayoutComponent} from './shared/layouts/store-layout/store-layout.component';
import {AdminLayoutComponent} from './shared/layouts/admin-layout/admin-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import {AdminLoginPageComponent} from './admin/admin-login-page/admin-login-page.component';
import {AdminDashboardPageComponent} from './admin/admin-dashboard-page/admin-dashboard-page.component';
import {OrdersPageComponent} from './admin/orders-page/orders-page.component';
import {AssortmentPageComponent} from './admin/assortment-page/assortment-page.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {AssortmentFormComponent} from './admin/assortment-page/assortment-form/assortment-form.component';
import {PositionsFormComponent} from './admin/assortment-page/assortment-form/positions-form/positions-form.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {DeliveryPageComponent} from './delivery-page/delivery-page.component';
import {PositionsPageComponent} from './categories-page/positions-page/positions-page.component';
import {QuillModule} from 'ngx-quill';
import {PositionPageComponent} from './categories-page/positions-page/position-page/position-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {BasketPageComponent} from './basket-page/basket-page.component';
import {UserOrdersPageComponent} from './user-orders-page/user-orders-page.component';
import {OrderComponent} from './user-orders-page/order/order.component';
import {StokcsPageComponent} from './stokcs-page/stokcs-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    StoreLayoutComponent,
    AdminLayoutComponent,
    MainPageComponent,
    AdminLoginPageComponent,
    AdminDashboardPageComponent,
    OrdersPageComponent,
    AssortmentPageComponent,
    LoaderComponent,
    AssortmentFormComponent,
    PositionsFormComponent,
    CategoriesPageComponent,
    DeliveryPageComponent,
    PositionsPageComponent,
    PositionPageComponent,
    ContactsPageComponent,
    BasketPageComponent,
    UserOrdersPageComponent,
    OrderComponent,
    StokcsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    QuillModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
