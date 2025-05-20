import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order, OrderStatus } from '../../../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  searchTerm: string = '';
  orders: Order[] = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        this.snackBar.open('Error fetching orders: ' + error.message, 'Close', { duration: 3000 });
      }
    });
    
  }

  get filteredOrders() {
    return this.orders.filter(order =>
      order.orderItem.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.orderId.toString().includes(this.searchTerm)
    );
  }

  acceptOrder(order: Order) {
    console.log("order -> before",order);
    
    if (confirm('Are you sure you want to accept this order?')) {
      this.orderService.updateOrderStatus(order.orderId, OrderStatus.SHIPPED).subscribe({
        next: () => {
          this.snackBar.open('Order accepted successfully', 'Close', { duration: 2000 });
          this.getAllOrders();
        },
        error: (error) => {
          this.snackBar.open('Error accepting order: ' + error.message, 'Close', { duration: 3000 });
        }
      });
      console.log("order -> after",order);
    }
  }

  rejectOrder(order: Order) {
    if (confirm('Are you sure you want to reject this order?')) {
      this.orderService.updateOrderStatus(order.orderId, OrderStatus.REJECTED).subscribe({
        next: () => {
          this.snackBar.open('Order rejected successfully', 'Close', { duration: 2000 });
          this.getAllOrders(); // Refresh the orders list
        },
        error: (error) => {
          this.snackBar.open('Error rejecting order: ' + error.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}