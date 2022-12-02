import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-the-shop-cart',
  templateUrl: './the-shop-cart.component.html',
  styleUrls: ['./the-shop-cart.component.css']
})
export class TheShopCartComponent implements OnInit {
  cartSessions:any;
  constructor(private _cartServices: CartService, private rout: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
  this.getCarts();
  }

  getCarts(){
    this._cartServices.getAllCartSessions().subscribe({
      next:(res:any)=>{
        this.cartSessions = res ;
      // console.log(res);

      }
    })
  }

  accept(id:any , session:any , status:any){
    if(status=="y"){
      session.statues = 'accepted'
    }else{

      session.statues = 'declined'
    }

    this._cartServices.putCartSession(id,session).subscribe({
      next:(res:any)=>{
        this.getCarts();

      }
    })
  }

}
