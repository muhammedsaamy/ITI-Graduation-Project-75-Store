import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userServices: ProductService) { }
  users: any;
  ngOnInit(): void {
    this.getAllusers();
  }
  getAllusers() {
    this.userServices.getAllUsers().subscribe(res => { this.users = res; console.log(res) })
  }
}
