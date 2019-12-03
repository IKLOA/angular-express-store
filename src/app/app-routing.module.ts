import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreLayoutComponent} from './shared/layouts/store-layout/store-layout.component';
import {AdminLayoutComponent} from './shared/layouts/admin-layout/admin-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';


const routes: Routes = [
  {
    path: '', component: StoreLayoutComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: MainPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: AdminLayoutComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
