import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/home/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cartItems: Product[] = [];
  cartChanged = new BehaviorSubject<Product[]>([]);
  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartChanged.next(this.cartItems);
    console.log('Cart', this.cartItems);
  }
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartChanged.next(this.cartItems);
  }
}
