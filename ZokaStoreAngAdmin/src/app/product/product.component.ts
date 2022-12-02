import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';
Ng2SearchPipeModule

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  connection: any;
  cart: any;
  cartId: any;
  itemsNumber: any;
  // ImgSrc = "https://localhost:7296";
  searchText: any;

  constructor(private _productServices: ProductService, private rout: Router, private _cartServices: CartService, private _authentication: AuthService) {

  }
  ngOnInit(): void {

    this.connectingToBase();
    this.getCategory();
  }
  pageNumbers: Number[] = [];
  thePage = 1;
  currentPage = 1;
  changePage(ind: any) {
    this._productServices.getAllProdcts().subscribe((response) => {
      this.products = response.slice(ind, ind + 20);
      // console.log(this.products);
    })
  }
  prev() {
    if (this.thePage > 1) {
      this.thePage--;
    }
    this.changePage(this.currentPage - 1)

  }
  next() {
    if (this.thePage < 2) {
      this.thePage++;
    }
    var page = this.currentPage - 1
    this.changePage(page + 20)
  }

  theCartID: any;
  loginUser: any;
  isLogin: boolean = false;

  connectingToBase() {

    this._productServices.getAllProdcts().subscribe((response) => {
      this.products = response.slice(0, 20);
      // console.log(this.products);
    })
    // this._productServices.getAllProdcts().subscribe(
    // (data) => { this.products = data; },
    //   (error) => { console.log("wtf") }

    // );
    if (this._authentication.userData != null) {
      this.loginUser = this._authentication.userData.value
      this.isLogin = true;

      // this._cartServices.getCartByUserId(this.loginUser.id).subscribe(
      //   (data) => {
      //     this.cart = data;
      //     this.theCartID = this.cart.id;
      //     // console.log(this.theCartID)
      //     this.itemsNumber = this.cart.itemsCount;
      //     this._cartServices.SetNumber(this.itemsNumber);
      //   },
      //   // (err) => { console.log(err); }
      // );

    }
    this.getallCategories()
  }
  categories: any;
  getCategory() {
    this._productServices.getAllCategory().subscribe((resp) => {
      this.categories = resp;
      // console.log(this.categories);
    },
      // (erro) => { console.log(erro) }

    )


  }
  createForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    discount: new FormControl(),
    stock: new FormControl(),
    weight: new FormControl(),
    size: new FormControl(),
    // brandId: new FormControl(),
    productImages: new FormControl(),
  });


  create(id: any) {
    this._productServices.createCart(id).subscribe((data) => {
      // console.log(data);
    })
    // console.log(id)
  };

  editProduct(productId: any) {

    this.rout.navigate(['/editproducts/' + productId])

  }
  deleteproduct(id: any) {
    this._productServices.delete(id).subscribe();
    // window.location.reload();


  }

  details(id: any) {
    this.rout.navigate(['/product/' + id]);

  }
  selectCategories: any;
  getallCategories() {
    this._productServices.getAllCategory().subscribe(res => {
      this.selectCategories = res;
      // console.log(this.selectCategories);

    })
  }
  images: any;
  theImageUrl: any;
  uploadPhoto(target: any) {

    if (!target || !target.files) return;
    var input = target as HTMLInputElement;
    if (!input.files) return;
    this.images = [];
    for (var i = 0; i < input.files.length; i++) {

      this._productServices.uploadImage(input.files[i]).subscribe({
        next: (data) => {

          this.createForm.patchValue({ PrimaryImage: data._url[0] });
          // console.log(data._url);
          this.theImageUrl = data._url;
          this.images.push(this.theImageUrl);
        },
        error: (err) => {
          console.log(err.error);
        }
      })

    }

  }

  // createProduct(newProduct: any) {
  //   console.log(newProduct);

  //   this._productServices.createProduct(newProduct).subscribe(res => {
  //     console.log("res");
  //     console.log(res);
  //   },err=>{
  //     console.log("err");

  //     console.log(err);
  //   });

  //   console.log(this.products);
  // }




  AddProduct(data: FormGroup) {

    if (this.createForm.invalid) return;

    let object = {
      'name': data.value.name,
      'description': data.value.description,
      'price': data.value.price,
      'stock': data.value.stock,
      'weight': data.value.weight,
      'size': data.value.size,
      // 'brandId': data.value.brandId,
      'discount': data.value.discount,
      'categoryId': data.value.categoryId,
      // 'productImages': this.theImageUrl[0],
    }
    // let validObj = this.MakeObjValid(object);
    // console.log(object);
    this._productServices.AddProduct(object).subscribe({
      next: (data) => {
        // console.log(data);

        for (let i = 0; i < this.images.length; i++) {
          let imageObj = {
            'Url': this.images[i][0],
            // 'ProductFK':data[data.length-1].productId,
            'ProductFK': data.productId,
          }
          this._productServices.addProductImages(imageObj).subscribe({
            next: () => {
              this.connectingToBase();
              this.createForm.reset();
            }
          }
          );
        }
        // this.GetAllProducts();
        // this.createForm.reset();
        // this.closeModal?.nativeElement.click();
        // document.getElementById("closeModalButton").click();
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    })
  }
}
