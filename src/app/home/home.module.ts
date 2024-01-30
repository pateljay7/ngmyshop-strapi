import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ResolveLoggedUserGuard } from '../shared/guards/resolve-logged-user.guard';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckOutComponent,
    ContactComponent,
    AboutComponent,
    HomePageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        // canActivate: [ResolveLoggedUserGuard],
        component: HomeComponent,
        children: [
          {
            path: '',
            component: HomePageComponent,
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
            path: 'check-out',
            component: CheckOutComponent,
          },
          {
            path: 'contact',
            component: ContactComponent,
          },
          {
            path: 'about',
            component: AboutComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
    ]),
  ],
})
export class HomeModule {}
