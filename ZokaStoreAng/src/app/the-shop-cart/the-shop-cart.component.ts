import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-the-shop-cart',
  templateUrl: './the-shop-cart.component.html',
  styleUrls: ['./the-shop-cart.component.css']
})
export class TheShopCartComponent implements OnInit {
  userId: any;
  items: any;
  ImgSrc = "https://localhost:7296";
  constructor(private _cartServices: CartService, private rout: ActivatedRoute, private route: Router) {
    this.userId = this.rout.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getItems();
    this.getTotal()
  }

  getItems() {
    this._cartServices.getCartItems(this.userId).subscribe(
      data => {
        this.items = data
        // console.log(data)
      },
      // erro => { console.log(erro) }
    )
  }

  CartSession: any;
  getTotal() {
    this._cartServices.getCartByUserId(this.userId).subscribe(
      data => {
        this.CartSession = data;
        // console.log(this.CartSession)
      }
    )
  }

  increaseItems(id: any) {
    this._cartServices.increase(id).subscribe(
      data => {
        // console.log(data);
        this.ngOnInit();
        // console.log(" increased");
      },
      err => {
        // console.log(err);
        this.getItems();
        // console.log(" Cant be increased");
      }
    )
  }


  DecreaseItems(id: any) {
    this._cartServices.Decrease(id).subscribe(
      data => {
        // console.log(" Decreased");
        // console.log(data);
        this.ngOnInit();
      },
      err => {
        // console.log(" Cant be Decreased");
        // console.log(err);
        this.getItems();

      }
    )
  }
  DeleteItem(id: any) {
    this._cartServices.DeleteItem(id).subscribe(
      data => {
        // console.log(data);
        this.getTotal();
        this.getItems();
      },
      err => {
        // console.log(" Cant be Decreased");
        // console.log(err);
        this.getItems();

      }
    )
  }
  endOfCart() {
    this.route.navigate(['check-out/' + this.CartSession.id])
  }

}
