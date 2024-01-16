import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  URL = this.productService.URL;
  cartItems: Product[] = [];
  totalCartValue: number = 0;
  ngOnInit(): void {
    // this.cartItems = this.cartService.cartItems;
    this.cartService.cartChanged.subscribe((data) => {
      this.cartItems = data;
      this.totalCartValue = this.cartItems.reduce(
        (sum, product) => sum + product.attributes.price,
        0
      );
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }
  addToCart(index: number) {
    this.cartService.addToCart(this.cartItems[index]);
  }
}
