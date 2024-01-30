import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private cartService: CartService) {}
  totalItemsInCart: number = 0;
  ngOnInit(): void {
    this.cartService.cartChanged.subscribe((data) => {
      this.totalItemsInCart = Object.values(data).reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
  }
}
