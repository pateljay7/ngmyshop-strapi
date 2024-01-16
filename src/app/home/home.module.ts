import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, ProductComponent, ProductDetailsComponent],
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
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class HomeModule {}
