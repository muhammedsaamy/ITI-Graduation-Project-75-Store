import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any;


  categories: any;
  id: any;
  ImgSrc = "https://localhost:7296";

  constructor(private _productServices: ProductService, private rout: ActivatedRoute, private route: Router) {
    this.id = rout.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getTheProduct();
    this.getAllcategory();
  }
  getAllcategory() {
    this._productServices.getAllCategory().subscribe(res => {
      this.categories = res;
      // console.log(this.categories);

    });
  }
  productName: any;
  // productCate: any;
  productPrice: any;
  productDesc: any;
  getTheProduct() {
    this._productServices.getById(this.id).subscribe(
      res => {
        this.product = res,
          console.log(this.product);

        this.productName = res.name;
        // this.productCate = res.category.name;
        this.productPrice = res.price;
        this.productDesc = res.description;
      },
      err => { prompt(err) })
  }
  editForm: FormGroup = new FormGroup({
    Name: new FormControl(),
    // category: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  editProduct(product: any) {
    console.log(product.Name);

    if (product.Name != null) {
      this.product.name = product.Name;
    }
    if (product.price != null) {
      this.product.price = product.price;
    }
    if (product.description != null) {
      this.product.description = product.description;
    }

    // console.log(this.product);


    this._productServices.edit(this.product, this.id).subscribe();
    this.route.navigate(['/products']);

  }
}
