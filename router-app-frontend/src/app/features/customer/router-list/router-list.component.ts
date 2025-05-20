import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItem } from '../../../models/order-item.model';

@Component({
  selector: 'app-router-list',
  templateUrl: './router-list.component.html',
  styleUrls: ['./router-list.component.scss']
})
export class RouterListComponent {
  routers = [
    { id: 1, name: 'Dialog 4G Router', price: 4500, image: 'assets/images/router1.jpg' },
    { id: 2, name: 'Dialog 4G Wi-Fi', price: 5000, image: 'assets/images/router2.jpg' },
    { id: 3, name: 'Dialog 4G Home Wi-Fi', price: 5500, image: 'assets/images/router3.jpg' },
    { id: 4, name: 'Dialog 4G Mobile Wi-Fi', price: 6000, image: 'assets/images/router4.jpg' },
    { id: 5, name: 'Dialog 4G MiFi', price: 6500, image: 'assets/images/router5.jfif' },
  ];

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  isAlreadyInCart(routerId: number): boolean {
    const cartItem = this.cartService.getCartItem();
    return cartItem?.orderItemId === routerId;
  }

  orderNow(router: any): void {
    if (this.cartService.getCartItem()) {
      this.snackBar.open('You can only order one router at a time', 'Close', { duration: 3000 });
      return;
    }
    
    const orderItem: OrderItem = {
      orderItemId: router.id,
      productName: router.name,
      quantity: 1,
      totalAmount: router.price
    };
    console.log("orderItem -> ",orderItem);
    
    this.cartService.addToCart(orderItem);
  }
}