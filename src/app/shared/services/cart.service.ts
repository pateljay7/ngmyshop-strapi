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
  cartId: number | null = null;
  cartChanged = new BehaviorSubject<CartItems>({});
  URL = 'http://localhost:1337';

  addToCart(product: Product) {
    const user = this.authService.getUserAuthFromLocalStorage();
    let cart: any[] = [];
    let url = Object.keys(this.cartItems).length
      ? this.http.put(`${this.URL}/api/carts/${this.cartId}`, {
          data: { user: user.user.id, cartItems: cart },
        })
      : this.http.post(`${this.URL}/api/carts`, {
          data: { user: user.user.id, cartItems: cart },
        });
    if (this.cartItems[product.id]) this.cartItems[product.id].quantity += 1;
    else this.cartItems[product.id] = { product, quantity: 1 };
    for (let key in this.cartItems) {
      if (this.cartItems[key].quantity > 0)
        cart.push({
          quantity: this.cartItems[key].quantity,
          product: this.cartItems[key].product.id,
        });
    }
    return url.pipe(
      tap((data: any) => {
        this.cartId = data.data.id;
        this.cartChanged.next(this.cartItems);
      })
    );
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
    let url = Object.keys(this.cartItems).length
      ? this.http.put(`${this.URL}/api/carts/${this.cartId}`, {
          data: { user: user.user.id, cartItems: cart },
        })
      : this.http.delete(`${this.URL}/api/carts/${this.cartId}`);
    return url.pipe(
      tap((data) => {
        this.cartChanged.next(this.cartItems);
      })
    );
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
    let url = Object.keys(this.cartItems).length
      ? this.http.put(`${this.URL}/api/carts/${this.cartId}`, {
          data: { user: user.user.id, cartItems: cart },
        })
      : this.http.delete(`${this.URL}/api/carts/${this.cartId}`);
    return url.pipe(
      tap((data) => {
        this.cartChanged.next(this.cartItems);
      })
    );
  }

  fetchCartList() {
    const user = this.authService.getUserAuthFromLocalStorage();
    return this.http
      .get(
        `${this.URL}/api/carts?filters[user][id][$eq]=${user.user.id}&populate[cartItems][populate][product][populate][image]=true`
      )
      .pipe(
        tap((data: any) => {
          if (data.data.length) {
            this.cartId = data.data[0].id;
            data.data[0].attributes.cartItems.forEach((item: any) => {
              this.cartItems[item.product.data.id] = {
                product: item.product.data,
                quantity: item.quantity,
              };
            });
            this.cartChanged.next(this.cartItems);
          }
        })
      );
  }
}
