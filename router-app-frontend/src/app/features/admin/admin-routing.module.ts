import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackOrdersComponent } from './track-orders/track-orders.component';
import { PrintReportsComponent } from './print-reports/print-reports.component';
import { ViewBillComponent } from './view-bill/view-bill.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', redirectTo: 'track-orders', pathMatch: 'full' },
      { path: 'track-orders', component: TrackOrdersComponent },
      { path: 'print-reports', component: PrintReportsComponent },
      { path: 'view-bill/:id', component: ViewBillComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}