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
import { NgbdSortableHeader, TodoComponent } from './todo/todo.component';
import { ProfileComponent } from './profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderComponent } from './order/order.component';

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
    TodoComponent,
    NgbdSortableHeader,
    ProfileComponent,
    OrderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
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
            path: 'todo',
            component: TodoComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'order',
            component: OrderComponent,
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
