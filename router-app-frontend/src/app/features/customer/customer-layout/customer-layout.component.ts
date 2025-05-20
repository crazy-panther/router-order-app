import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent {
  customerName = 'Palinda';

  constructor(private cartService: CartService) {}

  hasItemsInCart(): boolean {
    return this.cartService.getCartItem() !== null;
  }
}