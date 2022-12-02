import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  #BasURL = "https://localhost:7296/api/Categories";

  constructor(private client: HttpClient) {

  }

  getAllCate() {
    return this.client.get(this.#BasURL);
  }

}
