import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _client: HttpClient, private rout: Router) {

    if (localStorage.getItem("userToken") != null) {

      this.saveUserData();
    }
  }

  #BasURL = "https://localhost:7296/api/Admin/register";
  #loginURL = "https://localhost:7296/api/Admin";

  userData = new BehaviorSubject(null);

  saveUserData() {
    let userEncoded = JSON.stringify(localStorage.getItem("userToken"));
    this.userData.next(jwtDecode(userEncoded));
    // console.log(this.userData)
  }


  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.rout.navigate(["login"]);
  }


  register(formData: any): Observable<any> {
    return this._client.post(this.#BasURL, formData);
  }

  login(formData: any) {
    return this._client.post(this.#loginURL, formData)
  }

}
