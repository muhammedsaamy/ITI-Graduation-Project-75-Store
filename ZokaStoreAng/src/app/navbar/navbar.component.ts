import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  [x: string]: any;

  isLogin: boolean = false;
  constructor(private _authenticatio: AuthService) {

  }
  loginUser: any;
  ngOnInit(): void {
    this._authenticatio.userData.subscribe(() => {
      if (this._authenticatio.userData.getValue() != null) {
        this.isLogin = true;
        this.loginUser = this._authenticatio.userData.value
      }
      else {
        this.isLogin = false;
      }
    })
  }


  logOut() {
    this._authenticatio.logOut();
  }

}
