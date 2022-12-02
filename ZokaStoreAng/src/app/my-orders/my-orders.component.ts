import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId:any
  orders:any
  constructor(private cartApi:CartService , private ar:ActivatedRoute) {
    this.userId = ar.snapshot.params['id']
   }

  ngOnInit(): void {
    this.getOrders()
  }



  getOrders(){
    this.cartApi.getUserOrders(this.userId).subscribe({
      next:(res:any)=>{
        this.orders = res

        console.log(res[0]);

      }
    })
  }
}
