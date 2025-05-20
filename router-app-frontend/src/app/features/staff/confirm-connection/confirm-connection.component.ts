import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-connection',
  templateUrl: './confirm-connection.component.html',
  styleUrls: ['./confirm-connection.component.scss']
})
export class ConfirmConnectionComponent {
  order: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.order = nav?.extras.state?.['order'] || {};
  }

  confirmConnection() {
    alert(`Connection confirmed for Order ID: ${this.order.id}`);
    this.router.navigate(['/staff']);
  }
}
