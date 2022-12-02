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



  id: any;
  ImgSrc = "https://localhost:7296";

  constructor(private _productServices: ProductService, private rout: ActivatedRoute, private route: Router) {
    this.id = rout.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getTheProduct();

  }
  productName: any;
  productCate: any;
  productPrice: any;
  productDesc: any;
  getTheProduct() {
    this._productServices.getById(this.id).subscribe(
      res => {
        this.product = res,

          this.productName = res.name;
        this.productCate = res.category.name;
        this.productPrice = res.price;
        this.productDesc = res.description;
      },
      err => { prompt(err) })
  }
  editForm: FormGroup = new FormGroup({
    Name: new FormControl(),
    category: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  editProduct(product: any) {
    this._productServices.edit(product.value, this.id).subscribe();
    // console.log(product.value);
  }
}
