import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckOutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent,
          },
          {
            path: ':id',
            component: ProductDetailsComponent,
          },
        ],
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path:'check-out',
        component:CheckOutComponent
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class HomeModule {}
