import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './app/about/about.component';
import { AuthGuardGuard } from './app/auth-guard.guard';
import { CategoriesComponent } from './app/categories/categories.component';
import { CheckOutComponent } from './app/check-out/check-out.component';
import { ContactComponent } from './app/contact/contact.component';
// import { EditProductComponent } from './app/edit-product/edit-product.component';
import { ErroComponent } from './app/erro/erro.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { MyOrdersComponent } from './app/my-orders/my-orders.component';
import { ProductDetailsComponent } from './app/product-details/product-details.component';
import { ProductComponent } from './app/product/product.component';
import { RegisterComponent } from './app/register/register.component';
import { TheShopCartComponent } from './app/the-shop-cart/the-shop-cart.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardGuard], component: HomeComponent },
  { path: 'home', canActivate: [AuthGuardGuard], component: HomeComponent },
  { path: 'about', canActivate: [AuthGuardGuard], component: AboutComponent },
  { path: 'contact', canActivate: [AuthGuardGuard], component: ContactComponent },

  { path: 'products', canActivate: [AuthGuardGuard], component: ProductComponent },
  // { path: 'editproducts/:id', canActivate: [AuthGuardGuard], component: EditProductComponent },
  { path: 'categories/:id', canActivate: [AuthGuardGuard], component: CategoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart/:id', canActivate: [AuthGuardGuard], component: TheShopCartComponent },
  { path: 'product/:id', canActivate: [AuthGuardGuard], component: ProductDetailsComponent },
  { path: 'check-out/:cartid', component:CheckOutComponent },
  { path: 'myorders/:id', component:MyOrdersComponent },
  { path: '**', component: ErroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
