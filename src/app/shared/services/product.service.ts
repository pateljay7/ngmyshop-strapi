import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/home/products/products.component';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:1337';
  productList: Product[] = [];

  fetchProducts() {
    return this.http.get(`${this.URL}/api/products?populate=*`).pipe(
      tap((res: any) => {
        this.productList = res['data'];
      })
    );
  }
  fetchProductsById(id: number) {
    return this.http.get(`${this.URL}/api/products/${id}?populate[image][populate]=true`);
  }
}
