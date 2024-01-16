import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'prodducts',
        component: ProductsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class HomeModule {}
