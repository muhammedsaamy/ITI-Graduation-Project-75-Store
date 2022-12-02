import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { CategoriesService } from 'src/services/categories.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorise: any;
  // id: any;
  ImgSrc = "https://localhost:7296";

  constructor(private Services: ProductService, private _authentication: AuthService, private route: Router, private rout: ActivatedRoute, private _cartServices: CartService) {
    // this.id = rout.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.connectingToBase();
  }

  connectingToBase() {
    this.Services.getAllCategory().subscribe(
      (data) => {
        this.categorise = data;
        console.log(this.categorise)
      },
      // (error) => {  }
    );
    if (this._authentication.userData != null) {
      this.loginUser = this._authentication.userData.value


    }
  }
  loginUser: any;

  createCategry(category: any) {
    this.Services.createCategry(category).subscribe();
    window.location.reload()
  }
  createForm: FormGroup = new FormGroup({
    Name: new FormControl(),
  });
  deleteCategory(id: any) {
    this.Services.deleteCategory(id).subscribe();
    window.location.reload()

  }
  editCategory(id: any) {
    this.route.navigate(['/editcategory/' + id])
  }

}
