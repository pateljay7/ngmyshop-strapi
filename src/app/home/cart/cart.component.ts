import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItems, CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../products/products.component';
export interface PaymentData {
  price_data: PriceData;
  quantity: number;
}
export interface PriceData {
  currency: string;
  product_data: ProductData;
  unit_amount: number;
}
export interface ProductData {
  name: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  URL = this.productService.URL;
  cartItems: CartItems = {};
  totalCartValue: number = 0;
  ngOnInit(): void {
    this.cartService.fetchCartList().subscribe();
    this.cartService.cartChanged.subscribe((data) => {
      this.cartItems = data;
      this.totalCartValue = Object.values(this.cartItems).reduce(
        (total, item) => total + item.product.attributes.price * item.quantity,
        0
      );
    });
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product).subscribe();
  }
  addToCart(id: string) {
    let r = this.cartItems[id];
    this.cartService.addToCart(r.product).subscribe();
  }
  discardItemFromCart(product: Product) {
    this.cartService.discardItemFromCart(product).subscribe();
  }
  redirectToCheckOutPage() {
    this.router.navigate(['check-out']);
  }
}
