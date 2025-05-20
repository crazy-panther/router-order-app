import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterListComponent } from './router-list/router-list.component';
import { CartComponent } from './cart/cart.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: '', component: RouterListComponent },
      { path: 'cart', component: CartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
