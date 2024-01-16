import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:1337';
  fetchProducts() {
    return this.http.get(`${this.URL}/api/products?populate=*`);
  }
}
