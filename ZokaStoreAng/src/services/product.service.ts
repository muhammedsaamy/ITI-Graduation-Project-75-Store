import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #userUrl = "https://localhost:7296/api/Users";

  #BasURL = "https://localhost:7296/api/product";

  #CartUrl = 'https://localhost:7296/api/CartSessions';

  #categoriesURL = 'https://localhost:7296/api/Categories';

  nmberOfItems: any;
  SetNumber(data: any) {
    this.nmberOfItems = data
  }
  GetNumber() {
    return this.nmberOfItems
  }
  loginUser: any;
  constructor(private client: HttpClient, private userData: AuthService) {
    if (this.userData.userData != null) {
      this.loginUser = this.userData.userData.value
    }
  }
  //user
  getUser(id: any) {
    return this.client.get(this.#userUrl + "/" + id);
  }

  getAllProdcts(): Observable<any> {
    return this.client.get(this.#BasURL);
  }

  getById(id: any): Observable<any> {
    return this.client.get(this.#BasURL + "/" + id);
  }

  edit(product: any, id: any): Observable<any> {
    return this.client.put(this.#BasURL + "/" + id, product);
  }

  delete(id: any): Observable<any> {
    return this.client.delete(this.#BasURL + "/" + id);
  }

  //categorey
  getAllCategory(): Observable<any> {
    return this.client.get(this.#categoriesURL);
  }

  getCategoryByID(id: any): Observable<any> {
    return this.client.get(this.#categoriesURL + "/" + id);
  }
  //brands
  getAllBrand(): Observable<any> {
    return this.client.get(this.#BasURL + "/" + "brand");
  }


  // //cart
  // getCartById(id: any): Observable<any> {
  //   return this.client.get(this.#CartUrl + '/' + id)
  // }
  getCartSession() {
    return this.client.get(this.#CartUrl);
  }
  createCart(id: any) {
    return this.client.post<any>(this.#CartUrl + "?userID=" + id, null)
  }
}
