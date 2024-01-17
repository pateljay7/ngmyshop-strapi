import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/home/products/products.component';

export interface CartItems {
  [key: string]: { product: Product; qty: number };
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cartItems: CartItems = {};
  cartChanged = new BehaviorSubject<CartItems>({});
  addToCart(product: Product) {
    if (this.cartItems[product.id]) this.cartItems[product.id].qty += 1;
    else this.cartItems[product.id] = { product, qty: 1 };
    this.cartChanged.next(this.cartItems);
    console.log('Cart', this.cartItems);
  }
  removeFromCart(product: Product) {
    if (this.cartItems[product.id]) {
      this.cartItems[product.id].qty -= 1;
      if (!this.cartItems[product.id].qty) delete this.cartItems[product.id];
    }
    this.cartChanged.next(this.cartItems);
  }
  discardItemFromCart(product: Product) {
    if (this.cartItems[product.id]) delete this.cartItems[product.id];
    this.cartChanged.next(this.cartItems);
  }
}
