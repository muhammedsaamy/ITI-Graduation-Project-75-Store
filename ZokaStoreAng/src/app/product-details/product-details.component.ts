import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  id: any;
  ImgSrc = "https://localhost:7296";

  constructor(private _productServices: ProductService, private rout: Router, public ar: ActivatedRoute, private _cartServices: CartService, private _authentication: AuthService) {
    this.id = ar.snapshot.params["id"]

  }
  ngOnInit(): void {
    this.connectingToBase()
  }

  theCartID: any;
  loginUser: any;
  products: any;
  connection: any;
  cart: any;
  cartId: any;
  itemsNumber: any;
  isLogin: boolean = false;

  connectingToBase() {


    this._productServices.getById(this.id).subscribe(
      res => { this.product = res },
      err => { prompt(err) })

    // this._productServices.getAllProdcts().subscribe(
    //   (data) => { this.products = data; },
    //   (error) => { console.log("wtf") }

    // );
    if (this._authentication.userData != null) {
      this.loginUser = this._authentication.userData.value
      this.isLogin = true;

      this._cartServices.getCartByUserId(this.loginUser.id).subscribe(
        (data) => {
          this.cart = data;
          this.theCartID = this.cart.id;
          // console.log(this.theCartID)
          this.itemsNumber = this.cart.itemsCount;
          this._cartServices.SetNumber(this.itemsNumber);
        },
        // (err) => { console.log(err); }
      );
    }
  }

  editProduct(productId: any) {

    // console.log(cartId);
    this.rout.navigate(['/editproducts/' + productId])

    // (err) => { console.log(err); }

  }
}
