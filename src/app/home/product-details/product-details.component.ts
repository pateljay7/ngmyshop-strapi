import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products/products.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  product: Product | null = null;
  URL = environment.BASE_URL;
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.product = this.productService.productList.find(
        (product) => product.id == data['id']
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

  addToCart() {
    this.cartService.addToCart(this.product!).subscribe();
  }
  redirectToCheckOutPage() {
    this.router.navigate(['/check-out']);
  }
}
