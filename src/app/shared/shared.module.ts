import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { TodoFilterBarComponent } from './components/todo-filter-bar/todo-filter-bar.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TodoDetailsComponent,
    TodoFilterBarComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgSelectModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TodoDetailsComponent,
    TodoFilterBarComponent,
  ],
})
export class SharedModule {}
