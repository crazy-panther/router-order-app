import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from '../../../models/order.model';
import { OrderItem } from 'src/app/models/order-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItem: OrderItem | null = null;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItem = this.cartService.getCartItem();
  }

  removeItem(): void {
    this.cartService.removeItem();
    this.cartItem = null;
    this.snackBar.open('Router removed from cart', 'Close', { duration: 2000 });
    this.router.navigate(['/customer']);
  }

  confirmOrder(): void {
    this.cartService.confirmOrder().subscribe({
      next: () => {
        this.snackBar.open('Order confirmed!', 'Close', { duration: 3000 });
        this.cartService.removeItem();
        this.cartItem = null;
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.snackBar.open('Error confirming order: ' + error.message, 'Close', { duration: 3000 });
      }
    });
    console.log("cartItem -> ",this.cartItem);
    
  }
}