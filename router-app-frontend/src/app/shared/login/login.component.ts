import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    customerEmail: '',
    customerPassword: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // login() {
  //   this.customerService.login(this.credentials).subscribe({
  //     next: (customer) => {
  //       this.snackBar.open('Login successful', 'Close', { duration: 3000 });
  //       this.router.navigate(['/customer']); // Change route accordingly
  //     },
  //     error: (err) => {
  //       this.snackBar.open(err.message || 'Login failed', 'Close', { duration: 3000 });
  //     }
  //   });
  // }
  login() {
  const { customerEmail, customerPassword } = this.credentials;

  // Admin check
  if (customerEmail.includes('admin') && customerPassword === 'admin@123') {
    localStorage.setItem('currentUser', JSON.stringify({ role: 'admin' }));
    this.snackBar.open('Admin login successful', 'Close', { duration: 3000 });
    this.router.navigate(['/admin/track-orders']);
    return;
  }

  // Staff check
  if (customerEmail.includes('zincat') && customerPassword === 'zincat@123') {
    localStorage.setItem('currentUser', JSON.stringify({ role: 'staff' }));
    this.snackBar.open('Staff login successful', 'Close', { duration: 3000 });
    this.router.navigate(['/staff/orders']);
    return;
  }

  // Default: customer login via API
  this.customerService.login(this.credentials).subscribe({
    next: (customer) => {
      localStorage.setItem('currentUser', JSON.stringify(customer));
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      this.router.navigate(['/customer']); // Change route accordingly
    },
    error: (err) => {
      this.snackBar.open(err.message || 'Login failed', 'Close', { duration: 3000 });
    }
  });
}

}