import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelledComponent } from './payment-cancelled/payment-cancelled.component';

@NgModule({
  declarations: [
    PaymentSuccessComponent,
    PaymentCancelledComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'success',
        component: PaymentSuccessComponent,
      },
      {
        path: 'cancel',
        component: PaymentCancelledComponent,
      },
    ]),
  ],
})
export class PaymentModule {}
