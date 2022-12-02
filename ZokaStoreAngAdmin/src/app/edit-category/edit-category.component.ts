import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id: any;

  category: any;

  constructor(private product: ProductService, private rout: ActivatedRoute, private route: Router) {
    this.id = rout.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getCategory();
  }


  getCategory() {

    this.product.getCategoryByID(this.id).subscribe(res => {
      this.category = res;
      console.log(this.category);


    })
  }


  editForm: FormGroup = new FormGroup({
    id: new FormControl(),

    name: new FormControl(),

  });
  editCategory(categorey: any) {
    this.category.name = categorey.name;
    // console.log(this.category);

    this.product.editCategory(this.id, this.category).subscribe(res => {
      console.log(categorey.value);

    },
      (erro) => { console.log(erro) });
    // this.route.navigate(['/categories'])
  }

}
