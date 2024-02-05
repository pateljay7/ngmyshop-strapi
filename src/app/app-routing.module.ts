import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { ResolveLoggedUserGuard } from './shared/guards/resolve-logged-user.guard';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
