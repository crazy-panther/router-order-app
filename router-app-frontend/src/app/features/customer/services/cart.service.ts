import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../../services/order.service';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { OrderItem } from '../../../models/order-item.model';
import { Order, OrderStatus } from '../../../models/order.model';
import { Customer } from '../../../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItem: OrderItem | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  addToCart(item: OrderItem): void {
    if (this.cartItem) {
      this.snackBar.open('You can only order one router at a time', 'Close', { duration: 2000 });
      return;
    }
    
    this.cartItem = {
      ...item,
      quantity: 1,
      totalAmount: item.totalAmount
    };
    this.snackBar.open(`${item.productName} added to cart`, 'Close', { duration: 2000 });
  }

  getCartItem(): OrderItem | null {
    return this.cartItem;
  }

  removeItem(): void {
    this.cartItem = null;
    this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
  }

  confirmOrder(): Observable<Order> {
    if (!this.cartItem) {
      throw new Error('Cart is empty');
    }

    const currentUser: Customer = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const order = {
      orderItem: {
        productName: this.cartItem.productName,
        quantity: this.cartItem.quantity,
        totalAmount: this.cartItem.totalAmount
      },
      totalAmount: this.cartItem.totalAmount,
      status: OrderStatus.PENDING
    };
   
 
    
    
    return this.orderService.addOrder(order);
  }
}