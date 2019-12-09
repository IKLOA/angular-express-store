import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreLayoutComponent} from './shared/layouts/store-layout/store-layout.component';
import {AdminLayoutComponent} from './shared/layouts/admin-layout/admin-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AdminLoginPageComponent} from './admin/admin-login-page/admin-login-page.component';
import {AdminDashboardPageComponent} from './admin/admin-dashboard-page/admin-dashboard-page.component';
import {AdminAuthGuard} from './shared/classes/adminAuth.guard';
import {OrdersPageComponent} from './admin/orders-page/orders-page.component';
import {AssortmentPageComponent} from './admin/assortment-page/assortment-page.component';
import {AssortmentFormComponent} from './admin/assortment-page/assortment-form/assortment-form.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {DeliveryPageComponent} from './delivery-page/delivery-page.component';
import {PositionsPageComponent} from './categories-page/positions-page/positions-page.component';
import {PositionPageComponent} from './categories-page/positions-page/position-page/position-page.component';


const routes: Routes = [
  {
    path: '', component: StoreLayoutComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: MainPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/:id', component: PositionsPageComponent},
      {path: 'categories/:id/:positionId', component: PositionPageComponent},
      {path: 'delivery', component: DeliveryPageComponent}
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: 'admin', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: AdminLoginPageComponent}
    ]
  },
  {
    path: 'AdminDashboard', canActivate: [AdminAuthGuard], component: AdminDashboardPageComponent, children: [
      {path: 'orders', component: OrdersPageComponent},
      {path: 'assortment', component: AssortmentPageComponent},
      {path: 'assortment/new', component: AssortmentFormComponent},
      {path: 'assortment/:id', component: AssortmentFormComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
