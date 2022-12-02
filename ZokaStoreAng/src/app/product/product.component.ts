import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';


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
  ImgSrc = "https://localhost:7296";
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

      this._cartServices.getCartByUserId(this.loginUser.id).subscribe(
        (data) => {
          this.cart = data;
          this.theCartID = this.cart.id;
          // console.log(this.theCartID)
          this.itemsNumber = this.cart.itemsCount;
          this._cartServices.SetNumber(this.itemsNumber);
        },
        // (err) => { console.log(err); }
      );
    }
  }

  addToCart(productId: any, cartId: any) {
    this._cartServices.addToCart(productId, cartId).subscribe(data => {
      this.connectingToBase();
      // console.log(cartId);
      // this.rout.navigate(['/cart/' + this.loginUser.id])
    },
      // (err) => { console.log(err); }
    )
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
  imgArray: any = ["../../assets/men.jpg", "../../assets/women.jpg", "../../assets/kids.jpg",
    "../../assets/laptops.jpg", "../../assets/mobiles.jpg", "../../assets/poster-shoe-new-collection-shoes-advertisement-192307675.jpg"]
  // getcart() {
  //   this._productServices.getCartSession().subscribe((data) => {
  //     this.a7a = data;
  //     console.log(this.a7a);
  //   }
  //   );
  //   console.log(this.a7a);
  // }
  create(id: any) {
    this._productServices.createCart(id).subscribe((data) => {
      // console.log(data);
    })
    // console.log(id)
  };

  // editProduct(productId: any) {

  //   this.rout.navigate(['/editproducts/' + productId])

  // }


  details(id: any) {
    this.rout.navigate(['/product/' + id]);

  }

  //carosul
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
  dynamicSlides = [
    {
      id: 1,
      src: '../../assets/brand1.jpg',
      alt: 'Side 1',
      title: 'Side 1'
    },
    {
      id: 2,
      src: '../../assets/brand7.jpg',
      alt: 'Addidas',
      title: 'Addidas'
    },
    {

      id: 3,
      src: '../../assets/brand2.jpg',
      alt: 'aquiliq',
      title: 'aquiliq'
    },
    {
      id: 4,
      src: '../../assets/brand9.jpg',
      alt: 'iphone',
      title: 'iphone'
    },
    {
      id: 5,
      src: '../../assets/brand3.jpg',
      alt: 'Nike',
      title: 'Nike'
    },
    {
      id: 6,
      src: '../../assets/brand8.jpg',
      alt: 'Dell',
      title: 'Dell'
    },
    {
      id: 7,

      src: '../../assets/brand4.jpg',
      alt: 'Tommy',
      title: 'Tommy'
    },
    {
      id: 8,
      src: '../../assets/brand6.jpg',
      alt: 'Lacost',
      title: 'Lacost'
    }
  ]
}
