import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order, OrderStatus } from '../../../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.component.html',
  styleUrls: ['./track-orders.component.scss']
})
export class TrackOrdersComponent implements OnInit {
  selectedOrderIds = new Set<number>();
  searchTerm: string = '';
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  displayedColumns: string[] = [
    'select',
    'id',
    'customer',
    'router',
    'price',
    'status'
  ];
  statusOptions = [
    { value: OrderStatus.PENDING, viewValue: 'Pending' },
    { value: OrderStatus.SHIPPED, viewValue: 'Shipped' },
    { value: OrderStatus.DELIVERED, viewValue: 'Delivered' },
    { value: OrderStatus.REJECTED, viewValue: 'Rejected' }
  ];
  OrderStatus = OrderStatus;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilter();
      },
      error: (error: Error) => {
        this.snackBar.open('Error loading orders: ' + error.message, 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter(): void {
    this.filteredOrders = this.orders.filter(order => 
      order.orderItem.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (order.orderId && order.orderId.toString().includes(this.searchTerm)) ||
      order.customer?.customerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAllSelection(checked: boolean): void {
    if (checked) {
      this.filteredOrders.forEach(order => {
        if (order.orderId) {
          this.selectedOrderIds.add(order.orderId);
        }
      });
    } else {
      this.selectedOrderIds.clear();
    }
  }

  allSelected(): boolean {
    return this.filteredOrders.length > 0 && 
           this.filteredOrders.every(order => order.orderId && this.selectedOrderIds.has(order.orderId));
  }

  someSelected(): boolean {
    return this.filteredOrders.some(order => order.orderId && this.selectedOrderIds.has(order.orderId)) &&
           !this.allSelected();
  }

  toggleSelection(orderId: number, checked: boolean): void {
    if (checked) {
      this.selectedOrderIds.add(orderId);
    } else {
      this.selectedOrderIds.delete(orderId);
    }
  }

  isSelected(orderId: number): boolean {
    return this.selectedOrderIds.has(orderId);
  }

  getSelectedOrders(): Order[] {
    return this.orders.filter(order => order.orderId && this.selectedOrderIds.has(order.orderId));
  }

  viewBill(): void {
    if (this.selectedOrderIds.size !== 1) {
      this.snackBar.open('Please select exactly one order.', 'Close', { duration: 3000 });
      return;
    }
    const [id] = Array.from(this.selectedOrderIds);
    this.router.navigate(['/admin/view-bill', id]);
  }

  goToPrint(): void {
    if (this.selectedOrderIds.size === 0) {
      this.snackBar.open('Please select at least one order to print.', 'Close', { duration: 3000 });
      return;
    }
    this.router.navigate(['/admin/print-reports'], {
      state: { selected: this.getSelectedOrders() }
    });
  }

  viewOrder(order: Order): void {
    if (order.orderId) {
      this.router.navigate(['/admin/order-details', order.orderId]);
    }
  }

  updateOrderStatus(orderId: number, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.snackBar.open('Order status updated successfully', 'Close', { duration: 3000 });
        this.loadOrders();
      },
      error: (error: Error) => {
        this.snackBar.open('Error updating order status: ' + error.message, 'Close', { duration: 3000 });
      }
    });
  }
}
