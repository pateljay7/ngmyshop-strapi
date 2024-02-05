import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { PaymentData } from '../cart/cart.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {}
  checkOutForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.checkOutForm = this.formBuilder.group({
      receiverName: new FormControl('Jay Patel', [Validators.required]),
      email: new FormControl('pateljaykjp@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl('9724246897', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      shippingAddress: new FormControl('c-404,jafisi', [Validators.required]),
    });
  }

  onCheckOutSubmit() {
    let line_items: PaymentData[] = [];
    for (const key in this.cartService.cartItems) {
      line_items.push({
        price_data: {
          currency: 'INR',
          product_data: {
            name: this.cartService.cartItems[key].product.attributes.title,
          },
          unit_amount:
            this.cartService.cartItems[key].product.attributes.price * 10.0,
        },
        quantity: this.cartService.cartItems[key].quantity,
      });
    }
    let payload = {
      ...this.checkOutForm.value,
      cart: this.cartService.cartId,
      line_items,
    };
    this.orderService.makePrePaymentForOrder(payload).subscribe({
      next: (res: any) => {
        window.open(res.redirect);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
