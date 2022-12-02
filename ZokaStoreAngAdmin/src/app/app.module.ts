import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ErroComponent } from './erro/erro.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { TheShopCartComponent } from './the-shop-cart/the-shop-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import jwtDecode from 'jwt-decode';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutComponent } from './about/about.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { UsersComponent } from './users/users.component';

// const routs: Routes = [

//   { path: "**", component: ErroComponent },
// ]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    ProductDetailsComponent,
    EditProductComponent,
    TheShopCartComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    EditCategoryComponent,
    UsersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
