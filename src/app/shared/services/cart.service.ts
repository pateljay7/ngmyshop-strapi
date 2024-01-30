import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Product } from 'src/app/home/products/products.component';
import { AuthService } from './auth.service';

export interface CartItems {
  [key: string]: { product: Product; quantity: number };
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  cartItems: CartItems = {};
  cartChanged = new BehaviorSubject<CartItems>({});
  URL = 'http://localhost:1337';

  addToCart(product: Product) {
    if (this.cartItems[product.id]) this.cartItems[product.id].quantity += 1;
    else this.cartItems[product.id] = { product, quantity: 1 };
    let cart = [];
    for (let key in this.cartItems) {
      if (this.cartItems[key].quantity > 0)
        cart.push({
          quantity: this.cartItems[key].quantity,
          product: this.cartItems[key].product.id,
        });
    }
    const user = this.authService.getUserAuthFromLocalStorage();
    return  this.http
      .post(`${this.URL}/api/carts`, {
        data: { user: user.user.id, cartItems: cart },
      })
      .pipe(
        tap((data) => {
          this.cartChanged.next(this.cartItems);
        })
      );
    console.log('Cart', this.cartItems);
  }
  removeFromCart(product: Product) {
    if (this.cartItems[product.id]) {
      this.cartItems[product.id].quantity -= 1;
      if (!this.cartItems[product.id].quantity)
        delete this.cartItems[product.id];
    }
    let cart = [];
    for (let key in this.cartItems) {
      cart.push({
        quantity: this.cartItems[key].quantity,
        product: this.cartItems[key].product.id,
      });
    }
    const user = this.authService.getUserAuthFromLocalStorage();
    return this.http
      .post(`${this.URL}/api/carts`, {
        data: { user: user.user.id, cartItems: cart },
      })
      .pipe(
        tap((data) => {
          this.cartChanged.next(this.cartItems);
        })
      );
    this.cartChanged.next(this.cartItems);
  }
  discardItemFromCart(product: Product) {
    if (this.cartItems[product.id]) delete this.cartItems[product.id];
    let cart = [];
    for (let key in this.cartItems) {
      cart.push({
        quantity: this.cartItems[key].quantity,
        product: this.cartItems[key].product.id,
      });
    }
    const user = this.authService.getUserAuthFromLocalStorage();
    return this.http
      .post(`${this.URL}/api/carts`, {
        data: { user: user.user.id, cartItems: cart },
      })
      .pipe(
        tap((data) => {
          this.cartChanged.next(this.cartItems);
        })
      );
    this.cartChanged.next(this.cartItems);
  }

  fetchCartList() {
    const user = this.authService.getUserAuthFromLocalStorage();
    return this.http
      .get(
        `${this.URL}/api/carts?filters[user][id][$eq]=${user.user.id}&populate[cartItems][populate][product][populate][image]=true`
      )
      .pipe(
        tap((data: any) => {
          data.data[0].attributes.cartItems.forEach((item: any) => {
            this.cartItems[item.product.data.id] = {
              product: item.product.data,
              quantity: item.quantity,
            };
          });
          console.log('D', this.cartItems);
          this.cartChanged.next(this.cartItems);
        })
      );
  }
}
