import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { OrdersComponent } from './orders/orders.component';
import { ConfirmConnectionComponent } from './confirm-connection/confirm-connection.component';


@NgModule({
  declarations: [
    StaffComponent,
    OrdersComponent,
    ConfirmConnectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StaffRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule
  ]
})
export class StaffModule { }
