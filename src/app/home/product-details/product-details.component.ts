import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products/products.component';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  product: Product | null = null;
  URL = this.productService.URL;
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.product = this.productService.productList.find(
        (product) => (product.id == data['id'])
      )!;
      if (!this.product) {
        this.productService
          .fetchProductsById(data['id'])
          .subscribe((data: any) => {
            this.product = data['data'];
          });
      }
    });
  }
}
