import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/home/products/products.component';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  productList: Product[] = [];

  fetchProducts() {
    return this.http.get(`${environment.BASE_URL}/api/products?populate=*`).pipe(
      tap((res: any) => {
        this.productList = res['data'];
      })
    );
  }
  fetchProductsById(id: number) {
    return this.http.get(`${environment.BASE_URL}/api/products/${id}?populate[image][populate]=true`);
  }
}
