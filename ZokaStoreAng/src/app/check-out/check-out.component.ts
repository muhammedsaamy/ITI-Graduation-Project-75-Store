import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId: any;
  cartSession: any;
  items: any;
  constructor(private ar: ActivatedRoute, private cartApi: CartService, private rout: Router, private _authentication: AuthService, private userServices: ProductService) {
    this.cartId = this.ar.snapshot.params['cartid']
  }

  ngOnInit(): void {
    this.getCartSession();
    this.getuser();
  }
  theUser: any;
  loginUser: any;
  getCartSession() {
    this.cartApi.getCartSessionById(this.cartId).subscribe({
      next: (res: any) => {
        this.cartSession = res
        this.items = res.cartItems
        // console.log(res);

      }
    })

    if (this._authentication.userData != null) {
      this.loginUser = this._authentication.userData.value
      // console.log(this.loginUser);
    }

  }
  getuser() {
    this.userServices.getUser(this.loginUser.id).subscribe(res => {
      this.theUser = res;
    });
  }

  endSession() {
    this.cartSession.ended_At = new Date().toISOString();
    this.cartSession.statues = 'pending';
    // console.log(this.cartSession.ended_At);

    this.cartApi.putCartSession(this.cartId, this.cartSession).subscribe({
      next: (res: any) => {
        // console.log(res);

      }
    })

    this.rout.navigate(['/home']);

  }
}
