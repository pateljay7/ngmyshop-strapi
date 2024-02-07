import { Component, Input } from '@angular/core';
import { Product } from '../products/products.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(
    private productService: ProductService,
    private route: Router,
    private cartService: CartService
  ) {}
  @Input() product: Product | null = null;
  BASE_URL = environment.BASE_URL;

  viewProductDetail() {
    this.route.navigate(['/products', this.product?.id]);
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe();
  }
}
