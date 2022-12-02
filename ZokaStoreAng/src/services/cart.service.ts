import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  #BaseCart = "https://localhost:7296/api/Cart";
  #cartSession = 'https://localhost:7296/api/CartSessions/';
  nmberOfItems: any;

  SetNumber(data: any) {
    this.nmberOfItems = data
  }
  GetNumber() {
    return this.nmberOfItems
  }
  constructor(private client: HttpClient) { }

  addToCart(productId: any, cartId: any): Observable<any> {
    return this.client.get(this.#BaseCart + "/" + productId + '/' + cartId)
  }
  //cart
  getCartByUserId(id: any): Observable<any> {
    return this.client.get(this.#BaseCart + '/user/' + id)
  }


  getCartItems(id: any): Observable<any> {
    return this.client.get(this.#BaseCart + '/' + id)
  }

  increase(id: any): Observable<any> {
    return this.client.get(this.#BaseCart + '/' + 'Increase' + '/' + id)
  }
  Decrease(id: any): Observable<any> {
    return this.client.get(this.#BaseCart + '/' + 'Decrease' + '/' + id)
  }

  DeleteItem(id: any): Observable<any> {
    return this.client.delete(this.#BaseCart + '/' + id)

  }
  getCartSessionById(id:any){
    return this.client.get(this.#cartSession +id)
  }
  putCartSession(id:any , cartSession:any){
    return this.client.put(this.#cartSession +id , cartSession)
  }
  getUserOrders(id:any):Observable<any>{
    return this.client.get(this.#cartSession + "userOrders/" + id)
  }
}
