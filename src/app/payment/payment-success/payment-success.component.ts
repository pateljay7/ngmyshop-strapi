import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private tosterService: ToastrService
  ) {}
  message: string = 'Order placed successfully';
  isRedirectionEnable: boolean = false;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((data: any) => {
      this.message =
        'Please wait, will redirect you to on the home page in a short';
      this.orderService
        .setPrePaymentConfirmation(
          data['params']['order_id'],
          data['params']['cart_id'],
          data['params']['session_id']
        )
        .subscribe({
          next: (res) => {
            this.router.navigate(['/']);
            this.isRedirectionEnable = true;
          },
          error: (error) => {
            this.tosterService.error(JSON.stringify(error.error));
            this.isRedirectionEnable = true;
            console.error(error);
          },
        });
    });
  }
}
