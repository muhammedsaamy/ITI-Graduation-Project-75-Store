import { identifierName, Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _AuthService: AuthService, public _Router: Router, private productService: ProductService) { }

  error: string = '';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
  }
  loggedinUser: any;
  submitLoginForm(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe((response: any) => {

        if (response.message == 'sucess') {


          localStorage.setItem('userToken', response.token);

          this._AuthService.saveUserData();
          this.loggedinUser = this._AuthService.userData.value;
          // this.productService.createCart(this.loggedinUser.id).subscribe((resp) => {
          // });
          // console.log(this.loggedinUser.id);
          // console.log("Elmafrood Created");
          this._Router.navigate(['home']);


          // if (this._AuthService.userData.value != null) {
          //   // go for login
          //   const user = this._AuthService.userData.value;
          //   this._Router.navigate(['login']);

          // } else {
          //   // redirect to home through navigateByURL()
          //   this._Router.navigate(['products']);
          // }
        }
        else {
          this.error = response.errors.email.message;
        }

      })
    }
  }

}
