import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = "";
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    birthDay: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required, Validators.pattern("^(?:m|M|male|Male|f|F|female|Female)$")]),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  })
  constructor(private _authentication: AuthService, private product: ProductService, private rout: Router) { }
  // loggedinUser: any;
  submitRegister(registerForm: FormGroup) {
    if (registerForm.valid) {
      this._authentication.register(registerForm.value).subscribe(
        (response) => {

          // console.log(response);

          this.rout.navigate(['/login'])
        }
      );
    }
    // console.log(registerForm.value)
  }
  ngOnInit(): void {
  }

}
