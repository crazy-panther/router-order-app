import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-print-reports',
  templateUrl: './print-reports.component.html',
  styleUrls: ['./print-reports.component.scss']
})
export class PrintReportsComponent implements OnInit {
  orders: Order[] = [];
  selectedDate: Date | null = null;
  selectedStatus: string | null = null;
  statusOptions = [
    { value: 'PENDING', viewValue: 'Pending' },
    { value: 'APPROVED', viewValue: 'Approved' },
    { value: 'SHIPPED', viewValue: 'Shipped' },
    { value: 'DELIVERED', viewValue: 'Delivered' },
    { value: 'CANCELLED', viewValue: 'Cancelled' }
  ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { selected: Order[] };
      this.orders = state.selected;
    }
  }

  ngOnInit(): void {}

  getTotalAmount(): number {
    return this.orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
  }

  applyFilters(): void {
    // Implement filtering logic based on selectedDate and selectedStatus
  }

  printReport(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/admin/track-orders']);
  }
}
