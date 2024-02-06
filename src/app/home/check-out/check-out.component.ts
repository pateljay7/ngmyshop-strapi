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
  isprocessingPayment: boolean = false;
  processingOrder: any = null;
  processingCart: any = null;
  processingMessage = 'Procced';
  ngOnInit(): void {
    this.setForm();
    this.orderService.processingOrder.subscribe((data: any) => {
      if (
        data.order_id == this.processingOrder.id &&
        data.cartId == this.processingCart.id
      ) {
        this.isprocessingPayment = false;
        this.processingMessage = 'Order Placed';
      }
    });
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
    this.isprocessingPayment = true;
    this.processingMessage =
      'please do not close this tab, will redirect you to once done with payment';
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
        this.isprocessingPayment = true;
        this.processingCart = res.cart;
        this.processingOrder = res.order;
        window.open(res.redirect, '_blank');
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
