import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  orderId = '';
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.orderService.getOrderById(Number(this.orderId)).subscribe({
        next: (order) => {
          this.order = order;
        },
        error: (error) => {
          this.snackBar.open('Error loading order: ' + error.message, 'Close', { duration: 3000 });
          this.goBack();
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/track-orders']);
  }
}
