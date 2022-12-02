import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { CategoriesService } from 'src/services/categories.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorise: any;
  id: any;
  ImgSrc = "https://localhost:7296";

  constructor(private Services: ProductService, private _authentication: AuthService, private route: Router, private rout: ActivatedRoute, private _cartServices: CartService) {
    this.id = rout.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.connectingToBase(this.id);
  }
  cart: any;
  cartId: any;
  theCartID: any;
  itemsNumber: any;


  connectingToBase(id: any) {
    this.Services.getCategoryByID(this.id).subscribe(
      (data) => { this.categorise = data.products; },
      // (error) => {  }
    );
    if (this._authentication.userData != null) {
      this.loginUser = this._authentication.userData.value;

      this._cartServices.getCartByUserId(this.loginUser.id).subscribe(
        (data) => {
          this.cart = data;
          this.theCartID = this.cart?.id;
          // console.log(this.theCartID)
          this.itemsNumber = this.cart?.itemsCount;
          this._cartServices.SetNumber(this.itemsNumber);
        });

    }
  }
  loginUser: any;
  addToCart(productId: any, cartId: any) {
    this._cartServices.addToCart(productId, cartId).subscribe(data => {
      this.connectingToBase(this.id);
      this.route.navigate(['/cart/' + this.loginUser.id])
    },
      // (err) => { console.log(err); }
    )
  }
  details(id: any) {
    this.route.navigate(['/product/' + id]);

  }
}
