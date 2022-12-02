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

  getAllUsers() {
    return this.client.get(this.#userUrl);
  }
  //products
  getAllProdcts(): Observable<any> {
    return this.client.get(this.#BasURL);
  }

  getById(id: any): Observable<any> {
    return this.client.get(this.#BasURL + "/" + id);
  }
  AddProduct(product: any) {
    return this.client.post<any>(this.#BasURL, product);
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
  createCategry(category: any) {
    return this.client.post<any>(this.#categoriesURL, category);
  }
  deleteCategory(id: any) {
    return this.client.delete(this.#categoriesURL + "/" + id);
  }
  editCategory(id: any, category: any) {
    return this.client.put(this.#categoriesURL + "/" + id, category)

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
  //image
  uploadImage(file: File): Observable<any> {
    var formdata = new FormData();
    formdata.append('image', file);
    return this.client.post("https://localhost:7296/api/images", formdata);
  }
  addProductImages(data: any): Observable<any> {
    return this.client.post("https://localhost:7296/api/productImages", data)
  }
}
